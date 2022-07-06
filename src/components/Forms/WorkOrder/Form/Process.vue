<script>
import FormTabs from "./FormTabs.vue";
import WorkFlow from "../Workflow/WorkFlow.vue";
import gql from "graphql-tag";

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
  components: { FormTabs, WorkFlow },
  data() {
    return {
      rootCauseCategories: [],
      rootCauseTypes: [],
      rootCauseItems: [],
      data: {
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
  methods: {
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
      console.log(JSON.stringify({ data: this.data }));
      const req = fetch(
        `http://localhost:8080/api/workOrders/${this.$route.params.id}/process/${this.$route.params.taskid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
          method: "POST",
          body: JSON.stringify({ data: this.data }),
        }
      )
        .then(res=> {this.Notification("success","Saved Successfuly",`Ticket Submited Successfuly At ${new Date().toLocaleString()}.`)})
        .catch(err => {this.Notification("danger","Unknown Error",`Unknown error , ${new Date().toLocaleString()}.`)})        
    },
    async Notification(variant="",title="",msg=""){
        this.$store.commit('setNotifications',{'variant':variant,'title':title,'msg':msg})   
        if(variant != 'danger'){
        setTimeout(()=>{
          this.$store.commit('delNotifications')
        },5000)
        setTimeout(()=>{
        // this.$router.push({name:'Home'})
        window.location.href = '/';
        },500)
        }
    } ,    
    clear_alarm(){
      this.$store.commit('delNotifications')
    }
  },
};
</script>

<template>
      <div class="pf-l-grid pf-m-gutter">
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-5-col-on-xl">
          <div class="phase-action">
            <pf-card>
              <pf-card-title>Process Work Order</pf-card-title>
              <pf-divider />
              <pf-card-body>
                <pf-form @submit.prevent="submitData">
                    <div class="pf-l-grid">
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Service Recovery Time" field-id="recoveryTime" required>
                                <pf-text-input type="datetime-local" id="recoveryTime_input" name="recoveryTime" required
                                    v-model="data.faultSolution.recoveryTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Service Interruption Time" field-id="interruptionTime" readonly>
                                <pf-text-input type="number" id="interruptionTime_input" name="interruptionTime" readonly
                                    v-model="data.faultSolution.interruptionTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
            <pf-form-group label="Root Cause Category" field-id="rootCauseCategory" required>
              <div class="pf-c-form__group-control">
                <select
                  class="pf-c-form-control"
                  v-model="data.faultSolution.rootCauseCategory"
                  required
                  name=""
                  id=""   
                  @click="getrootcausecategories"               
                >
                  <option value="" v-if="$apollo.loading">...loading</option>                                    
                  <option :value="item" v-else v-for="item in rootCauseCategories">{{item}}</option>                  
                </select>
              </div>
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
          >
              <pf-form-group label="Root Cause Category" field-id="rootCauseCategory" required>
              <div class="pf-c-form__group-control">
                <select
                  class="pf-c-form-control"
                  v-model="data.faultSolution.rootCauseType"
                  required
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
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
          >
                      <pf-form-group label="Root Cause Category" field-id="rootCauseCategory" required>

              <div class="pf-c-form__group-control">
                <select
                required
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
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Root Cause Description" field-id="rootCauseDescription">
                                <pf-text-input id="rootCauseDescription_input" name="rootCauseDescription"
                                    v-model="data.faultSolution.rootCauseDescription"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Reason Description" field-id="faultReasonDescription">
                                <pf-textarea id="faultReasonDescription_input" name="faultReasonDescription"
                                    v-model="data.faultSolution.faultReasonDescription" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Solution Description" field-id="faultSolutionDescription">
                                <pf-textarea id="faultSolutionDescription_input" name="faultSolutionDescription"
                                    v-model="data.faultSolution.faultSolutionDescription" />
                            </pf-form-group>
                        </div>
                    </div>
                    <pf-action-group>
                      <pf-button type="submit" variant="primary">Submit</pf-button>
                      <pf-button variant="link">Cancel</pf-button>
                    </pf-action-group>
                </pf-form>
              </pf-card-body>
            </pf-card>
          </div>
        </div>
        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-7-col-on-xl">
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
