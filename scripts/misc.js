const { ethers } = require("hardhat");

async function main() {
    const LarvaDucksContract = await ethers.getContractFactory("LarvaDucks");
    const larvaDucks = await LarvaDucksContract.attach(
        "0x00C65f7DAFD5e9aF6aC935c1F05696b677Ef3240" // The deployed contract address
    );

    const walletAddress = '0x3E5a90F582d45Cf83e0446D53B3069E86162003b';

    // let claimNumber = await larvaDucks.claimNumber('0x55bb5e256ad1926fC5Eee4668Aaf1c36eB3cf089');
    // console.log('Claim Number :', claimNumber);

    const balance = await larvaDucks.balanceOf(walletAddress);
    console.log(`Balance ${walletAddress} : ${balance}`);

    const baseUri = await larvaDucks.baseURI();
    console.log('BaseURI :', baseUri);

    const tokenUri = await larvaDucks.tokenURI(0);
    console.log('TokenURI #0 :', tokenUri);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
