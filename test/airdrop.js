const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LarvaDucks - Airdrop",  function () {
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

    it("Should be able to airdrop NFTs to several address", async () => {
        let recipients = [addr1.address, addr2.address, addrs[0].address];
        let amounts = [1, 2, 3];
        // Airdrop
        await expect(larvaDucks.airdrop(recipients, amounts)).not.to.be.reverted;
        // Addr1 has 1
        expect(await larvaDucks.balanceOf(addr1.address)).to.be.equal(1);
        // Addr2 has 2
        expect(await larvaDucks.balanceOf(addr2.address)).to.be.equal(2);
        // Addr3 has 3
        expect(await larvaDucks.balanceOf(addrs[0].address)).to.be.equal(3);
    })
  });