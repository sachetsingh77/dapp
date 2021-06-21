<template>
<v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-expansion-panels :multiple="multiplePanels" v-model="panels" :value="panels">
            <v-expansion-panel>
              <v-expansion-panel-header>Create Options
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="mx-1">
                     <v-col>
                    <v-select label="Instrument" v-model="instrumentSelected" :items="instruments.map(instr => instr.symbol)">Instrument</v-select>
                  </v-col>
                  <v-col>
                      <v-text-field label="Price" v-model="instrumentSelectedPrice"></v-text-field>
                  </v-col>
                  <v-col>
                      <v-text-field label="Expiry" v-model="instrumentSelectedExpiry"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                    <v-col>
                      <v-btn @click="addCryptoBinaryOption(instrumentSelected, instrumentSelectedPrice, instrumentSelectedExpiry)">Create Option</v-btn>
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
          <v-data-table
            class="mt-4 entriesTable elevation-2"
            :headers="headers"
            :items="binaryOptions"
            item-key="optionCode"
            :hide-default-footer="hideDefaultFooter"
            :footer-props="footerProps"
            :items-per-page="100"
            :server-items-length="rowCount"
            :loading="loadingStatus"
            loading-text="Loading... Please wait"
            >
            <template v-slot:item="{ item}">
            <tr>
              <td nowrap="true">{{ item.optionCode }}</td>
              <td nowrap="true">{{ item.description }}</td>
              <td nowrap="true">{{ item.yesBalance }}</td>
              <td nowrap="true">{{ item.noBalance }}</td>
            <td><v-text-field label="Option Amount" v-model="item.newBetValue"></v-text-field></td>
            <td>
                <v-select label="Yes/No" v-model="item.newBetYesNo" :items="yesNoArray">Yes/No</v-select>
            </td>
            <td>
                <v-btn dark small color="blue" @click="placeBet(item.identifier, item.newBetValue, item.newBetYesNo)"
            >Place Option</v-btn>
            </td>
            <td>
                <v-btn dark small color="blue" @click="resolveOption(item.identifier)">Resolve Option</v-btn>
            </td>
            <td>
                <v-select label="Yes/No" v-model="optionOutcome" :items="yesNoArray">Yes/No</v-select>
            </td>
            <td>
                <v-btn dark small color="blue" @click="setOptionResult(item.identifier, optionOutcome)">Set Result</v-btn>
            </td>
            <td>
                <v-btn dark small color="green" @click="receivePayment(item.identifier)">Receive Payment</v-btn>
            </td>
    </tr>
            </template>
          </v-data-table>
      </v-col>
  </v-row>
  
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
      headers: [
            {text: "Option", value: "optionCode", sortable: false},
            {text: "Description", value: "description", sortable: false}, 
            {text: "Yes Balance", value: "yesBalance", sortable: false}, 
            {text: "No Balance", value: "noBalance", sortable: false},
            {text: "Amount", value: "newBetValue", sortable: false},
            {text: "Yes/No", value: "newBetYesNo", sortable: false},
            {text: "Place Option", value: "", sortable: false},
            {text: "Resolve Option", value: "", sortable: false},
            {text: "Outcome", value: "", sortable: false},
            {text: "Set Result", value: "", sortable: false},
            {text: "Receive Payment", value: "", sortable: false},
            ],
      loadingStatus: true,
      hideDefaultFooter: false,
      footerProps: {
            'items-per-page-options': [15, 50, 100]
      },
      multiplePanels: false,
      panels: [0],
      rowCount: 100,
      snack: {
        display: false,
        duration: 4000,
        color: "info",
        text: ""
      },
      instruments: [{symbol: 'BTC', price: '', expiryBlock:''}, {symbol: 'ETH', price: '', expiryBlock:''}, {symbol: 'L2', price: '', expiryBlock:''}],
      instrumentSelected: '',
      instrumentSelectedPrice: '',
      instrumentSelectedExpiry: '',
      yesNoArray: [{text: 'Yes', value: '1'}, {text: 'No', value: '2'}],
      optionOutcome: ''
    }
  },
  methods:{
    async getBinaryOptions() {
      const result = await client.getOptions()
      this.binaryOptions = []
      for (let i=0; i<result.length; i++){
        this.binaryOptions.push(result[i])
      }
      this.rowCount = this.binaryOptions.length
      console.log(this.binaryOptions)
      if (this.binaryOptions.length > 0) 
      for (let i=0; i<this.binaryOptions.length; i++){
            console.log(this.binaryOptions[i].optionCode + " expires in " +this.binaryOptions[i].expiryBlock.toString())
      }
      this.loadingStatus = false
    },
    async placeBet(optionId, newBetValue, newBetYesNo){
      await client.placeBet(optionId, newBetValue, newBetYesNo)
    },
    async resolveOption(optionId){
      await client.resolveOption(optionId)
    },
    async receivePayment(optionId){
      await client.receivePayment(optionId)
    },
    async setOptionResult(optionId, outcome){
        if (!outcome) alert('outcome cannot be blank')
        console.log("setOptionResult " + optionId + "=" + this.optionOutcome + "," + outcome)
        await client.setOptionResult(optionId, outcome)
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
.optionInput{
    background: whitesmoke;
}
</style>
