import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import fs from 'fs';
import log from 'loglevel';
import path from 'path';

import {
  createConfig,
  loadCandyProgram,
  loadWalletKey,
} from '../helpers/accounts';
import { loadCache, saveCache } from '../helpers/cache';
import {
  EXTENSION_GIF,
  EXTENSION_JPG,
  EXTENSION_JSON,
  EXTENSION_PNG,
} from '../helpers/constants';
import { arweaveUpload } from '../helpers/upload/arweave';
import { awsUpload } from '../helpers/upload/aws';
import { ipfsCreds, ipfsUpload } from '../helpers/upload/ipfs';
import { chunks } from '../helpers/various';

export async function upload(
  files: string[],
  cacheName: string,
  env: string,
  keypair: string,
  totalNFTs: number,
  storage: string,
  retainAuthority: boolean,
  mutable: boolean,
  rpcUrl: string,
  ipfsCredentials: ipfsCreds,
  awsS3Bucket: string,
  batchSize: number,
): Promise<boolean> {
  let uploadSuccessful = true;

  const savedContent = loadCache(cacheName, env);
  const cacheContent = savedContent || {};

  if (!cacheContent.program) {
    cacheContent.program = {};
  }

  let existingInCache = [];
  if (!cacheContent.items) {
    cacheContent.items = {};
  } else {
    existingInCache = Object.keys(cacheContent.items);
  }

  const seen = {};
  const newFiles = [];
  const EXTENSION_ARRAY = [EXTENSION_PNG, EXTENSION_GIF, EXTENSION_JPG];

  files.forEach(f => {
    const extensionRegex = new RegExp(
      `/(${EXTENSION_PNG})|(${EXTENSION_GIF})|(${EXTENSION_JPG})/g`,
    );
    if (!seen[f.replace(extensionRegex, '').split('/').pop()]) {
      seen[f.replace(extensionRegex, '').split('/').pop()] = true;
      newFiles.push(f);
    }
  });
  existingInCache.forEach(f => {
    if (!seen[f]) {
      seen[f] = true;
      const imageLink = cacheContent?.items?.[f]?.imageLink;
      if (imageLink && EXTENSION_ARRAY.includes(path.extname(imageLink))) {
        newFiles.push(f + path.extname(imageLink));
      } else {
        log.error(`Unknown file extension or image (${f}): ${imageLink}`);
        newFiles.push(f + '.png');
      }
    }
  });

  const images = newFiles.filter(val =>
    EXTENSION_ARRAY.includes(path.extname(val)),
  );
  const SIZE = images.length;

  const walletKeyPair = loadWalletKey(keypair);
  const anchorProgram = await loadCandyProgram(walletKeyPair, env, rpcUrl);

  //urkes Ucitava config iz JSONa
  let config = cacheContent.program.config
    ? new PublicKey(cacheContent.program.config)
    : undefined;

  //urkes Ide chunk po chunk
  const tick = SIZE / 100; //print every one percent
  let lastPrinted = 0;
  await Promise.all(
    chunks(Array.from(Array(SIZE).keys()), batchSize || 1000).map(
      async allIndexesInSlice => {
        for (let ind = 0; ind < allIndexesInSlice.length; ind++) {
          const i = allIndexesInSlice[ind];
          const image = images[i];
          const imageExt = path.extname(image);
          const imageName = path.basename(image);
          const index = imageName.replace(imageExt, '');

          log.debug(`Processing file: ${i}`);

          let link = cacheContent?.items?.[index]?.link;
          let imageLink = cacheContent?.items?.[index]?.imageLink;
          if (!link || !cacheContent.program.uuid) {
            if (i >= lastPrinted + tick || i === 0) {
              lastPrinted = i;
              log.info(`Processing file: ${i}, ${imageName}`);
            }
            const manifestPath = image.replace(imageExt, EXTENSION_JSON);
            const manifestContent = fs
              .readFileSync(manifestPath)
              .toString()
              .replace(imageName, `image${imageExt}`)
              .replace(imageName, `image${imageExt}`);
            const manifest = JSON.parse(manifestContent);

            const manifestBuffer = Buffer.from(JSON.stringify(manifest));

            if (i === 0 && !cacheContent.program.uuid) {
              //urkes Ovde se pravi konfig
              // initialize config
              log.info(`initializing config`);
              try {
                const res = await createConfig(anchorProgram, walletKeyPair, {
                  maxNumberOfLines: new BN(totalNFTs),
                  symbol: manifest.symbol,
                  sellerFeeBasisPoints: manifest.seller_fee_basis_points,
                  isMutable: mutable,
                  maxSupply: new BN(0),
                  retainAuthority: retainAuthority,
                  creators: manifest.properties.creators.map(creator => {
                    return {
                      address: new PublicKey(creator.address),
                      verified: true,
                      share: creator.share,
                    };
                  }),
                });
                cacheContent.program.uuid = res.uuid;
                cacheContent.program.config = res.config.toBase58();
                cacheContent.totalNFTs = totalNFTs;
                config = res.config;

                log.info(
                  `initialized config for a candy machine with publickey: ${res.config.toBase58()}`,
                );

                saveCache(cacheName, env, cacheContent);
              } catch (exx) {
                log.error('Error deploying config to Solana network.', exx);
                throw exx;
              }
            }

            if (!link) {
              try {
                if (storage === 'arweave') {
                  [link, imageLink] = await arweaveUpload(
                    walletKeyPair,
                    anchorProgram,
                    env,
                    image,
                    manifestBuffer,
                    manifest,
                    index,
                  );
                } else if (storage === 'ipfs') {
                  [link, imageLink] = await ipfsUpload(
                    ipfsCredentials,
                    image,
                    manifestBuffer,
                  );
                } else if (storage === 'aws') {
                  [link, imageLink] = await awsUpload(
                    awsS3Bucket,
                    image,
                    manifestBuffer,
                  );
                }

                if (link && imageLink) {
                  log.debug('setting cache for ', index);
                  cacheContent.items[index] = {
                    link,
                    imageLink,
                    name: manifest.name,
                    onChain: false,
                  };
                  cacheContent.authority = walletKeyPair.publicKey.toBase58();
                  saveCache(cacheName, env, cacheContent);
                }
              } catch (er) {
                uploadSuccessful = false;
                log.error(`Error uploading file ${index}`, er);
              }
            }
          } else {
            log.debug(`file ${index} already has a link`);
          }
        }
      },
    ),
  );
  saveCache(cacheName, env, cacheContent);

  //urkes Uploadovao je fajlove i sad prolazi kroz iteme iz cache JSON-a
  //urkes Nama treba ovaj deo. Moramo da iz JSON-a izvucemo sve
  //urkes Mozda ovde nekako batch-ovati transakcije
  //TODO!
  // const keys = Object.keys(cacheContent.items);
  // try {
  //   await Promise.all(
  //     chunks(Array.from(Array(keys.length).keys()), 1000).map(
  //       async allIndexesInSlice => {
  //         for (
  //           let offset = 0;
  //           offset < allIndexesInSlice.length;
  //           offset += 10
  //         ) {
  //           const indexes = allIndexesInSlice.slice(offset, offset + 10);
  //           const onChain = indexes.filter(i => {
  //             const index = keys[i];
  //             return cacheContent.items[index]?.onChain || false;
  //           });
  //           const ind = keys[indexes[0]];

  //           if (onChain.length != indexes.length) {
  //             log.info(
  //               `Writing indices ${ind}-${keys[indexes[indexes.length - 1]]}`,
  //             );
  //             try {
  //               await anchorProgram.rpc.addConfigLines(
  //                 ind,
  //                 indexes.map(i => ({
  //                   uri: cacheContent.items[keys[i]].link,
  //                   name: cacheContent.items[keys[i]].name,
  //                 })),
  //                 {
  //                   accounts: {
  //                     config,
  //                     authority: walletKeyPair.publicKey,
  //                   },
  //                   signers: [walletKeyPair],
  //                 },
  //               );
  //               indexes.forEach(i => {
  //                 cacheContent.items[keys[i]] = {
  //                   ...cacheContent.items[keys[i]],
  //                   onChain: true,
  //                 };
  //               });
  //               saveCache(cacheName, env, cacheContent);
  //             } catch (e) {
  //               log.error(
  //                 `saving config line ${ind}-${
  //                   keys[indexes[indexes.length - 1]]
  //                 } failed`,
  //                 e,
  //               );
  //               uploadSuccessful = false;
  //             }
  //           }
  //         }
  //       },
  //     ),
  //   );
  // } catch (e) {
  //   log.error(e);
  // } finally {
  //   saveCache(cacheName, env, cacheContent);
  // }
  console.log(`Done. Successful = ${uploadSuccessful}.`);
  return uploadSuccessful;
}
