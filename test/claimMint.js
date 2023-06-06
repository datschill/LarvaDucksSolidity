const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LarvaDucks - Claim Mint",  function () {
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
   
    it("Shouldn't be possible to claim if sale is not open", async () => {
        await expect(larvaDucks.claimMint(owner.address, 1)).to.be.revertedWith("Sale not open");
    })

    it("Shouldn't be possible to claim if not allowlisted", async () => {
        let maxToClaim = await larvaDucks.claimNumber(owner.address);
        // Not allowlisted
        if (maxToClaim === 0) {
            await larvaDucks.setSaleOpen(true);
            await expect(larvaDucks.claimMint(owner.address, 1)).to.be.revertedWith("Wallet not allowlisted");
        }
    })

    it("Should be possible to claim if allowlisted", async () => {
        let maxToClaim = await larvaDucks.claimNumber(owner.address);
        // Allowlisted
        if (maxToClaim > 0) {
            await larvaDucks.setSaleOpen(true);
            await expect(larvaDucks.claimMint(owner.address, maxToClaim)).to.not.be.reverted;
        }
    })

    it("Shouldn't be possible to claim if it has already been claimed", async () => {
        let maxToClaim = await larvaDucks.claimNumber(owner.address);
        if (maxToClaim > 0) {
            await larvaDucks.setSaleOpen(true);
            await expect(larvaDucks.claimMint(owner.address, maxToClaim)).to.not.be.reverted;
            await expect(larvaDucks.claimMint(owner.address, 1)).to.be.revertedWith("Already claimed with this wallet");
        }
    })

    it("Should at least claim one", async () => {
        let maxToClaim = await larvaDucks.claimNumber(owner.address);
        if (maxToClaim > 0) {
            await larvaDucks.setSaleOpen(true);
            await expect(larvaDucks.claimMint(owner.address, 0)).to.be.revertedWith("Should mint at least one");
        }
    })

    it("Shouldn't be able to claim more than maxToClaim", async () => {
        let maxToClaim = await larvaDucks.claimNumber(owner.address);
        if (maxToClaim > 0) {
            await larvaDucks.setSaleOpen(true);
            await expect(larvaDucks.claimMint(owner.address, maxToClaim+1)).to.be.revertedWith("Too many tokens claimed");
        }
    })

    it("Should mint the correct number of NFTs", async () => {
        let maxToClaim = await larvaDucks.claimNumber(owner.address);
        if (maxToClaim > 0) {
            await larvaDucks.setSaleOpen(true);
            await expect(larvaDucks.claimMint(owner.address, maxToClaim)).to.not.be.reverted;
            expect(await larvaDucks.balanceOf(owner.address)).to.be.equal(maxToClaim);
        }
    })
  });