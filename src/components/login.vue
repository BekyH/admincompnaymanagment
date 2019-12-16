<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 class="pt-3">
                <h3>Login</h3>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3 class="mt-3">
                <v-form v-model="valid" ref="form">
                    <h4>Login here</h4>
                    <v-text-field label="Email" v-model="user.email" prepend-icon="email" :rules="emailrules" required  v-on:keyup="keymonitor"></v-text-field>
                    <v-text-field label="Password" type="password" prepend-icon="lock" v-model="user.password" :rules="passwordrules" required v-on:keyup="keymonitor"></v-text-field>
                    <v-flex class="mt-3">
                        
                       
                <v-btn @click="login" class="mt-3 primary">Login</v-btn>
                <v-btn class="ml-3 mt-3" @click="Reset">cancel</v-btn>
                    </v-flex>
                </v-form>
                
            </v-flex>
            <v-flex xs6 md4 offset-sm-3>
                <v-alert type="error" v-if="alertError"  dismissible dark>
                login failed invalid credentials 
                </v-alert>
            </v-flex>
              
            
        </v-layout>
    </v-container>
</template>
<style>

</style>
<script>
import axios from 'axios';
const api = 'http://localhost:3000/api/accounts/login';
export default {
    
    data(){
        return {
            valid:false, 
            alert:false,
            alertError:false,
            user:{
                email:'',
                password:''
            },
            message:'',
            token:'',
            emailrules:[
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
         passwordrules:[
            (v) => !!v || 'password is required',

        ],
        
        }
    },
    methods:{
        keymonitor(event){
            if(event.key=="Enter"){
                this.login();
            }
        },
        
        login(){
           this.alertError = false;
           let credentials={
               email:this.user.email,
               password:this.user.password
           }
            if(this.$refs.form.validate()){
                 axios.post(api,credentials)
           .then((res)=>{
               
               sessionStorage.setItem('token',res.data.id);
               this.$refs.form.reset();
                this.$store.commit("setAuthentication", true);
                this.$refs.form.reset();
               this.$router.push('/home');
           }).catch((err)=>{
            
             this.message = err;
             this.alertError = true;
           })
           
             }
           },
           Reset(){
               this.$refs.form.reset();
           }
    },
    
    
}
</script>

