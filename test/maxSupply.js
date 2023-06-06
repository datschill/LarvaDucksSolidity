const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LarvaDucks - Max Supply",  function () {
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

    it("Shouldn't be able to increase the max supply", async () => {
        let maxSupply = await larvaDucks.maxSupply();
        maxSupply = maxSupply.toNumber() + 1;

        await expect(larvaDucks.setMaxSupply(maxSupply)).to.be.revertedWith("Can only reduce the max supply");
    })

    it("Should be able to decrease the max supply", async () => {
        let maxSupply = await larvaDucks.maxSupply();
        maxSupply = maxSupply.toNumber() - 1;

        await larvaDucks.setMaxSupply(maxSupply);
        expect(await larvaDucks.maxSupply()).to.equal(maxSupply);
    })

    it("Shouldn't be able to decrease the max supply below the totalSupply", async () => {
        let recipients = [addr1.address];
        let amounts = [10];
        // Airdrop
        await expect(larvaDucks.airdrop(recipients, amounts)).not.to.be.reverted;
        // Max Supply to 9
        await expect(larvaDucks.setMaxSupply(9)).to.be.revertedWith("Max supply must be greater than the current supply");
    })
  });