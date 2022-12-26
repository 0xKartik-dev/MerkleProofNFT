pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleProofNFT is ERC721 {
    bytes32 public mRootHash;

    mapping(address => bool) public trackerList;

    constructor(bytes32 _mRootHash)
        ERC721("MerkleProof NFT Contract", "MPFNFT")
    {
        mRootHash = _mRootHash;
    }

    function mint(bytes32[] calldata _mProofBySender) external {
        bytes32 leaf = keccak256(abi.encode(msg.sender));
        require(!trackerList[msg.sender], "You have already claimed bro");
        require(
            MerkleProof.verify(
                _mProofBySender,
                mRootHash,
                leaf,
                "Invalid Proof bro"
            )
        );
        trackerList[msg.sender] = true;
    }
}
