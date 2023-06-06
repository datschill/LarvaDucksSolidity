const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LarvaDucks - TokenURI",  function () {
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

    it("Should retrieve the correct tokenURI", async () => {
        const tokenURI = '0123456789';
        const baseURI = 'baseURI://';
        let recipients = [addr1.address];
        let amounts = [2];
        // Mint 2 NFT
        await expect(larvaDucks.airdrop(recipients, amounts)).not.to.be.reverted;
        // TokenURI #0 should be empty
        expect(await larvaDucks.tokenURI(0)).to.be.equal('');
        // Set BaseURI
        await expect(larvaDucks.setBaseURI(baseURI)).not.to.be.reverted;
        // TokenURI #0 has been updated with the baseURI
        expect(await larvaDucks.tokenURI(0)).to.be.equal(`${baseURI}0`);
        // Set tokenURI #0
        await expect(larvaDucks.setTokenURI(0, tokenURI)).not.to.be.reverted;
        // TokenURI #0 has been updated with the tokenURI
        expect(await larvaDucks.tokenURI(0)).to.be.equal(tokenURI);
        // TokenURI #1 got the correct tokenURI
        expect(await larvaDucks.tokenURI(1)).to.be.equal(`${baseURI}1`);
    })
  });