const { ethers } = require("hardhat");

async function main() {
    const LarvaDucksContract = await ethers.getContractFactory("LarvaDucks");
    const larvaDucks = await LarvaDucksContract.attach(
        "0x00C65f7DAFD5e9aF6aC935c1F05696b677Ef3240" // The deployed contract address
    );

    const walletAddress = '0x55bb5e256ad1926fC5Eee4668Aaf1c36eB3cf089';
    const baseUri = 'ipfs://QmcUjbS2xQfEVzSY8xVaKT1EpxnM4xrqHdegeHHrPfGkJW/';

    await larvaDucks.setBaseURI(baseUri);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });