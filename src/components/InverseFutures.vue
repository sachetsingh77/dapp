<template>
<v-container>
  <v-row>
    <v-col cols="6">
      <v-card-title>Select Pair</v-card-title>
      <v-select label="Pair" v-model="pairAddress" :items="pairs">AMM Pairs</v-select>
      <v-btn @click="approveAllowance()" color="primary">Approve Allowance</v-btn>
    </v-col>              
  </v-row>
  <v-row>
      <v-col>
        <v-card>
          <v-expansion-panels v-model="addPairPanel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Add Pair to vAMM
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="mx-1">
                  <v-col>
                    <v-text-field label="Factory" v-model="factoryAddress"></v-text-field>
                  </v-col>
                  
                  <v-col>
                    <v-text-field label="Token0" v-model="token0"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field label="Token0 Pool" v-model="token0Pool"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field label="Token1" v-model="token1"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field label="Token1 Pool" v-model="token1Pool"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn @click="addPair()" color="primary">Add Pair</v-btn>
                  </v-col>
                  
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-expansion-panels v-model="positionPanel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Open Position For Inverse Contract
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="mx-1">
                  <v-col>
                    <v-text-field label="Margin" v-model="margin" type="number"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field label="Leverage" v-model="leverage" type="number"></v-text-field>
                  </v-col>
                  <v-col>
                      <v-select label="Long/Short" v-model="longShort" :items="[{text: 'Long', value: LONG}, {text: 'Short', value: SHORT}]">BUY/SELL</v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn @click="openPosition()" color="primary">Open Position</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn @click="closePosition()" color="primary">Close Position</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn @click="withdraw()" color="primary">Withdraw</v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-expansion-panels v-model="liquidationPanel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Liquidation
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="mx-1">
                  <v-col>
                      <v-select label="Trader" v-model="liquidateTrader" :items="tradersForPair">Traders</v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn @click="liquidate()" color="primary">Liquidate Trader</v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  <v-row>
        <v-col cols="12">
      <v-data-table dense class="mt-4 entriesTable elevation-2"
      :items="kvTable" :headers="kvTableHeaders" caption="Contract State"
      :items-per-page="100"
      :server-items-length="rowCount"
      >
      </v-data-table>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-btn @click="refresh()">Display Contract State</v-btn>
        </v-col>
    </v-row>
    <v-snackbar v-model="snack.display" :timeout="snack.duration" :color="snack.color">
      {{ snack.text }}
      <v-btn text @click="snack.display = false">Close</v-btn>
    </v-snackbar> 
