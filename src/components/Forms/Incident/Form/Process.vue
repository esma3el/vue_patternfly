<script>
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

const FilePond = vueFilePond();

setOptions({
  server: {
    url: "http://localhost:8080/api/attachments",
  },
});
import VueMultiselect from "vue-multiselect";
import FormTabs from "./FormTabs.vue";
import WorkFlow from "../Workflow/WorkFlow.vue";
import Stepper from '../../Stepper.vue'
import gql from "graphql-tag";

 const Q2 = gql`
  query ($user: String!, $id: String!, $task_id: String!) {
    tasks(
      where: {
        id: { _eq: $task_id }
        state: { _eq: "Ready" }
        tasks_potential_users: { user_id: { _eq: $user } }
        _and: { state: { _eq: "Ready" } }
        process: { id: { _eq: $id } }
      }
    ) {
      id
    }
  }
`;
const QUERY = gql`
  query ($id: String!) {
    processes(where: { id: { _eq: $id } }) {
      variables
    }
  }
`;
const GET_ROOT_CAUSE_CATEGORY = gql`
query {
  root_cause_category {
    keycode
  }
}
`
const GET_ROOT_CAUSE_TYPE  = gql`
query($type: String!){
  root_cause_type(where: {root_cause_category: { keycode: {_eq: $type}}}) {
    keycode
  }
}
`;
const GET_ROOT_CAUSE_ITEM  = gql`
query($type: String!){
  root_cause_item(where: {root_cause_type: { keycode: {_eq: $type}}}) {
    keycode
  }
}
`;


export default {
  name: "Process",
  components: { VueMultiselect, FormTabs, WorkFlow , Stepper, FilePond},
  data() {
    return {
      open1:false,
      attachments:[],
      rootCauseCategories: [],
      rootCauseTypes: [],
      rootCauseItems: [],
      data: {
        dispatcher: "",
        dispatchers: "",
        processOperationMode: "",
        processDescription: "",
        faultSolution: {
          recoveryTime: "",
          interruptionTime: "",
          rootCauseCategory: "",
          rootCauseType: "",
          rootCauseItem: "",
          rootCauseDescription: "",
          faultReasonDescription: "",
          faultSolutionDescription: ""
        }
      },
    };
  },
  apollo: {
    incidents: {
      query: QUERY,
      variables() {
        return { id: this.$route.params.id };
      },
      update(data){
        this.data = {...data.processes[0]?.variables}
        this.data.faultSolution = {...data.processes[0]?.variables.faultSolution}                
        this.data.faultSolution.recoveryTime = this.data.faultSolution.recoveryTime.substring(0,16)
        this.getrootcausecategories()
        this.getrootcausetypes()
        this.getrootcauseitems()
      }
    },
    tasks: {
      query: Q2,
      variables() {
        return {
          user: this.$store.state.userinfo.username,
          id: this.$route.params.id,
          task_id: this.$route.params.taskid,
        };
      },
    },
  },   
  methods: {
    handleProcessFile: function (error, file) {                  
      if(!error){
      const f = JSON.parse(file.serverId)
      this.attachments.push(f)
      console.log(this.attachments)
      }
    },
    getrootcauseitems(){
      this.$apolloProvider.defaultClient.query({
        query:GET_ROOT_CAUSE_ITEM,
          variables:{type:this.data.faultSolution.rootCauseType}
      }).then(res => this.rootCauseItems = res.data.root_cause_item.map(row=> row.keycode)); 
    },
    getrootcausetypes(){
      this.$apolloProvider.defaultClient.query({
        query:GET_ROOT_CAUSE_TYPE,
          variables:{type:this.data.faultSolution.rootCauseCategory}
      }).then(res => this.rootCauseTypes = res.data.root_cause_type.map(row=> row.keycode)); 
    },
    getrootcausecategories(){
      this.$apolloProvider.defaultClient.query({        
          query:GET_ROOT_CAUSE_CATEGORY          
      }).then(res => this.rootCauseCategories = res.data.root_cause_category.map(row=> row.keycode)); 
    },
    async submitData() {
      this.data.processOperationMode = "Resolve",

      this.$store.commit('toggle_spinner')
        await fetch(
        `http://localhost:8080/api/incidents/${this.$route.params.id}/process/${this.$route.params.taskid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state._keycloak.token,
          },
          method: "POST",
          body: JSON.stringify({ data: this.data ,attachments: this.attachments}),
})
        .then(res=> {this.Notification("success","Saved Successfuly",`Ticket Submited Successfuly At ${new Date().toLocaleString()}.`)})
        .catch(err => {this.Notification("danger","Unknown Error",`Unknown error , ${new Date().toLocaleString()}.`)})        
        this.$store.commit('toggle_spinner')
    },
    async Notification(variant="",title="",msg=""){
        this.$store.commit('setNotifications',{'variant':variant,'title':title,'msg':msg})   
        if(variant != 'danger'){
        setTimeout(()=>{
          this.$store.commit('delNotifications')
        },15000)
        setTimeout(()=>{
        
        this.$router.push('/')
        },800)
        }
    } ,    
    clear_alarm(){
      this.$store.commit('delNotifications')
    },
  async submitWO() {
      this.data.processOperationMode = "Work-Order",

      this.$store.commit('toggle_spinner')
        const req = await fetch(
        `http://localhost:8080/api/incidents/${this.$route.params.id}/process/${this.$route.params.taskid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state._keycloak.token,
          },
          method: "POST",
          body: JSON.stringify({ data: this.data}),
})
        if(req.ok){
          this.Notification(
            "success",
            `status ${req.status}`,
            `${req.statusText} ${new Date().toLocaleString()}.`
          )
        }
        else{          
          this.Notification(
            "danger",
            `status:${req.status}`,
            `${req.statusText} ${new Date().toLocaleString()}.`
          );
        };
        console.log(req);
        this.$store.commit('toggle_spinner')
    },
    async Notification(variant="",title="",msg=""){
        this.$store.commit('setNotifications',{'variant':variant,'title':title,'msg':msg})   
        if(variant != 'danger'){
        setTimeout(()=>{
          this.$store.commit('delNotifications')
        },15000)
        setTimeout(()=>{
        
        this.$router.push('/')
        },800)
        }
    } ,    
    clear_alarm(){
      this.$store.commit('delNotifications')
    }
  }
};
</script>

