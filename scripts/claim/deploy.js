const { ethers } = require("hardhat");

const larvaDucksAddress = '0x00C65f7DAFD5e9aF6aC935c1F05696b677Ef3240';

const maxFeePerGas = 40000000000;
// const baseFeePerGas = 30000000000;

async function main() {
  const ClaimLarvaDucksContract = await ethers.getContractFactory("ClaimLarvaDucks");
  claimLarvaDucks = await ClaimLarvaDucksContract.deploy(larvaDucksAddress, {maxFeePerGas});
  await claimLarvaDucks.deployed();
  console.log("ClaimLarvaDucks deployed to:", claimLarvaDucks.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
