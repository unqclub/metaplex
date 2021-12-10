export type NftCandyMachine = {
  version: '0.0.0';
  name: 'nft_candy_machine';
  instructions: [
    {
      name: 'mintNft';
      accounts: [
        {
          name: 'payerDmtrTokenAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'payerMintingInfo';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'config';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'candyMachine';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'wallet';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'metadata';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'mint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'mintAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'updateAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'masterEdition';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenMetadataProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'payerBump';
          type: 'u8';
        },
      ];
    },
    {
      name: 'updateCandyMachine';
      accounts: [
        {
          name: 'candyMachine';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'price';
          type: {
            option: 'u64';
          };
        },
        {
          name: 'goLiveDate';
          type: {
            option: 'i64';
          };
        },
      ];
    },
    {
      name: 'initializeConfig';
      accounts: [
        {
          name: 'config';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'data';
          type: {
            defined: 'ConfigData';
          };
        },
      ];
    },
    {
      name: 'addConfigLines';
      accounts: [
        {
          name: 'config';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'index';
          type: 'u32';
        },
        {
          name: 'configLines';
          type: {
            vec: {
              defined: 'ConfigLine';
            };
          };
        },
      ];
    },
    {
      name: 'initializeCandyMachine';
      accounts: [
        {
          name: 'candyMachine';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'wallet';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'config';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'bump';
          type: 'u8';
        },
        {
          name: 'data';
          type: {
            defined: 'CandyMachineData';
          };
        },
      ];
    },
    {
      name: 'updateAuthority';
      accounts: [
        {
          name: 'candyMachine';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'newAuthority';
          type: {
            option: 'publicKey';
          };
        },
      ];
    },
    {
      name: 'withdrawFunds';
      accounts: [
        {
          name: 'config';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: 'candyMachine';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'wallet';
            type: 'publicKey';
          },
          {
            name: 'tokenMint';
            type: {
              option: 'publicKey';
            };
          },
          {
            name: 'config';
            type: 'publicKey';
          },
          {
            name: 'data';
            type: {
              defined: 'CandyMachineData';
            };
          },
          {
            name: 'itemsRedeemed';
            type: 'u64';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'config';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'data';
            type: {
              defined: 'ConfigData';
            };
          },
        ];
      };
    },
    {
      name: 'payerMintingInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'totalMints';
            type: 'u8';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
  ];
  types: [
    {
      name: 'CandyMachineData';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'uuid';
            type: 'string';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'itemsAvailable';
            type: 'u64';
          },
          {
            name: 'goLiveDate';
            type: {
              option: 'i64';
            };
          },
        ];
      };
    },
    {
      name: 'ConfigData';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'uuid';
            type: 'string';
          },
          {
            name: 'symbol';
            type: 'string';
          },
          {
            name: 'sellerFeeBasisPoints';
            type: 'u16';
          },
          {
            name: 'creators';
            type: {
              vec: {
                defined: 'Creator';
              };
            };
          },
          {
            name: 'maxSupply';
            type: 'u64';
          },
          {
            name: 'isMutable';
            type: 'bool';
          },
          {
            name: 'retainAuthority';
            type: 'bool';
          },
          {
            name: 'maxNumberOfLines';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'ConfigLine';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'uri';
            type: 'string';
          },
        ];
      };
    },
    {
      name: 'Creator';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'address';
            type: 'publicKey';
          },
          {
            name: 'verified';
            type: 'bool';
          },
          {
            name: 'share';
            type: 'u8';
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 300;
      name: 'IncorrectOwner';
      msg: 'Account does not have correct owner!';
    },
    {
      code: 301;
      name: 'Uninitialized';
      msg: 'Account is not initialized!';
    },
    {
      code: 302;
      name: 'MintMismatch';
      msg: 'Mint Mismatch!';
    },
    {
      code: 303;
      name: 'IndexGreaterThanLength';
      msg: 'Index greater than length!';
    },
    {
      code: 304;
      name: 'ConfigMustHaveAtleastOneEntry';
      msg: 'Config must have atleast one entry!';
    },
    {
      code: 305;
      name: 'NumericalOverflowError';
      msg: 'Numerical overflow error!';
    },
    {
      code: 306;
      name: 'TooManyCreators';
      msg: 'Can only provide up to 4 creators to candy machine (because candy machine is one)!';
    },
    {
      code: 307;
      name: 'UuidMustBeExactly6Length';
      msg: 'Uuid must be exactly of 6 length';
    },
    {
      code: 308;
      name: 'NotEnoughTokens';
      msg: 'Not enough tokens to pay for this minting';
    },
    {
      code: 309;
      name: 'NotEnoughSOL';
      msg: 'Not enough SOL to pay for this minting';
    },
    {
      code: 310;
      name: 'TokenTransferFailed';
      msg: 'Token transfer failed';
    },
    {
      code: 311;
      name: 'CandyMachineEmpty';
      msg: 'Candy machine is empty!';
    },
    {
      code: 312;
      name: 'CandyMachineNotLiveYet';
      msg: 'Candy machine is not live yet!';
    },
    {
      code: 313;
      name: 'ConfigLineMismatch';
      msg: 'Number of config lines must be at least number of items available';
    },
    {
      code: 314;
      name: 'NoDMTR';
      msg: 'You need DMTR token to mint';
    },
  ];
};

