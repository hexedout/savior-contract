pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Savior is AccessControl {
  bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");

  IERC20 public token;
  address public targetWallet;
  address public receiver;

  constructor(address _target, address _receiver, address _token) {
    token = IERC20(_token);
    receiver = _receiver;
    targetWallet = _target;

    _grantRole(EXECUTOR_ROLE, receiver);
  }

  modifier onlyTarget() {
    require(msg.sender == targetWallet, "Address not the owner");
    _;
  }

  modifier onlyReceiver() {
    require(msg.sender == receiver, "Address not the receiver");
    _;
  }

  function addExecutor(address _executor) public onlyTarget {
    require(_executor != targetWallet, "Cannot add target as executor");
    require(!hasRole(EXECUTOR_ROLE, _executor), "Address already an executor");

    _grantRole(EXECUTOR_ROLE, _executor);
  }

  function trigger() public onlyRole(EXECUTOR_ROLE) {
      uint balance = token.balanceOf(targetWallet);
      uint256 allowance = token.allowance(targetWallet, address(this));

      if (balance > 0 && allowance >= balance) {
        token.transferFrom(targetWallet, address(this), balance);
      }
  }

  function withdraw() public onlyReceiver {
    uint balance = token.balanceOf(address(this));
    token.transfer(receiver, balance);
  }
}
