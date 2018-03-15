// Libs
const PubNub = require('pubnub');
const Web3 = require('web3');
const ContractBuild = require('PATH_TO_TRUFFLE/build/contracts/Token.json');

// PubNub
pubnub = new PubNub({
  publishKey : '__YOUR_PUB_KEY__',
  subscribeKey : '__YOUR_SUB_KEY__'
});

function publishMessage(event) {
  let publishConfig = {
    channel : 'new_crowdsales',
    message : event
  }

  pubnub.publish(publishConfig, function(status, response) {
    console.log(status, response);
  });
}

// You can subscribe on a webpage that allows the clients to purchase the token.
// The instant the crowdsale opens they can see it in their browser thanks to PubNub:
/*
pubnub.addListener({
  message: function(message) {
    console.log("New Message!!", message);
  }
})
pubnub.subscribe({
  channels: ['new_crowdsales'] 
});
*/

// Web3.js
let web3;

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  // this is the default `truffle develop` network
  // it can of course be changed to the main Ethereum network
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

let TokenContractABI = web3.eth.contract(ContractBuild.abi);

let TokenContract = TokenContractABI.at('__YOUR_CONTRACT_ADDRESS__');

let crowdsaleDeployedEvent = TokenContract.CrowdsaleDeployed();

crowdsaleDeployedEvent.watch(function(error, result){
  publishMessage(result);
});
