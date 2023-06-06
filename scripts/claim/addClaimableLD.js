const { ethers } = require("hardhat");

const claimLarvaDucksAddress = '0x2D510657d8e153b3BAAf7fE1cb0bCeE9690DCBD2';

async function main() {
    const ClaimLarvaDucksContract = await ethers.getContractFactory("ClaimLarvaDucks");
    const claimLarvaDucks = await ClaimLarvaDucksContract.attach(
        claimLarvaDucksAddress
    );

    // Add claimable LD
    await claimLarvaDucks.addClaimableLarvaDucks([210, 211, 212, 213, 214, 215, 216, 217, 218, 219]); // TODO
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
