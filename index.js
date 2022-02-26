const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const giftList = require("./data/whitelist.json");

const hashedAddresses = giftList.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(hashedAddresses, keccak256, {
  sortPairs: true,
});

const myAddress = "0x9D16ea37330985dBe038fEc7fc12Ed3176a3F523";
const hashedAddress = keccak256(myAddress);
const proof = merkleTree.getHexProof(hashedAddress);
const root = merkleTree.getHexRoot();

// just for front-end display convenience
// proof will be validated in smart contract as well
const valid = merkleTree.verify(proof, hashedAddress, root);

console.log("merkleProof:", proof);
console.log("merkleRoot:", root);
console.log("isValid:", valid);
