const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { recoverTypedSignature } = require('@metamask/eth-sig-util');

app.use(cors());
app.use(express.json());

const balances = {
  "ce515ba8f34223ea22138338ed4802373ad4900a": 100,
  "9d0c79b41928dce1acc0cd5332570288ba1a4d15": 50,
  "283de1cfc3da8fbe1179dcbcae579188e56be2d2": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send-funds", (req, res) => {
  // Log the req.body object to the console to make sure it is correctly populated
  console.log(req.body);

  // Extract the signature, fromAddress, toAddress and amount fields from the request body
  const { signature, fromAddress, toAddress, amount } = req.body;

  // If any of the required fields are not defined, return an error response
  if (!signature || !fromAddress || !toAddress || !amount) {
    return res.status(400).send({ message: "Missing required parameters" });
  }

  // Try to verify the signature and retrieve the address
  let address;
  try {
    address = verifySignature(signature, fromAddress);
  } catch (error) {
    // If an error occurs, return a 400 Bad Request response with the error message
    return res.status(400).send({ message: error.message });
  }

  // If the signature is not valid, return a 401 Unauthorized response
  if (!address) {
    return res.status(401).send({ message: "Invalid signature" });
  }

  // Check if the fromAddress has sufficient balance
  if (balances[fromAddress] < amount) {
    return res.status(400).send({ message: "Insufficient balance" });
  }

  // Send the funds to the toAddress
  sendFunds(fromAddress, toAddress, amount);

  // Return a 200 OK response with the updated balances
  res.send({ fromAddress: balances[fromAddress], toAddress: balances[toAddress] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function verifySignature(signature, address) {
  // Decode the signature
  const decodedSignature = recoverTypedSignature({
    data: 'Message to sign',
    sig: signature,
    version: 'V3'
  });

  // Check if the address in the signature matches the expected address
  if (decodedSignature.recoveredAddress === address) {
    return address;
  } else {
    return null;
  }
}

function sendFunds(fromAddress, toAddress, amount) {
// Deduct the amount from the fromAddress balance
balances[fromAddress] -= amount;

// Add the amount to the toAddress balance
balances[toAddress] += amount;
}