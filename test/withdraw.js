const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LarvaDucks - Withdraw",  function () {
    let larvaDucks
    let owner;
    let addr1;
    let addr2;
    let addrs;

    before(async () => {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    })

    beforeEach(async function () {
        // Deploy main contract
        const LarvaDuckContract = await ethers.getContractFactory("LarvaDucks");
        larvaDucks = await LarvaDuckContract.deploy();
        await larvaDucks.deployed();
    });

    it("Should be able to withdraw", async () => {
        // Send ETH to the contract
        let amount = ethers.utils.parseEther('0.1');
        let tx = {
            to: larvaDucks.address,
            value: amount
        }
        await expect(owner.sendTransaction(tx)).not.to.be.reverted;
        // Check that the contract received the correct amount
        expect(await ethers.provider.getBalance(larvaDucks.address)).to.be.equal(amount);
        // Withdraw all ETH from the contract
        await expect(larvaDucks.withdraw()).not.to.be.reverted;
        // Check that the contract's balance is equal to 0
        expect(await ethers.provider.getBalance(larvaDucks.address)).to.be.equal(0);
    })

    it("Shouldn't be able to withdraw", async () => {
        // Send ETH to the contract
        let amount = ethers.utils.parseEther('0.1');
        let tx = {
            to: larvaDucks.address,
            value: amount
        }
        await expect(owner.sendTransaction(tx)).not.to.be.reverted;
        // Check that the contract received the correct amount
        expect(await ethers.provider.getBalance(larvaDucks.address)).to.be.equal(amount);
        // Can't withdraw all ETH from the contract with another wallet than the owner
        await expect(larvaDucks.connect(addr1).withdraw()).to.be.revertedWith("Ownable: caller is not the owner");
    })
  });