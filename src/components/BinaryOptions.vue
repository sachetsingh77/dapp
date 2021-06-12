<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getBinaryOptions()">Get Binary Options</button>
    <!-- <ul v-for="(option, idx) in binaryOptions" :key="idx">
      <li>
        <td>Binary Option: {{option.description}}&nbsp;</td>
        <td>Binary Option ID: {{option.identifier}}&nbsp;</td>
        <td>Expiry Block: {{option.expiryBlock}}&nbsp;</td>
        <td>Resolved: {{option.resolved}}&nbsp;</td>
      </li>
    </ul>
    <ul>
      <button @click="predict()">Predict</button>
    </ul>
    <ul>
      <button @click="addBinaryOption()">Add Binary Option</button>
    </ul> -->
    <table>
  <thead>
    <tr>
      <th>Binary Option</th>
      <th>ID</th>
      <th>Expiry Block</th>
      <th>Resolved</th>
      <th>Yes Balance</th>
      <th>No Balance</th>
      <th>Predict Amount</th>
      <th>Predict</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(option, idx) in binaryOptions" :key="idx">
      <td>{{option.description}}</td>
      <td>{{option.identifier}}</td>
      <td>{{option.expiryBlock}}</td>
      <td>{{option.resolved}}</td>
      <td>0</td>
      <td>0</td>
      <td><input type="text" value="" @change="setBetFor()"/></td>
      <td><button @click="predict(option.identifier, option.newBetValue)">Predict</button></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td></td>
    </tr>
  </tfoot>
</table>
  </div>
</template>

<script>
import { EthersClient } from '../ethersclient'
let options = []
export default {
  name: 'BinaryOptions',
  props: {
    msg: String
  },
  mounted: async function(){
    //await this.getBinaryOptions()
  },
  data: function(){
    return {
      binaryOptions: options
    }
  },
  methods:{
    async getBinaryOptions() {
      const client = new EthersClient()
      await client.init()
      //binaryOptions = []
      const result = await client.getOptions()
      for (let i=0; i<result.length; i++){
        options.push(result[i])
      }
      console.log("Binary Options")
      console.log(options)
      /*const optionsCount = await client.getOptionsCount()
      for (let i=0; i < optionsCount; i++){
        binaryOptions.push({optionCode: 'opcode', yesBalance: 0, noBalance: 0})
      }*/
    },
    async predict(bytes32OptionId){
      console.log(bytes32OptionId)
      /*const client = new EthersClient()
      await client.init()
      await client.predict(bytes32OptionId)*/
    },
    async addBinaryOption(){
      const client = new EthersClient()
      await client.init()
      client.addCryptoBinaryOption("BTC", 40000)
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
