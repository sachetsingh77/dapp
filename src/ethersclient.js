const ethers = require('ethers')
//const address = '0x6B804868C2E116688022336815ABe22BcD651992' //ropsten
const address = '0x8D9A4266c4d02E1aB80d42e545e89B49A3A8e264'
let Option, provider
class EthersClient{
  constructor(){
    this.contract = {}
  }
  async getOption(optionIdx){
    Option = await this.contract.optionsArray(optionIdx)
    const yesBalance = await this.contract.getResultBalance(Option.identifier, '1')
    const noBalance = await this.contract.getResultBalance(Option.identifier, '2')
    return {yesBalance, noBalance, newBetValue: '', newBetYesNo: '', identifierShort: Option.identifier.substring(0,8)+"...", identifier: Option.identifier, optionCode: Option.optionCode, description: Option.description, resolved: Option.resolved, expiryBlock: Option.expiryBlock}
  }
  async getBalance(optionId, yesNo){
    return await this.contract.getResultBalance(optionId, yesNo)
  }
  //Highly inefficient, should be single call
  async getOptions(){
    const optionsArray = []
    const count = await this.getOptionsCount()
    for (let i=0; i < count; i++){
      const binaryOption = await this.getOption(i)
      optionsArray.push(binaryOption)
    }
    return optionsArray
  }
  async getOptionsCount(){
    return await this.contract.optionsCount()
  }
  async resolveOption(optionId){
    const withSigner = this.contract.connect(provider.getSigner())
    await withSigner.resolveOption(optionId).catch(e => console.log(e))
  }
  async setOptionResult(optionId, outcome){
    const withSigner = this.contract.connect(provider.getSigner())
    await withSigner.setOptionResult(optionId, outcome).catch(e => console.log(e))
  }
  async receivePayment(optionId){
    const withSigner = this.contract.connect(provider.getSigner())
    await withSigner.receivePayment(optionId).catch(e => console.log(e))
  }
  async placeBet(optionId, betValue, yesNo){
    const withSigner = this.contract.connect(provider.getSigner())
    let payable = {value: betValue*1, gasLimit: 1000000, gasPrice: 100000000000}
    return await withSigner.placeBet(optionId, yesNo+'', payable).catch(e => console.log(e))
  }
  async addCryptoBinaryOption(token, price, expiryBlock){
    await this.addBinaryOption(token + "-" + price, token + " will be more than " + price + " on Expiry", expiryBlock);
  }
  async addBinaryOption(optionCode, optionDescription, optionExpiryInBlocks){
    const withSigner = this.contract.connect(provider.getSigner())
    await withSigner.addBinaryOption(optionCode, optionDescription, optionExpiryInBlocks).catch(e => console.log(e))
  }
  async init(){
    provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const abi = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "identifier",
            "type": "bytes32"
          },
          {
            "name": "result",
            "type": "uint8"
          }
        ],
        "name": "placeBet",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "optionsCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "Options",
        "outputs": [
          {
            "name": "optionCode",
            "type": "string"
          },
          {
            "name": "identifier",
            "type": "bytes32"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "expiryBlock",
            "type": "uint256"
          },
          {
            "name": "resolved",
            "type": "bool"
          },
          {
            "name": "result",
            "type": "uint8"
          },
          {
            "name": "totalPot",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "identifier",
            "type": "bytes32"
          }
        ],
        "name": "receivePayment",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "optionCode",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "durationInBlocks",
            "type": "uint256"
          }
        ],
        "name": "addBinaryOption",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "identifier",
            "type": "bytes32"
          }
        ],
        "name": "resolveOption",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "identifier",
            "type": "bytes32"
          },
          {
            "name": "result",
            "type": "uint8"
          }
        ],
        "name": "getResultBalance",
        "outputs": [
          {
            "name": "balance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "identifier",
            "type": "bytes32"
          },
          {
            "name": "result",
            "type": "uint8"
          }
        ],
        "name": "setOptionResult",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "optionsArray",
        "outputs": [
          {
            "name": "optionCode",
            "type": "string"
          },
          {
            "name": "identifier",
            "type": "bytes32"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "expiryBlock",
            "type": "uint256"
          },
          {
            "name": "resolved",
            "type": "bool"
          },
          {
            "name": "result",
            "type": "uint8"
          },
          {
            "name": "totalPot",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "identifier",
            "type": "bytes32"
          }
        ],
        "name": "getTotalPot",
        "outputs": [
          {
            "name": "totalPot",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "Bets",
        "outputs": [
          {
            "name": "amount",
            "type": "uint256"
          },
          {
            "name": "predictedResult",
            "type": "uint8"
          },
          {
            "name": "paidOut",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      }
    ]
    this.contract = new ethers.Contract(address, abi, provider);
    
  }
}

module.exports = {EthersClient}
