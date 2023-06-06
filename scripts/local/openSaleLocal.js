const { ethers } = require("hardhat");

const larvaDucksAddress = '0x5302E909d1e93e30F05B5D6Eea766363D14F9892';

async function main() {
    const LarvaDucks = await ethers.getContractFactory("LarvaDucks");
    const larvaDucks = await LarvaDucks.attach(
        larvaDucksAddress // The deployed contract address
    );

    await larvaDucks.setSaleOpen(true);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
