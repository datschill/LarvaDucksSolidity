const { ethers } = require("hardhat");

async function main() {
    // Deploy main contract
    const LarvaDucksContract = await ethers.getContractFactory("LarvaDucks");
    const larvaDucks = await LarvaDucksContract.deploy();
    await larvaDucks.deployed();
    console.log("LarvaDucks deployed to:", larvaDucks.address);

    const ClaimLarvaDucksContract = await ethers.getContractFactory("ClaimLarvaDucks");
    claimLarvaDucks = await ClaimLarvaDucksContract.deploy(larvaDucks.address);
    await claimLarvaDucks.deployed();
    console.log("ClaimLarvaDucks deployed to:", claimLarvaDucks.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