<template>
      <div class="pf-l-grid pf-m-gutter">
        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
      <pf-card>
        <pf-card-body>
           <Stepper />     
          </pf-card-body>
      </pf-card>
    </div>
        <div
          class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-6-col-on-xl">
          <div class="phase-action">
            <pf-card>
              <pf-card-title>Process Incident</pf-card-title>
              <pf-divider />
              <pf-card-body>
                <pf-spinner v-if="$apollo.loading" size="sm" />
            <pf-form
              @submit.prevent="submitData"
              class="pf-l-grid"
              v-else
              :class="tasks ? '' : 'hide_unauthorized'"
            >
                    <div class="pf-l-grid">
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-button block variant="tertiary" @click="open1 = !open1"><i class="fa-solid fa-screwdriver-wrench"></i> Work Order Request</pf-button>
                                                        
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Service Recovery Time" field-id="recoveryTime" required>
                                <pf-text-input type="datetime-local" id="recoveryTime_input" name="recoveryTime" required
                                    v-model="data.faultSolution.recoveryTime"/>
                            </pf-form-group>
                        </div>
                                                <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">

                            <pf-form-group label="Service Interruption Time" field-id="interruptionTime" readonly>
                                <pf-text-input type="time" id="interruptionTime_input" name="interruptionTime" readonly
                                    v-model="data.faultSolution.interruptionTime"/>
                            </pf-form-group>                            
                        </div>
                        <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
            <pf-form-group label="Root Cause Category" field-id="rootCauseCategory" required>
              <div class="pf-c-form__group-control">
                <select
                  class="pf-c-form-control"
                  v-model="data.faultSolution.rootCauseCategory"
                  
                  name=""
                  id=""   
                  @click="getrootcausecategories"               
                >
                  <option value="" v-if="$apollo.loading">...loading</option>
                  <option selected :value="incidents[0].rootcausecategory" v-else="incidents[0].rootcausecategory">{{incidents[0].rootcausecategory}}</option>                                                                        
                  <option :value="item" v-else v-for="item in rootCauseCategories">{{item}}</option>                  
                </select>
              </div>
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
          >
              <pf-form-group label="Root Cause Type" field-id="rootCauseType" required>
              <div class="pf-c-form__group-control">
                <select
                  class="pf-c-form-control"
                  v-model="data.faultSolution.rootCauseType"
                  
                  name=""
                  id=""   
                  @click="getrootcausetypes"               
                >
                  <option value="" v-if="$apollo.loading">...loading</option>                                    
                  <option :value="item" v-else v-for="item in rootCauseTypes">{{item}}</option>                  
                </select>
              </div>
            </pf-form-group>
          </div>
           <div
            class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
          >
                      <pf-form-group label="Root Cause Item" field-id="rootCauseItem" required>

              <div class="pf-c-form__group-control">
                <select
                
                  class="pf-c-form-control"
                  v-model="data.faultSolution.rootCauseItem"                                    
                  name=""
                  id=""   
                  @click="getrootcauseitems"               
                >
                  <option value="" v-if="$apollo.loading">...loading</option>                                    
                  <option :value="item" v-else v-for="item in rootCauseItems">{{item}}</option>                  
                </select>
              </div>
            </pf-form-group>
          </div>
                        <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Root Cause Description" field-id="rootCauseDescription">
                                <pf-text-input id="rootCauseDescription_input" name="rootCauseDescription"
                                    v-model="data.faultSolution.rootCauseDescription"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Reason Description" field-id="faultReasonDescription">
                                <pf-textarea id="faultReasonDescription_input" name="faultReasonDescription"
                                    v-model="data.faultSolution.faultReasonDescription" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Solution Description" field-id="faultSolutionDescription">
                                <pf-textarea id="faultSolutionDescription_input" name="faultSolutionDescription"
                                    v-model="data.faultSolution.faultSolutionDescription" />
                            </pf-form-group>
                        </div>
                    <div
                  class="pf-l-grid__item pf-m-12-col pf-m-8-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Attachment"
                    required
                    field-id="simple-form-name-01"
                  >
                    <file-pond
                      name="fileupload"
                      ref="pond"
                      label-idle="Click or Drop..."
                      v-bind:allow-multiple="true"
                      accepted-file-types="image/jpeg, image/png"
                      v-on:processfile="handleProcessFile"
                    />
                  </pf-form-group>
                </div>
                    </div>
                    <pf-action-group>
                      <pf-button block type="submit" variant="primary">Submit</pf-button>
                      <pf-button block variant="tertiary">Cancel</pf-button>
                    </pf-action-group>
                </pf-form>
                <pf-modal variant="medium" v-model:open="open1" title="Work Order Request">
                              <template #description>
                            <pf-form @submit.prevent="submitWO">
                              <div class="pf-l-grid">
                                <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                                  <pf-form-group label="Dispacher" field-id="dispatcher" required>
                                    <pf-text-input id="dispatcher_input" name="dispatcher" required
                                              v-model="data.dispatcher"/>
                                      </pf-form-group>
                                  </div>
                                  <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                                    <pf-form-group label="Dispacher Group" field-id="dispatchers" required>
                                      <pf-text-input id="dispatchers_input" name="dispatchers" required
                                              v-model="data.dispatchers"/>
                                      </pf-form-group>
                                  </div>                                  
                                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                                            <pf-form-group label="Work Order Description" field-id="processDescription">
                                                <pf-textarea id="processDescription_input" name="processDescription"
                                                    v-model="data.processDescription" />
                                            </pf-form-group>
                                        </div>
                              </div>
                              <pf-action-group>
                                <pf-button type="submit" block variant="primary">
                                  Submit
                                </pf-button>
                                <pf-button block variant="tertiary" @click="open1 = !open1">
                                  Cancel
                                </pf-button>
                                  </pf-action-group>                              
                          </pf-form>
                              </template>
                            </pf-modal>
              </pf-card-body>
            </pf-card>
          </div>
        </div>
        <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-6-col-on-xl">
          <div class="side">
            <pf-card>
              <pf-card-body>
                <pf-tabs>
                  <pf-tab title="Ticket Information">
                    <br>
                    <form-tabs :ticketid="$route.params.id" />
                  </pf-tab>
                  <pf-tab title="WorkFlow Details">
                    <br>
                    <WorkFlow :ticketid="$route.params.id" />
                  </pf-tab>
                </pf-tabs>
              </pf-card-body>
            </pf-card>
          </div>
        </div>
      </div>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}
.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

</style>
