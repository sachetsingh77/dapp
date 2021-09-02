<template>
<v-app>
  <v-main fluid>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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
    home: function () {
      if (this.$route.name === 'home') return
      this.$router.push({name: 'home'})
    },
    wallet: function(){
      if (this.$route.name === 'wallet') return
      this.$router.push({name: 'wallet'})
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
