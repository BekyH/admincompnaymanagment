<template>
    <nav>
        <v-app-bar
      app
      color="primary"
      dark
    >
     <v-flex  md6 offset-2>
              
                                
            <v-btn  text v-if="this.$route.path!=='/login'"><v-icon>fas fa-home</v-icon><span>Home</span></v-btn> 
             
            
             
           
           
    
                 
            </v-flex>
           <v-flex offset-3>
               <v-btn text v-if="this.$route.path!=='/login'" @click="logout"><v-icon>fas fa-signout</v-icon><span>Log out</span></v-btn>
           </v-flex>
        </v-app-bar>
    </nav>
</template>
<style>

</style>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        logout(){
            sessionStorage.removeItem('token');
             this.$store.commit("setAuthentication", false);
            this.$router.push('/login');
        }
    }
}
</script>
