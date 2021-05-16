pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BOH is ERC20Upgradeable, OwnableUpgradeable{

    function initialize(uint256 initialSupply) public initializer {
        __ERC20_init("BSC Openzepplin HardHat", "BOH");
        __Ownable_init();
        _mint(msg.sender, initialSupply);
    }

    function burn(uint256 value) public onlyOwner {
        _burn(msg.sender, value);
    }

}