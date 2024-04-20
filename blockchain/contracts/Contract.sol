// SPDX-License-Identifier: MIT
// Project : Vortex
// Author : Dave
pragma solidity ^0.8.0;

contract SupplyChain {
    address public owner;
    bool public locked;

    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner(){
        require(msg.sender == owner, "only owners can do this");
        _;
    }

    modifier nonReentrant(){
        require(!locked,"nonReentrant call detected!");
        locked = true;
        _;
        locked = false;
    }
    
    mapping(uint256 => string[]) produce_cid_mapping;
    mapping(uint256 => uint256) produce_cid_length;

    event addingBlock(uint _produce_id, string _cid);

    function addToBlockchain(uint _produce_id, string memory _cid) external nonReentrant {
        require(_produce_id>0,"Product id must be greater than zero");
        require(bytes(_cid).length == 46,"invalid CID");
        produce_cid_mapping[_produce_id].push(_cid);
        produce_cid_length[_produce_id] += 1;
        emit addingBlock(_produce_id,_cid);
    }

    function retrieveCID(uint _produce_id) external view returns(string[] memory) {
        require(_produce_id>0,"Product id must be greater than zero");
        uint length = produce_cid_length[_produce_id];
        require(length>0,"product id not found");
        return produce_cid_mapping[_produce_id];
    }
}