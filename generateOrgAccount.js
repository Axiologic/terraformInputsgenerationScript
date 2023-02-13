function createOrgAccount() {
    const Web3 = require("web3");

    const web3 = new Web3('http://ref-quorum-node1:8545'); // your geth

    //create a new account which doesn't have a storekey located in the blockchain node
    const newAccount = web3.eth.accounts.create();
    const orgAccData = {
        privateKey: newAccount.privateKey,
        address: newAccount.address
    }

    return Buffer.from(JSON.stringify(orgAccData)).toString("base64");
}

function generateBase64Random32Bytes() {
    return require("crypto").randomBytes(32).toString("base64");
}

function generateValidator(){
    const crypto = require('crypto');
    const entropy = crypto.randomBytes(128);
    const eth = require('eth-crypto');
    const identity = eth.createIdentity(entropy);
    return {
        nodekey:identity.privateKey.slice(2),
        nodeAddress : identity.address.toString(),
        enode : identity.publicKey.toString()
    }
}


console.log("ORG_ACCOUNT:", createOrgAccount());
console.log();
console.log("EPI_BUILD_SECRET_KEY:", generateBase64Random32Bytes())
console.log();
console.log("EPI_SSO_SECRETS_ENCRYPTION_KEY:", generateBase64Random32Bytes())
console.log();
console.log("ENODE:", generateValidator().enode)