</v-container>
</template>
<script>
const ethers = require('ethers');
import BigNumber from 'bignumber.js'
import util from '../util'
export default {
  name: 'InverseFutures',
  mounted: async function(){
    await window.ethereum.enable()
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await this.provider.getNetwork()
    this.chainId = network.chainId
    console.log(this.chainId)
    const abi = require('./InverseFuturesAbi.json')
    this.contract = new ethers.Contract(this.contractAddresses[this.chainId], abi, this.provider);
    const pairsLength = await this.contract.getPairsLength();
    for (let i=0; i<pairsLength; i++){
      this.pairs.push(await this.contract.pairs(i));
    }
  },
  data: function(){
    return {
        positionPanel: [],
        addPairPanel: [],
        liquidationPanel: [],
        provider: '',
        pairs: [],
        pairAddress: '',
      contract: '',
      factoryAddress: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
      chainId: '',
      contractAddresses: {'3': '0x800d1021Bab494d09f5be6E2caa2D6F54Be00F3C', '4002': '0x9e7B85AcF8A03A398Cb01C910C568998766b3d99'},
      longShort: 0,
      tradersForPair: [],
      liquidateTrader: '',
      LONG: 0,
      SHORT: 1,
      token0: '0x0d657847A92eC8f0130E17406367c29E254387Ee',
      token1: '0xf1277d1Ed8AD466beddF92ef448A132661956621',
      token0Pool: '800',
      token1Pool: '4',
      margin: '',
      leverage: 10,
      rowCount: 100,
      currentAccount: '',
      kvTable: [],
      kvTableHeaders: [{text: 'Key', value: 'Key', sortable: false}, {text: 'Val', value: 'Val', sortable: false}],
      snack: {
        display: false,
        duration: 4000,
        color: "info",
        text: "",
      },
    }
  },
  methods: {
      refresh: async function(){
        if (!this.pairAddress) {
          util.handleError(this.snack, 'No Pair Selected');
          return;
        }
          this.kvTable = [];
          this.kvTable.push({Key: 'Address', Val: this.contractAddresses[this.chainId]})
          this.kvTable.push({Key: 'Contract Balance', Val: await this.provider.getBalance(this.contract.address)}) 
          this.kvTable.push({Key: '----------vAMM Pool----------', Val: ''})
          const resp = await this.contract.vAmmConstantProductByPair(this.pairAddress);
          this.kvTable.push({Key: 'Pair Address', Val: this.pairAddress}) 
          this.token0 = await this.contract.tokensForPair(this.pairAddress, 0)
          this.token1 = await this.contract.tokensForPair(this.pairAddress, 1)
          this.kvTable.push({Key: 'Token A', Val: this.token0}) 
          this.kvTable.push({Key: 'Token B', Val: this.token1}) 
          const contractsAmt = await this.contract.vAmmPoolByPair(this.pairAddress, 0);
          const quoteCcyAmt = await this.contract.vAmmPoolByPair(this.pairAddress, 1);
          this.kvTable.push({Key: 'Contracts', Val: contractsAmt}) 
          this.kvTable.push({Key: 'Quote Ccy Amt', Val: quoteCcyAmt}) 
          this.kvTable.push({Key: 'Price', Val: (quoteCcyAmt/contractsAmt).toFixed(2)}) 
          
          this.kvTable.push({Key: 'Constant Product', Val: resp.toString()})
          this.kvTable.push({Key: '----------Trader Positions----------', Val: ''})
          
          
          let traderNotFound = false
          this.tradersForPair = []
          let count = 0;
          while (!traderNotFound){
              const trader = await this.contract.tradersForPair(this.pairAddress, count).catch(e => {
                  traderNotFound = true
                  console.log(e)
              });
              count ++;
              if (!traderNotFound){
                  this.tradersForPair.push(trader)
                  
              }
          }
          count = 1
          for (const trader of this.tradersForPair){
              this.kvTable.push({Key: 'Trader ' + count, Val: trader})
              count ++
              const position = await this.contract.positions(this.pairAddress, trader);
              this.kvTable.push({Key: 'Contract Amt ', Val: position.contractAmt})
              this.kvTable.push({Key: 'QuoteCcy Amt ', Val: position.quoteCcyAmt})
              this.kvTable.push({Key: 'Liquidation Price ', Val: position.liquidationPrice})
              this.kvTable.push({Key: 'Unrealized PnL ', Val: await this.contract.getUnrealizedPnL(this.pairAddress, trader)})
              this.kvTable.push({Key: 'Margin ', Val: await this.contract.marginByPairByTrader(this.pairAddress, trader)})
              
          }
      },
      addPair: async function(){
          const withSigner = this.contract.connect(this.provider.getSigner()) 
          await withSigner.addPair(this.factoryAddress, this.token0, this.token1, new BigNumber(1e18).times(this.token0Pool).toString(), new BigNumber(1e18).times(this.token1Pool).toString()).catch(e => {
              console.log(e)
              util.handleError(this.snack, e.message)
          })
      },
      approveAllowance: async function(){
        if (!this.pairAddress) {
          util.handleError(this.snack, 'No Pair Selected');
          return;
        }
        this.token0 = await this.contract.tokensForPair(this.pairAddress, 0)
        this.token1 = await this.contract.tokensForPair(this.pairAddress, 1)
          
        const txnValue = new BigNumber(1e18).times(2);
        const erc20Abi = require('./ERC20Abi.json')
        const erc20Contract = new ethers.Contract(this.token0, erc20Abi, this.provider);
        const withErc20Signer = erc20Contract.connect(this.provider.getSigner())
        await withErc20Signer.approve(this.contract.address, txnValue.toString());
          
      },
      openPosition: async function(){
          const withSigner = this.contract.connect(this.provider.getSigner()) 
          const txnValue = new BigNumber(1e18).times(this.margin);
          await withSigner.openPositionERC20(this.pairAddress, txnValue.toString(), this.leverage, this.longShort).catch(e => {
              console.log(e)
              util.handleError(this.snack, e.message)
          })
      },
      closePosition: async function(){
          //alert(this.margin + 'X' + this.leverage + ' ' + this.longShort)
          const withSigner = this.contract.connect(this.provider.getSigner()) 
          await withSigner.closePosition(this.pairAddress).catch(e => {
              console.log(e)
              util.handleError(this.snack, e.message)
          })
      },
      liquidate: async function(){
          const withSigner = this.contract.connect(this.provider.getSigner()) 
          await withSigner.liquidateTrader(this.pairAddress, this.liquidateTrader).catch(e => {
              console.log(e)
              util.handleError(this.snack, e.message)
          })
      },
      withdraw: async function(){
          //alert(this.margin + 'X' + this.leverage + ' ' + this.longShort)
          const withSigner = this.contract.connect(this.provider.getSigner()) 
          await withSigner.withdrawAllERC20(this.pairAddress).catch(e => {
              console.log(e)
              util.handleError(this.snack, e.message)
          })
      }
  }
}
</script>
