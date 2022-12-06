// import
// main function
// calling main function

const { network } = require('hardhat')
const { networkConfig, developmentChains } = require('../helper-hardhat-config')
const { verify } = require('../utils/verify')
require('dotenv').config()

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  let ethUsdPriceFeedAddress
  if (chainId === 31337) {
    const ethUsdAggregator = await deployments.get('MockV3Aggregator')
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
  }
  //   const ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
  //   This is where mock contracts come into use
  //  If the contract doesnt exist we deploy a minimal version to deploy locally
  //   const args = ethUsdPriceFeedAddress
  const fundMe = await deploy('FundMe', {
    from: deployer,
    args: [ethUsdPriceFeedAddress], // Putting the pricefeed address here
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    // Verify
    await verify(fundMe.address, [ethUsdPriceFeedAddress])
  }
  log('===========================================')
}

module.exports.tags = ['all', 'fundamental']
