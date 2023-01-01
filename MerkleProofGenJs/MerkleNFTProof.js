const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

let whitelistAdresses = [
  "0xca0E68dDdc4cE79ec5d77ae86f38E88B98Afbb3F",
  "0x043aDc495fF1F6D008B779A51C14A9F65d81CdbF",
];

const leafNodes = whitelistAdresses.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

const rootHash = merkleTree.getHexRoot();
console.log("GM");
console.log("WHitelist Merkle Tree\n", merkleTree.toString());

console.log("Root Hash: ", rootHash);

//generate proofs for address
const claimAddr = leafNodes[0];

const getProof = merkleTree.getHexProof(claimAddr);

console.log("get proof\n", getProof);
