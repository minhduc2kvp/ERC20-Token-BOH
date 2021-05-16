require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// Go to https://www.infura.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const INFURA_API_KEY = "3ef253809e6b44ce8069d95c12ec4668";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "d976c282768ea7efb117e3c384a0e15d4d6162e6d19b9ca72c0930b70f8b51dd";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    // ropsten: {
    //   url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    // }
    bsc: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      chainId: 97,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/artifacts"
  },
};

