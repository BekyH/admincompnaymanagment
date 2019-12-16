<template>
    <v-container>
        <v-layout row wrap>
        <v-flex xs12 md6>
            <h6 class="mt-3">Companies</h6>
            
        </v-flex>
        <v-flex >
            
        </v-flex>

            <v-spacer></v-spacer>
            <v-layout row wrap>
            <v-flex offset-sm-8 xs8 md5>
                <v-btn class=" primary" @click="add">Add</v-btn>
            </v-flex>
            <v-flex class="mb-3">
                <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        
        hide-details
      ></v-text-field>
            </v-flex>
            </v-layout>
            <v-flex>
                <v-dialog
      v-model="dialog"
      width="700"
    >
      
      <v-card>
        <v-card-title
          class="primary white--text"
          primary-title
        >
          Register new Company
        </v-card-title>
        <v-btn text @click="additionalPhone"><v-icon small >fas fa-plus</v-icon><v-icon small>fas fa-phone</v-icon></v-btn>
        
        <v-btn text @click="additionalEmail"><v-icon small >fas fa-plus</v-icon><v-icon small>fas fa-envelope</v-icon></v-btn>
        <v-flex offset-1>
          <v-form ref="form">
            <div class="textfield">
      <v-text-field
      
      v-model="company.name"
      :rules="nameRules"
      label="Name"
        required
      ></v-text-field>
       
       <v-text-field
       v-model="company.phoneno"
       :rules="phonenoRules"
       label="PhoneNo"
        required
      ></v-text-field>

 
      
 
      <v-text-field
      v-if="phoneNosecond"
       v-model="company.phoneno2"
       :rules="phoneno2Rules"
       label="second PhoneNo"
        required
      ></v-text-field>
      <v-text-field
      v-if="phoneNothird"
       v-model="company.phoneno3"
       :rules="phoneno2Rules"
       label="third PhoneNo"
        required
      ></v-text-field>

      <v-text-field
      label="Email"
      :rules="emailRules"
      v-model="company.email"
      required>
        
      </v-text-field>
    
      <v-text-field
      v-if="emailsecond"
      label="second Email"
      :rules="emailRules"
      v-model="company.email2"
      required>
        
      </v-text-field>
        <v-text-field
        v-if="emailthird"
      label="third Email"
      :rules="emailRules"
      v-model="company.email3"
      required>
        
      </v-text-field>
     <v-text-field
     label="City"
     v-model="company.city"
     :rules="cityRules"
     required>
       
     </v-text-field>
     <v-text-field
     v-model="company.service"
     :rules="ServiceRules"
     label="Service"
     required></v-text-field>
        <v-text-field
     v-model="company.latitude"
     label="latitude"
     :rules="latitudeRules"
     ></v-text-field>
      <v-text-field
     v-model="company.longitude"
     label="longitude"
     :rules="longitudeRules"
     >
      </v-text-field>
            </div>
             <label>upload image
        <input type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()"/>
      </label>
          </v-form>
        </v-flex>
       

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="addCancel"
           
          >
          Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="submit"
           
           
          >
          Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
            
            </v-flex>
        
        
        </v-layout>
        <v-flex>
            <v-data-table :headers="headers" :items="companies" :search="search">
                 <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
       @click="editCompany(item)"
              @click.stop="dialog2 = true"
      >
        edit
      </v-icon>
      <v-icon
        small
       @click="deleteCompany(item)"
      >
        delete
      </v-icon>
      <!-- <v-btn
       text>View</v-btn> -->
       <v-icon class="pl-1"
       @click="show(item)"
       >list</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">Reset</v-btn>
    </template>
            </v-data-table>
              <v-dialog
      v-model="dialog3"
      width="500"
    >
      
      <v-card>
        <v-card-title
          class="primary white--text"
          primary-title
        >
          Details
        </v-card-title>
        <v-layout v-if="img">
            <v-flex xs6 md5 class="ml3">
        <v-card-text>
           Name: {{comp.name}}
        
        </v-card-text>
        <v-card-text>
           City: {{comp.city}}
        
        </v-card-text>
        <v-card-text>
           Service: {{comp.service}}
        
        </v-card-text>
        <v-card-text>
             Phoneno: {{comp.phoneno}}
        
        </v-card-text>
        <v-card-text>
           Email: {{comp.email}}
        
        </v-card-text>
       
        <v-card-text v-if="thirdemaildisplay">
          third Email: {{comp.email3}}
        </v-card-text>
         
        
            </v-flex>
            <v-flex xs6 m6 class="mt-2">
               <div v-if="img">
                        <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      v-if="progress"
    ></v-progress-circular>
                <v-img v-if="!progress" :src="'http://localhost:3000/api/containers/company/download/' + comp.image"/>
                    </div>
                
            <v-card-text v-if="secondphonedisplay">
            second Phoneno: {{comp.phoneno2}}
        
            </v-card-text>
            <v-card-text v-if="thirdphonedisplay">
            third Phoneno: {{comp.phoneno3}}
             <v-card-text v-if="secondemaildisplay">
          second Email: {{comp.email2}}
        
        </v-card-text>
        
            </v-card-text>
                <!-- <v-flex >
                <v-card-text style="margin-top:100px;"  v-if="noimg" class="text-center">No image preview for this company</v-card-text>
                </v-flex> -->
            </v-flex>
        </v-layout>
        <v-layout v-if="noimg" row wrap>
            <v-flex xs6 md5 class="ml-3">
                <v-card-text>
           Name: {{comp.name}}
        
        </v-card-text>
        <v-card-text>
           City: {{comp.city}}
        
        </v-card-text>
        <v-card-text>
           Service: {{comp.service}}
        
        </v-card-text>
               <v-card-text>
           Email: {{comp.email}}
        
        </v-card-text>
        <v-card-text v-if="secondemaildisplay">
          second Email: {{comp.email2}}
        
        </v-card-text>
            </v-flex>
            <v-flex xs6 md5>
         
        <v-card-text v-if="thirdemaildisplay">
          third Email: {{comp.email3}}
        </v-card-text>
         <v-card-text>
           Phoneno: {{comp.phoneno}}
        
        </v-card-text>
        <v-card-text v-if="secondphonedisplay">
          second Phoneno: {{comp.phoneno2}}
        
        </v-card-text>
        <v-card-text v-if="thirdphonedisplay">
           third Phoneno: {{comp.phoneno3}}
        
        </v-card-text>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
         
          <v-btn
            color="primary"
            @click="cancelClicked"
           
          >
          Cancel
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
           <v-dialog
      v-model="dialog2"
      width="700"
    >
      
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Edit Company
        </v-card-title>
        <v-flex offset-1>
          <v-form >
            <div class="textfield">
      <v-text-field
      
      v-model="comp.name" 
      :rules="nameRules"
        required
      ></v-text-field>
       <v-text-field
       v-model="comp.phoneno"
       :rules="phonenoRules"
        required
      ></v-text-field>
      <v-text-field
      v-model="comp.email"
      :rules="emailRules"
      required>
        
      </v-text-field>
     <v-text-field
     v-model="comp.city"
     :rules="cityRules"
     required>
       
     </v-text-field>
     <v-text-field
       v-model="comp.service"
       :rules="ServiceRules"
        required
      ></v-text-field>
      <v-text-field
      v-model="comp.latitude"
      :rules="latitudeRules"
      required>
        
      </v-text-field>
     <v-text-field
     v-model="comp.longitude"
     :rules="longitudeRules"
     required>
       
     </v-text-field>
            </div>
            
          </v-form>
        </v-flex>
       

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="dialog2 = false"
           
          >
          Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="editedCompany(comp)"
           
           
          >
          Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-flex>

        <v-flex xs6 md4 offset-sm-3>
                <v-alert type="success" v-if="successAddAlert"  dismissible dark>
                successfuly added
                </v-alert>
                <v-alert type="success" v-if="successUpdateAlert"  dismissible dark>
                successfuly updated
                </v-alert>
                <v-alert type="success" v-if="successDeleteAlert"  dismissible dark>
                successfuly deleted
                </v-alert>
                <v-alert type="error" v-if="errorAddAlert"  dismissible dark>
                Error!not added
                </v-alert>
                <v-alert type="error" v-if="errorUpdateAlert"  dismissible dark>
                Error!not updated
                </v-alert>
                <v-alert type="error" v-if="errorDeleteAlert"  dismissible dark>
                Error!not deleted
                </v-alert>
            </v-flex>
    </v-container>
