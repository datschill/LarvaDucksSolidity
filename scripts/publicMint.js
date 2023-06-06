const { ethers } = require("hardhat");

async function main() {
    const LarvaDucksContract = await ethers.getContractFactory("LarvaDucks");
    const larvaDucks = await LarvaDucksContract.attach(
        "0xeea0BC04082F39c55a820f07E5D2ADd6E7915f1e" // The deployed contract address
    );

    const walletAddress = '0x55bb5e256ad1926fC5Eee4668Aaf1c36eB3cf089';
    const value = ethers.utils.parseUnits('0.06', 'ether')

    await larvaDucks.publicMint(walletAddress, 2, { value });
    const balance = await larvaDucks.balanceOf(walletAddress);
    console.log(`Balance ${walletAddress} : ${balance}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
