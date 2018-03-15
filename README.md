# eth-event-megaphone

Whenever a solidity event fires in an Ethereum smart contract, we can harness it, and broadcast it to all of the contract followers using PubNub.

When a new Crowdsale is launched like in this [contract](https://github.com/ajb413/crowdsalable-eth-token), this node.js script can be used to signal to every investor's web browser that the sale has opened, display the buy button UI, and profit $$$.

```javascript
// Build an ABI using the Truffle framework and Solidity, provide the JSON to this script

let TokenContractABI = web3.eth.contract(ContractBuild.abi);

let TokenContract = TokenContractABI.at('__YOUR_CONTRACT_ADDRESS__');

let crowdsaleDeployedEvent = TokenContract.CrowdsaleDeployed();

crowdsaleDeployedEvent.watch(function(error, result){
  publishMessage(result);
});
```

[PubNub](https://pubnub.com/?adamb=eth-event-megaphone) also provides API's for history, APNS, Functions, and more to send every flavor of signal to your customers.