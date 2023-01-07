const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

const privateKey = secp.utils.randomPrivateKey();

console.log('privateKey:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey); 

function getAddress(publicKey) {
    // Convert the publicKey object into a buffer
    const publicKeyBuffer = Buffer.from(publicKey);

    // Hash the publicKey buffer using keccak256 and slice the last 20 bytes
    return keccak256(publicKeyBuffer).slice(-20);
}

const address = getAddress(publicKey);

// Output the address as a hex-encoded string
console.log('address:', toHex(address));