const { ethers } = require("hardhat");

const larvaDucksAddress = '0x00C65f7DAFD5e9aF6aC935c1F05696b677Ef3240';
const claimLarvaDucksAddress = '0x2D510657d8e153b3BAAf7fE1cb0bCeE9690DCBD2';

async function main() {
    const LarvaDucks = await ethers.getContractFactory("LarvaDucks");
    const larvaDucks = await LarvaDucks.attach(
        larvaDucksAddress // The deployed contract address
    );

    // const ClaimLarvaDucksContract = await ethers.getContractFactory("ClaimLarvaDucks");
    // const claimLarvaDucks = await ClaimLarvaDucksContract.attach(
    //     claimLarvaDucksAddress
    // );

    let recipients = [claimLarvaDucksAddress];
    let amounts = [5];
    // Airdrop
    await larvaDucks.airdrop(recipients, amounts)

    // // Add claimable LD
    // await claimLarvaDucks.addClaimableLarvaDucks([1, 2, 3, 4]); // TODO
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