</template>

<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}
td,th{
    border: 1px solid rgba(0, 0, 0, .05);
}
.textfield{
    width:82%;
}
</style>
<script>
const imageApi = 'http://localhost:3000/api/containers/company/upload';

import axios from 'axios';
const api = 'http://localhost:3000/api/companies';
export default {
    data(){
        return {
            successAddAlert:false,
            successUpdateAlert:false,
            successDeleteAlert:false,
            errorAddAlert:false,
            errorUpdateAlert:false,
            errorDeleteAlert:false,
            dialog2:false,
            dialog3:false,
             file:'',
             progress:false,
             phoneNosecond:false,
             phoneNothird:false,
             emailsecond:false,
             emailthird:false,
             img:false,
             phoneCounter:0,
             emailCounter:0,
             secondphonedisplay:false,
             thirdphonedisplay:false,
             secondemaildisplay:false,
             thirdemaildisplay:false,
             noimg:false,
            search:'',
            nameRules:[
                 (v) => !!v || 'Name is required!',
                 (v)=> /^[a-zA-Z0-9 ]+$/.test(v) || 'only letters and numbers allowed!' 
            ],
            phonenoRules:[
                (v) => !!v || 'Phoneno is required',
                (v) => /^[0-9]+$/.test(v) || 'only numbers are allowed!'
            ],
             phoneno2Rules:[
               
                (v) => /^[0-9]+$/.test(v) || 'only numbers are allowed!'
            ],
            

            emailRules:[
                (v) => !!v || 'Email is required',
                (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'E-mail must be valid!'
            ],
            ServiceRules:[
                (v) => !!v || 'Service is required',
                (v)=> /^[a-zA-Z ]+$/.test(v) || ' service is not valid!only letters are allowed!' 
            ],
            cityRules:[
                (v) => !!v || 'City is required!',
                (v)=> /^[a-zA-Z ]+$/.test(v) || ' city is not valid!only letters are allowed!'
            ],
            latitudeRules:[
                //  (v) => !!v || ' latitude is required',
                (v)=> /^[0-9.]+$/.test(v) || ' latitude is not valid! floating numbers are allowed!'
            ],
            longitudeRules:[
                // (v) => !!v || ' longitude is required',
                (v)=> /^[0-9.]+$/.test(v) || 'longitude is not valid!only floating numbers are allowed!'
            ],
            dialog:false,
            headers:[
                {
                    text:'name',value:'name'
                },
                {
                    text:'city',value:'city'
                },
                {
                    text:'service',value:'service'
                },
                { text: 'Actions', value: 'action', sortable: false },
               
            ],
            companies:[],
            company:{
                name:'',
                service:'',
                city:'',
                image:'',
                phoneno:'',
                email:'',
                latitude:0,
                longitude:0,
                phoneno2:'',
                phoneno3:'',
                email2:'',
                email3:''
            },
            comp:{
               
                 name:'',
                service:'',
                city:'',
                image:'',
                phoneno:'',
                email:'',
                latitude:'',
                longitude:'',
                phoneno2:'',
                phoneno3:'',
                email2:'',
                email3:''

            },
            token: sessionStorage.getItem("token"),
        }
    },
    methods:{
        add(){
            this.dialog = true;
        },
        additionalPhone(){
            this.phoneNosecond = true;
            this.phoneCounter++;
            if(this.phoneCounter===2){
                this.phoneNothird = true;
            }
        },
        additionalEmail(){
            this.emailsecond = true;
            this.emailCounter++;
            if(this.emailCounter===2){
                this.emailthird = true;
            }
            
        },
        addCancel(){
            this.dialog = false;
            this.phoneNosecond = false;
            this.phoneNothird = false;
            this.emailsecond = false;
            this.emailthird = false;
             this.$refs.form.reset();
             this.phoneCounter = 0;
             this.emailCounter = 0;
        },
      
        submit(){
            if(this.$refs.form.validate()){
                this.company.image = this.file.name;
                axios.post(api,this.company,{
                    headers:{
                        'Content-Type':'application/json',
                        Authorization:this.token
                    }
                }).then(()=>{
                   
                    this.successAddAlert = true;
                this.$refs.form.reset();
                this.dialog = false;
                this.phoneNosecond = false;
                this.phoneNothird = false;
                this.emailsecond = false;
                this.emailthird = false;
                this.phoneCounter = 0;
                this.emailCounter = 0;
                this.getCompany();
                }).catch(()=>{
                    this.errorAddAlert = true;
                })

                 
      //Add the form data we need to submit
      if(this.file.length!==0){
          let formData = new FormData();

      
      formData.append("file", this.file);
      axios
        .post(imageApi, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.token
          }
        })
        .then(()=> {
     
        })
        .catch(()=> {
           
        });
      }    
            }
        },
        getCompany(){
            axios.get(api)
            .then((res)=>{
                this.companies = res.data;
            }).catch(()=>{

            })
        },
        editCompany(item){
            axios.get(api + '/' + item.id)
            .then((res)=>{
                this.comp = res.data;
            }).catch(()=>{

            })
        },
        editedCompany(comp){
            this.comp.image = this.file.name;
            axios.put(api + '/',comp,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:this.token
                }
            })
            .then(()=>{
                this.getCompany();
                this.dialog2 = false;
                this.successUpdateAlert = true;
            }).catch(()=>{
                this.errorUpdateAlert = true;
            })
            
        },
        deleteCompany(item){
            axios.delete(api + '/' + item.id,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:this.token
                }
            })
            .then(()=>{
                this.getCompany();
                this.successDeleteAlert = true;
            }).catch(()=>{

            })
        },
        show(item){
            axios.get(api + '/' + item.id)
            .then((res)=>{
                this.comp = res.data;
                if(this.comp.phoneno2!==''){
                    this.secondphonedisplay = true;
                }
                if(this.comp.phoneno3!==''){
                    this.thirdphonedisplay = true;
                }
                if(this.comp.email2!==''){
                    this.secondemaildisplay = true;
                }
                if(this.comp.email3!==''){
                    this.thirdemaildisplay = true;
                }
                if(this.comp.image!==''){
                    this.img = true;
                    this.progress = true;
                }
                else{
                    this.noimg = true;
                }
                this.dialog3 = true;
                
                this.showProgress();

            })
        },
        showProgress(){
            setTimeout(() => {
                  this.progress = false
                 
                },3000)
        },
        cancelClicked(){
            this.dialog3 = false;
            this.img = false;
            this.noimg = false;
            this.secondphonedisplay = false;
            this.secondemaildisplay = false;
            this.thirdphonedisplay = false;
            this.thirdemaildisplay = false;
         
        },
         handleFileUpload(){
            this.file = this.$refs.file.files[0];

      },

        },
    
    
    mounted(){
       this.getCompany();
    }
}
</script>
