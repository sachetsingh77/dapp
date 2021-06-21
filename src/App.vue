<template>
<v-app>
  <v-app-bar height="80" app>
    <v-app-bar-nav-icon >
      <v-img class="ml-8 mt-2 mr-2"  @click="goHome">
                <svg data-v-60526432="" viewBox="0 0 192 192" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"
                     class="logo-svg"><title data-v-60526432="">Binary Options</title>
                  <g data-v-60526432="" id="svg_1" class="logo-g">
                    <path data-v-60526432=""
                          d="m86.51709,173.03467a86.51733,86.51733 0 1 1 86.51709,-86.51713a86.61523,86.61523 0 0 1 -86.51709,86.51713zm0,-170.03467a83.51733,83.51733 0 1 0 83.51709,83.51754a83.61205,83.61205 0 0 0 -83.51709,-83.51754z"
                          id="svg_2" class="circle"></path>
                    <polygon data-v-60526432="" points="75.482 47.703 23.315 138.059 127.649 138.059 75.482 47.703" id="svg_3" class="lo-tri"></polygon>
                    <polygon data-v-60526432="" points="97.552 125.332 149.719 34.976 45.385 34.976 97.552 125.332" id="svg_5" class="hi-tri"></polygon>
                    <polygon data-v-60526432="" points="97.552 125.332 108.927 105.63 75.482 47.703 64.107 67.404 97.552 125.332" id="svg_7" class="overlap"></polygon>
                  </g>
                </svg>
              </v-img>
    </v-app-bar-nav-icon>
    <v-toolbar-title class="ml-4">Binary Options</v-toolbar-title>
  </v-app-bar>
  <v-main fluid>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
  </v-main>
  </v-app>
</template>

<script>
const data = {
  drawer: true, 
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        permanent: true,
        miniVariant: false,
        expandOnHover: false,
        background: false,
        appSelected:''
}
export default {
  name: "App",
  components: {},
  data: function(){
    return data
  },
  mounted: function(){
    this.$vuetify.theme.dark = false
  },
  methods:{
    goHome: function () {
      if (this.$route.name === 'home') return
      this.$router.push({name: 'home'})
    }
  }
};
</script>
<style lang="scss">
.fade-enter-active{
        transition: opacity 2.5s;
    }
    .fade-leave-active {
        opacity: 1;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
.theme--dark.v-application{
  background-color: #12121e;
  background: #12121e
}
.theme--dark.v-data-table  { 
  background-color: #1A1B33; 
}
.theme--dark.v-card { 
  background-color: #1A1B33; 
}
.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #12121e;
}
  .toolbar-title{
    color: black
  }
</style>