export const IDL: NftCandyMachine = {
  version: '0.0.0',
  name: 'nft_candy_machine',
  instructions: [
    {
      name: 'mintNft',
      accounts: [
        {
          name: 'payerDmtrTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'payerMintingInfo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'config',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'candyMachine',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'wallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mintAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'updateAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'masterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'payerBump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'updateCandyMachine',
      accounts: [
        {
          name: 'candyMachine',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'price',
          type: {
            option: 'u64',
          },
        },
        {
          name: 'goLiveDate',
          type: {
            option: 'i64',
          },
        },
      ],
    },
    {
      name: 'initializeConfig',
      accounts: [
        {
          name: 'config',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'data',
          type: {
            defined: 'ConfigData',
          },
        },
      ],
    },
    {
      name: 'addConfigLines',
      accounts: [
        {
          name: 'config',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'index',
          type: 'u32',
        },
        {
          name: 'configLines',
          type: {
            vec: {
              defined: 'ConfigLine',
            },
          },
        },
      ],
    },
    {
      name: 'initializeCandyMachine',
      accounts: [
        {
          name: 'candyMachine',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'wallet',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'config',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
        {
          name: 'data',
          type: {
            defined: 'CandyMachineData',
          },
        },
      ],
    },
    {
      name: 'updateAuthority',
      accounts: [
        {
          name: 'candyMachine',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'newAuthority',
          type: {
            option: 'publicKey',
          },
        },
      ],
    },
    {
      name: 'withdrawFunds',
      accounts: [
        {
          name: 'config',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'candyMachine',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'wallet',
            type: 'publicKey',
          },
          {
            name: 'tokenMint',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'config',
            type: 'publicKey',
          },
          {
            name: 'data',
            type: {
              defined: 'CandyMachineData',
            },
          },
          {
            name: 'itemsRedeemed',
            type: 'u64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'config',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'data',
            type: {
              defined: 'ConfigData',
            },
          },
        ],
      },
    },
    {
      name: 'payerMintingInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'totalMints',
            type: 'u8',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'CandyMachineData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'uuid',
            type: 'string',
          },
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'itemsAvailable',
            type: 'u64',
          },
          {
            name: 'goLiveDate',
            type: {
              option: 'i64',
            },
          },
        ],
      },
    },
    {
      name: 'ConfigData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'uuid',
            type: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'sellerFeeBasisPoints',
            type: 'u16',
          },
          {
            name: 'creators',
            type: {
              vec: {
                defined: 'Creator',
              },
            },
          },
          {
            name: 'maxSupply',
            type: 'u64',
          },
          {
            name: 'isMutable',
            type: 'bool',
          },
          {
            name: 'retainAuthority',
            type: 'bool',
          },
          {
            name: 'maxNumberOfLines',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'ConfigLine',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'uri',
            type: 'string',
          },
        ],
      },
    },
    {
      name: 'Creator',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'address',
            type: 'publicKey',
          },
          {
            name: 'verified',
            type: 'bool',
          },
          {
            name: 'share',
            type: 'u8',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 300,
      name: 'IncorrectOwner',
      msg: 'Account does not have correct owner!',
    },
    {
      code: 301,
      name: 'Uninitialized',
      msg: 'Account is not initialized!',
    },
    {
      code: 302,
      name: 'MintMismatch',
      msg: 'Mint Mismatch!',
    },
    {
      code: 303,
      name: 'IndexGreaterThanLength',
      msg: 'Index greater than length!',
    },
    {
      code: 304,
      name: 'ConfigMustHaveAtleastOneEntry',
      msg: 'Config must have atleast one entry!',
    },
    {
      code: 305,
      name: 'NumericalOverflowError',
      msg: 'Numerical overflow error!',
    },
    {
      code: 306,
      name: 'TooManyCreators',
      msg: 'Can only provide up to 4 creators to candy machine (because candy machine is one)!',
    },
    {
      code: 307,
      name: 'UuidMustBeExactly6Length',
      msg: 'Uuid must be exactly of 6 length',
    },
    {
      code: 308,
      name: 'NotEnoughTokens',
      msg: 'Not enough tokens to pay for this minting',
    },
    {
      code: 309,
      name: 'NotEnoughSOL',
      msg: 'Not enough SOL to pay for this minting',
    },
    {
      code: 310,
      name: 'TokenTransferFailed',
      msg: 'Token transfer failed',
    },
    {
      code: 311,
      name: 'CandyMachineEmpty',
      msg: 'Candy machine is empty!',
    },
    {
      code: 312,
      name: 'CandyMachineNotLiveYet',
      msg: 'Candy machine is not live yet!',
    },
    {
      code: 313,
      name: 'ConfigLineMismatch',
      msg: 'Number of config lines must be at least number of items available',
    },
    {
      code: 314,
      name: 'NoDMTR',
      msg: 'You need DMTR token to mint',
    },
  ],
};
