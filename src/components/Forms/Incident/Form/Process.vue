<script>
import FormTabs from "./FormTabs.vue";
import WorkFlow from "../Workflow/WorkFlow.vue";
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
    incidents(where: { id: { _eq: $id } }) {
      processdescription
      recoverytime
      interruptiontime
      rootcausecategory
      rootcausetype
      rootcauseitem
      rootcausedescription
      faultreasondescription
      faultsolutiondescription
      firstoccurtime
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
  apollo: {
    incidents: {
      query: QUERY,
      variables() {
        return { id: this.$route.params.id };
      },
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
  computed: {
    interrupted() {
      return this.incidents[0].recoverytime
    }
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
      this.data.faultSolution.recoveryTime = this.incidents[0].recoverytime,
      this.data.faultSolution.interruptionTime = this.incidents[0].interruptiontime,
      this.data.faultSolution.rootCauseCategory = 'TEST_CATEGORY', //this.incidents[0].rootcausecategory,
      this.data.faultSolution.rootCauseType = 'TEST_TYPE', //this.incidents[0].rootcausetype,
      this.data.faultSolution.rootCauseItem = 'TEST_ITEM', //this.incidents[0].rootcauseitem,
      this.data.faultSolution.rootCauseDescription = this.incidents[0].rootcausedescription,
      this.data.faultSolution.faultReasonDescription = this.incidents[0].faultreasondescription,
      this.data.faultSolution.faultSolutionDescription = this.incidents[0].faultsolutiondescription,

      console.log(JSON.stringify({ data: this.data }));
      const req = fetch(
        `http://localhost:8080/api/incidents/${this.$route.params.id}/process/${this.$route.params.taskid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state._keycloak.token,
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
              <pf-card-title>Process Incident</pf-card-title>
              <pf-divider />
              <pf-card-body>
                <pre v-if="$apollo.loading">..loading</pre>
            <pf-form
              @submit.prevent="submitData"
              class="pf-l-grid"
              v-else
              :class="tasks ? '' : 'hide_unauthorized'"
            >
                    <div class="pf-l-grid">
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Service Recovery Time" field-id="recoveryTime" required>
                                <pf-text-input type="datetime-local" id="recoveryTime_input" name="recoveryTime" required
                                    v-model="incidents[0].recoverytime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Service Interruption Time" field-id="interruptionTime" readonly>
                                <pf-text-input type="time" id="interruptionTime_input" name="interruptionTime" readonly
                                    v-model="interrupted"/>
                            </pf-form-group>                            
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
            <pf-form-group label="Root Cause Category" field-id="rootCauseCategory" required>
              <div class="pf-c-form__group-control">
                <select
                  class="pf-c-form-control"
                  v-model="incidents[0].rootcausecategory"
                  
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
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
          >
              <pf-form-group label="Root Cause Category" field-id="rootCauseCategory" required>
              <div class="pf-c-form__group-control">
                <select
                  class="pf-c-form-control"
                  v-model="incidents[0].rootcausetype"
                  
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
                
                  class="pf-c-form-control"
                  v-model="incidents[0].rootcauseitem"                                    
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
                                    v-model="incidents[0].rootcausedescription"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Reason Description" field-id="faultReasonDescription">
                                <pf-textarea id="faultReasonDescription_input" name="faultReasonDescription"
                                    v-model="incidents[0].faultreasondescription" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Solution Description" field-id="faultSolutionDescription">
                                <pf-textarea id="faultSolutionDescription_input" name="faultSolutionDescription"
                                    v-model="incidents[0].faultsolutiondescription" />
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
