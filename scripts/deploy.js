const { parseEther } = require('@ethersproject/units');
const {ethers, upgrades} = require('hardhat');

const supply = "1000000";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    /**
     * Deploy upgradable
     */
    const BOH = await ethers.getContractFactory("BOH");
    const contract = await upgrades.deployProxy(BOH, [parseEther(supply)]);
    await contract.deployed();

    /**
     * Upgrade contract
     */
    // const addressContract = "0x94aF6B70d3823DB1C581cc00DE20844D81506903";
    // const BoxV2 = await ethers.getContractFactory("BOH");
    // const upgraded = await upgrades.upgradeProxy(addressContract, BoxV2);

    console.log("Token address:", contract.address);
}
  
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
  