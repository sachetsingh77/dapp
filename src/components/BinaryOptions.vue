<template>
<v-container>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="getBinaryOptions()">Get Binary Options</button>
  <table>
  <thead>
    <tr>
      <th>Binary Option</th>
      <th>ID</th>
      <th>Expiry Block</th>
      <th>Resolved</th>
      <th>Yes Balance</th>
      <th>No Balance</th>
      <th>Bet Amount</th>
      <th>Yes/No</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(option, idx) in binaryOptions" :key="idx">
      <td>{{option.description}}</td>
      <td>{{option.identifierShort}}</td>
      <td>{{option.expiryBlock}}</td>
      <td>{{option.resolved}}</td>
      <td>{{option.yesBalance}}</td>
      <td>{{option.noBalance}}</td>
      <td><input type="text" v-model="option.newBetValue"/></td>
      <td>
        <select v-model="option.newBetYesNo">
          <option value="1">Yes</option>
          <option value="2">No</option>
        </select></td>
      <td><button @click="placeBet(option.identifier, option.newBetValue, option.newBetYesNo)">Place Bet</button></td>
    </tr>
  </tbody>
  </table>
  <h1>Create New Options</h1>
  <table>
  <thead>
    <tr>
      <th>Instrument</th>
      <th>Price</th>
      <th>Blocks Till Expiry</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(instrument, idx) in instruments" :key="idx">
      <td>{{instrument.symbol}}</td>
      <td><input type="text" v-model="instrument.price"/></td>
      <td><input type="text" v-model="instrument.expiryBlock"/></td>
      <td><button @click="addCryptoBinaryOption(instrument.symbol, instrument.price, instrument.expiryBlock)">Create Binary Option</button></td>
    </tr>
  </tbody>
  </table>
  </div>
</v-container>
</template>

<script>
import { EthersClient } from '../ethersclient'
//let options = []
let initialized = false
let client = ''
export default {
  name: 'BinaryOptions',
  props: {
    msg: String
  },
  mounted: async function(){
    if (true == initialized) return
    client = new EthersClient()
    await client.init()
    initialized = true
    this.getBinaryOptions()
  },
  data: function(){
    return {
      binaryOptions: [],
      instruments: [{symbol: 'BTC', price: '', expiryBlock:''}, {symbol: 'ETH', price: '', expiryBlock:''}, {symbol: 'L2', price: '', expiryBlock:''}]
    }
  },
  methods:{
    async getBinaryOptions() {
      const result = await client.getOptions()
      this.binaryOptions = []
      for (let i=0; i<result.length; i++){
        this.binaryOptions.push(result[i])
      }
      console.log(this.binaryOptions)
    },
    async placeBet(optionId, newBetValue, newBetYesNo){
      await client.placeBet(optionId, newBetValue, newBetYesNo)
    },
    async addCryptoBinaryOption(instrument, price, expiryBlock){
      client.addCryptoBinaryOption(instrument, price, expiryBlock)
    }
  }
  
}
</script>

<style>
.entriesTable {
  border: 1px;
}
a{text-decoration: none;}
@-o-keyframes fadeIt {
  0% { background-color: #FFFFFF; }
  50% { background-color: #0861BA; }
  100% { background-color: #FFFFFF; }
}
@keyframes fadeIt {
  0% { background-color: #FFFFFF; }
  50% { background-color: #0861BA; }
  100% { background-color: #FFFFFF; }
}
.unconfirmedGblock {
  color: #ff7f00
}
.list-enter-active, .list-leave-active {
    transition: all 5s
  }
  .list-enter, .list-leave-to {
    opacity: 0
  }
.floatRight{
  float: left;
}
.backgroundAnimated {
  background-image: none !important;
  -o-animation: fadeIt 1s ease-in-out;
  animation: fadeIt 1s ease-in-out;
}
.v-application .text-right {
  text-align: right !important;
}
.logo-svg {
  width: 5.5rem;
  height: 5.5rem;
  padding-left: .5rem
}

.logo-svg .logo-g {
  isolation: isolate
}
.logo-svg .circle {
  fill: #1976d2
}
.logo-svg .hi-tri {
  fill: #1976d2
}
.logo-svg .lo-tri {
  fill: #0861BA
}
.logo-svg .overlap {
  fill: #0D47A1
}
.logo-name {
  height: 3.5rem
}

.logo-name .name {
  fill: #ff7f00
}
</style>
