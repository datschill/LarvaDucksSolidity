require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();
const privateKeyRink = fs.readFileSync(".secretrink").toString().trim();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
let defaultNetwork = "localhost";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork,
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/API_KEY",
      }
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/API_KEY",
      accounts: [privateKeyRink]
    },
    mainnet: {
      url: "https://eth-mainnet.alchemyapi.io/v2/API_KEY",
      accounts: [privateKey]
    }
  },
  etherscan: {
    apiKey: "API_KEY"
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: false
        }
      }
    }
  }
};
