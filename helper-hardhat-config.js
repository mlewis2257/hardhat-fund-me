const networkConfig = {
  5: {
    name: 'goerli',
    ethUsdPriceFeed: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  },
  31337: {
    name: 'localhost',
  },
}

const developmentChains = ['hardhat', 'localhost']
const DECIMALS = 8
const INITIAL_ANSWER = 200000000

module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
}
