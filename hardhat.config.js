require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
require('hardhat-gas-reporter')
require('@nomiclabs/hardhat-ethers')
require('hardhat-deploy')

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ''
const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL ||
  `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  '44ed79e334dcf489de5d2edc75c21f4a94254482959d6f4a293419ba189f9c32'
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.8',
      },
      {
        version: '0.6.6',
      },
    ],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  mocha: {
    timeout: 500000,
  },
}