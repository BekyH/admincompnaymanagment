<template>
  <v-app>
    <v-content>
     <compheader/>
     <router-view/>
    </v-content>
    <compfooter/>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
