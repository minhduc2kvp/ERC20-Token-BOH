const { BigNumber } = require('@ethersproject/bignumber');
const { parseEther, formatEther } = require('@ethersproject/units');
const {expect} = require('chai');
const { ethers, upgrades, utils } = require('hardhat');

const supply = "1000000"

describe("BOH Token Contract", function () {

    let contract, BOH, owner, addr1, addr2, addrs;
    
    beforeEach(async function() {
        BOH = await ethers.getContractFactory('BOH');
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        contract = await upgrades.deployProxy(BOH, [parseEther(supply)]);
    });

    describe("Deployment", function() {
        it('Should assign the total supply of tokens to the owner', async function(){
            const ownerBalance = await contract.balanceOf(owner.address)
            expect(await contract.totalSupply()).to.equal(ownerBalance)
        });
    });

    describe("Transaction", function() {
        it('The balance of sender should be decrease amount equal amount of balance of receiver increase', async function(){
            let ownerBal = BigNumber.from(await contract.balanceOf(owner.address))
            let receiverBal = BigNumber.from(await contract.balanceOf(addr1.address))
            const value = "100"
            await contract.transfer(addr1.address, parseEther(value))
            let ownerBalNew = BigNumber.from(await contract.balanceOf(owner.address))
            let receiverBalNew = BigNumber.from(await contract.balanceOf(addr1.address))
            expect(ownerBal.sub(BigNumber.from(parseEther(value)))).to.equal(ownerBalNew)
            expect(receiverBal.add(BigNumber.from(parseEther(value)))).to.equal(receiverBalNew)
        });
    });

    describe("Burn", function() {
        it('Should decrease the total supply of tokens and decrease the balance of sender', async function(){
            let ownerBal = BigNumber.from(await contract.balanceOf(owner.address))
            let total = BigNumber.from(await contract.totalSupply())
            const value = "100"
            await contract.burn(parseEther(value))
            let ownerBalNew = BigNumber.from(await contract.balanceOf(owner.address))
            let totalNew = BigNumber.from(await contract.totalSupply())
            expect(ownerBal.sub(BigNumber.from(parseEther(value)))).to.equal(ownerBalNew)
            expect(total.sub(BigNumber.from(parseEther(value)))).to.equal(totalNew)
        });
    });

});