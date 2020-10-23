<template>
  <div class="content-container">
    <marquee behavior="scroll" direction="left" class="marquee" id="marquee">Gold Price Per Ounce <span :class="[metals.gold.isActive ? 'metalUp' : '']">{{ formatCurrency(metals.gold.price) }}</span> 
                                                             Silver Price Per Ounce {{ formatCurrency(metals.silver.price) }}
                                                             Platinum Price Per Ounce {{ formatCurrency(metals.platinum.price) }}
                                                             Palladium Price Per Ounce {{ formatCurrency(metals.palladium.price) }}
                                                             </marquee>
    <div class="section content-title-group">
      
    </div>
    <div class="columns">
      <div class="column is-8">
        <div class="card edit-detail">
          <header class="card-header">
            <p class="card-header-title">{{  }}</p>
          </header>
          <div class="card-content">
            <div class="content"> 
              <p class="name">Gold</p>           
              <div class="columns">
                <div class="column is-3">
                  <label class="label" for="goldGramPrice"> Price Per Gram</label>
                  <input class="input" id="goldGramPrice" v-model="metals.gold.gramPrice" />
                </div>
                <div class="column is-3">
                  <label class="label" for="goldGrams">Number of Grams</label>
                  <input class="input" id="" v-model="metals.gold.grams" />
                </div>
                <div class="column is-2">
                  <label class="label">Karat </label>
                  <div class="control">
                    <div class="select">
                      <select v-model="metals.gold.selectedKarat" @keyup.esc="clearkarat">
                        <option v-for="(karat,index) in metals.gold.karats" :key="index" :value="karat">{{karat.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <label class="label" for="goldGramValue">Value</label>
                  <label class="input" id="goldGramValue" readonly>{{ goldGramValue }}</label>
              </div>
              </div>
              <label class="label" for="goldGramValueDayTrend">1 Week Projected Gram Price</label>
              <label class="input" id="goldGramValueDayTrend" readonly>{{ goldGramValueDayTrend }}</label>
              </div>
              <br>
              <p class="name">Silver</p>           
              <div class="columns">
                <div class="column is-3">
                  <label class="label" for="silverGramPrice"> Price Per Gram</label>
                  <input class="input" id="silverGramPrice" v-model="metals.silver.gramPrice" />
                </div>
                <div class="column is-3">
                  <label class="label" for="silverGrams">Number of Grams</label>
                  <input class="input" id="silverGrams" v-model="metals.silver.grams" />
                </div>
                <div class="column is-2">
                  <label class="label">Purity</label>
                  <div class="control">
                    <label class="radio" for="fine">
                      <input type="radio" id="fine" value="fine" v-model="metals.silver.purity">
                      Fine
                    </label>
                    <label class="radio">
                      <input type="radio" id="sterling" value="sterling" v-model="metals.silver.purity">
                      Sterling
                    </label>
                  </div>
                </div>
                <div class="column is-4">
                  <label class="label" for="silverGramValue">Value</label>
                  <label class="input" id="silverGramValue" readonly>{{ silverGramValue }}</label>
              </div>
              </div>
              <p class="name">Platinum</p>           
              <div class="columns">
                <div class="column is-3">
                  <label class="label" for="platinumGramPrice"> Price Per Gram</label>
                  <input class="input" id="platinumGramPrice" v-model="metals.platinum.gramPrice" />
                </div>
                <div class="column is-3">
                  <label class="label" for="platinumGrams">Number of Grams</label>
                  <input class="input" id="platinumGrams" v-model="metals.platinum.grams" />
                </div>
                <div class="column is-6">
                  <label class="label" for="platinumGramValue">Value</label>
                  <label class="input" id="platinumGramValue" readonly>{{ platiumGramValue }}</label>
              </div>
              </div>             
              <p class="name">Palladium</p>           
              <div class="columns">
                <div class="column is-3">
                  <label class="label" for="palladiumGramPrice"> Price Per Gram</label>
                  <input class="input" id="palladiumGramPrice" v-model="metals.palladium.gramPrice" />
                </div>
                <div class="column is-3">
                  <label class="label" for="palladiumGrams">Number of Grams</label>
                  <input class="input" id="palladiumGrams" v-model="metals.palladium.grams" />
                </div>
                <div class="column is-6">
                  <label class="label" for="palladiumGramValue">Value</label>
                  <label class="input" id="palladiumGramValue" readonly>{{ palladiumGramValue }}</label>
              </div>
              </div>
            </div> 
          </div> 
        </div>
      </div>
    </div>
  
</template>

<script>
import axios from 'axios';
//import numbro from 'numbro';
var numbro = require("numbro");
import regression from 'regression';

export default {
  name: "metalCalculator",
  data() {
    return {
      formName: "Calculator",
       metals:{
         gold:{
           price: 0,
           gramPrice: 0,
           grams: 0,
           selectedKarat: {name: "24K", value:1},
           karats: [
                {name: "24K", value:1},
                {name:"22K", value:.917},
                {name:"18K", value:.75},
                {name:"14K", value:.583},
                {name:"10K", value:.417},
                {name:"8K", value:.2}
           ],
           isActive: true,
           timer: null,
           data: []
         },
         silver:{
           price: 0,
           gramPrice: 0,
           grams: 0,
           purity: 'fine',
           timer: null,
           data: {}
         },
         platinum:{
           price: 0,
           gramPrice: 0,
           grams: 0,
           timer: null,
           data: {}
         },
         palladium:{
           price: 0,
           gramPrice: 0,
           grams: 0,
           timer: null,
           data: {}
         }
       },
       message: ''
    };
  },
  computed: {
    goldGramValue() {
      let ggv = numbro.unformat(this.metals.gold.gramPrice) * numbro.unformat(this.metals.gold.grams?this.metals.gold.grams:0) * this.metals.gold.selectedKarat.value;
      return this.formatCurrency(ggv);
    },
    goldGramValueDayTrend() {
      let prediction = 0;
      if(this.metals.gold.data.length > 0){
        let dayCount = 30;
        //Take the dayCount number of items, put them in an array adding an Identifier starting at 1
        let data = [...this.metals.gold.data.slice(0, dayCount)].reverse().map((i, index) => [index + 1 , i[1]]);
        //console.log(data);
        let r = regression.linear(data);
        console.log(r);
        prediction = r.predict(dayCount + 7)[1];
        console.log(prediction);
        prediction = numbro(prediction / 31.1).formatCurrency({mantissa:2});
      }
      //console.log(prediction);
      return prediction;
    },
    silverGramValue() {
      let purityValue = 1
      if (this.metals.silver.purity == 'sterling') {
        purityValue = .925;
      }
      
      let sgv = numbro.unformat(this.metals.silver.gramPrice) * numbro.unformat(this.metals.silver.grams?this.metals.silver.grams:0) * purityValue;
      return this.formatCurrency(sgv);
    },
    platiumGramValue() {      
      let pgv = numbro.unformat(this.metals.platinum.gramPrice) * numbro.unformat(this.metals.platinum.grams?this.metals.platinum.grams:0);
      return this.formatCurrency(pgv);
    },
    palladiumGramValue() {      
      let ppgv = numbro.unformat(this.metals.palladium.gramPrice) * numbro.unformat(this.metals.palladium.grams?this.metals.palladium.grams:0);
      return this.formatCurrency(ppgv);
    },
  },

  watch: {
    'metals.gold.price'(newVal, oldVal) {
      let vm = this;
      //TODO Switch isActive flag so red appears only on price change
      //alert(`yes, computed property changed from ${newVal} to ${oldVal}`);
      if (newVal > oldVal) {
        vm._data.metals.gold.isActive = true;
      }
      else {
        vm._data.metals.gold.isActive = false;
      }
      return vm;
    },

  },

  methods: {
    cancelmetal() {
      this.message = '';
    },
    clearkarat() {
      this.metals.gold.selectedKarat = 1;
    },
    savemetal() {
      // This only updates when you click the save button
      this.message = JSON.stringify(this.metals, null, '\n ');
    },
    formatCurrency(val) {
      return numbro(val).formatCurrency({thousandSeparated: true,
                                         mantissa:2});
    },
    goldTimer() {
      if (Math.floor(Math.random() * 10) >= 4) {
        this.updateGoldValue(this.metals.gold.price + .314);
      }
      else{
        this.updateGoldValue(this.metals.gold.price - .314);
      } 
    },
    updateGoldValue(goldPrice) {
      this.metals.gold.price = goldPrice;
      this.metals.gold.gramPrice = numbro(goldPrice / 31.1).formatCurrency({mantissa:2});
      //console.log(goldPrice);

    },
    silverTimer() {
      if (Math.floor(Math.random() * 10) >= 4) {
        this.updateSilverValue(this.metals.silver.price + .01);
      }
      else{
        this.updateSilverValue(this.metals.silver.price - .01);
      } 
    },
    updateSilverValue(silverPrice) {
      this.metals.silver.price = silverPrice;
      this.metals.silver.gramPrice = numbro(silverPrice / 31.1).formatCurrency({mantissa:2});
      //console.log(silverPrice);
    },
    updatePlantinumValue(platinumPrice) {
      this.metals.platinum.price = platinumPrice;
      this.metals.platinum.gramPrice = numbro(platinumPrice / 31.1).formatCurrency({mantissa:2});
      //console.log(platinumPrice);
    },
    updatePalladiumValue(palladiumPrice) {
      this.metals.palladium.price = palladiumPrice;
      this.metals.palladium.gramPrice = numbro(palladiumPrice / 31.1).formatCurrency({mantissa:2});
      console.log(palladiumPrice);
    },    
    },

  created () {
    axios
      .get('https://www.quandl.com/api/v3/datasets/LBMA/GOLD.json?api_key=onMsLhc34xCSgUj-sj2q')
      .then(response => {
         this.metals.gold.data = response.data.dataset.data;
         this.updateGoldValue(response.data.dataset.data[0][1]);
         //if (!this.metals.gold.timer) {
           //this.metals.gold.timer = setInterval(this.goldTimer,3000)
         //}
      });

    axios
      .get('https://www.quandl.com/api/v3/datasets/LBMA/SILVER.json?api_key=onMsLhc34xCSgUj-sj2q')
      .then(response => {
        this.metals.silver.data = response.data;
        this.updateSilverValue(response.data.dataset.data[0][1]);
        //if (!this.metals.silver.timer) {
           //this.metals.silver.timer = setInterval(this.silverTimer,3000);
           
         //}
      });

      axios
      .get('https://www.quandl.com/api/v3/datasets/LPPM/PLAT?start_date=2020-03-11&end_date=2020-03-11&api_key=onMsLhc34xCSgUj-sj2q'
      ,{headers: {accept:'application/json'}})
      .then(response => {
        this.metals.platinum.data = response.data.dataset.data;
        this.updatePlantinumValue(response.data.dataset.data[0][1]);
        //console.log(this.metals.platinum.gramPrice);
      });

      axios
      .get('https://www.quandl.com/api/v3/datasets/LPPM/PALL?start_date=2020-03-11&end_date=2020-03-11&api_key=onMsLhc34xCSgUj-sj2q'
      ,{headers: {accept:'application/json'}})
      .then(response => {
        this.metals.palladium.data = response.data.dataset.data;
        this.updatePalladiumValue(response.data.dataset.data[0][1]);
        console.log(this.metals.palladium.gramPrice);
      });
      
  },


};
</script>
