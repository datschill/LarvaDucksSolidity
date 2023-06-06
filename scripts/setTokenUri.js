const { ethers } = require("hardhat");

async function main() {
    const LarvaDucksContract = await ethers.getContractFactory("LarvaDucks");
    const larvaDucks = await LarvaDucksContract.attach(
        "0x00C65f7DAFD5e9aF6aC935c1F05696b677Ef3240" // The deployed contract address
    );

    const walletAddress = '0x55bb5e256ad1926fC5Eee4668Aaf1c36eB3cf089';
    const tokenUri114 = 'ipfs://QmNhPkuNfY4Vpm3qvrMRC7cJVTUD84jYTXhD9V55LnHecU';
    const tokenUri161 = 'ipfs://QmPBbZXSJkaGYX4pCY95sEPgxkb3UcbYsHBqa6B5RmEpyP';

    // await larvaDucks.setTokenURI(114, tokenUri114);

    await larvaDucks.setTokenURI(161, tokenUri161);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });