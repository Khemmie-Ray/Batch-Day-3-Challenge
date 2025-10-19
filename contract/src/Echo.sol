// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Echo {
    struct Signer {
        address wallet;
        string username;
    }

    mapping(address => string) public usernames;
    Signer[] private signers;

    event Signed(address indexed signer, string username);

    function joinEcholist(string calldata _username) external {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(usernames[msg.sender]).length == 0, "Already signed");

        usernames[msg.sender] = _username;
        signers.push(Signer(msg.sender, _username));

        emit Signed(msg.sender, _username);
    }

    function getAllSigners() external view returns (Signer[] memory) {
        return signers;
    }

    function totalSignatures() external view returns (uint256) {
        return signers.length;
    }
}
