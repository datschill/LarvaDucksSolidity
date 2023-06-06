const { ethers } = require("hardhat");

const claimLarvaDucksAddress = '0x2D510657d8e153b3BAAf7fE1cb0bCeE9690DCBD2';

async function main() {
    const ClaimLarvaDucksContract = await ethers.getContractFactory("ClaimLarvaDucks");
    const claimLarvaDucks = await ClaimLarvaDucksContract.attach(
        claimLarvaDucksAddress
    );

    // Open claim
    await claimLarvaDucks.switchClaimOpened();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
