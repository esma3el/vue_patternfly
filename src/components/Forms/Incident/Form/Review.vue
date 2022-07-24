<script>
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "../../../../styles/vue-multiselect.css";
import Subprocess from './Subprocess.vue'
import Attachemnts from "../../Attachemnts.vue";

const FilePond = vueFilePond();

setOptions({
  server: {
    url: "http://localhost:8080/api/attachments",
  },
});
import FormTabs from "./FormTabs.vue";
import WorkFlow from "../Workflow/WorkFlow.vue";
import gql from "graphql-tag";
import VueMultiselect from "vue-multiselect";
import Stepper from '../../Stepper.vue'


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
const SEARCH_QUERY = gql`
query ($search: String!) {
  site(where: {keycode: {_iregex: $search}}, limit: 10) {
    keycode
  }
}
`;
const GET_DOMAINS = gql`
 query {
  domain {
    keycode
  }
}
`;
const GET_FAULT_LEVELS = gql`
 query {
  fault_level {
    keycode
  }
}
`;
const GET_NETWORK_TYPES = gql`
 query {
  network_type {
    keycode
  }
}
`;
  
export default {
  name: "Review",
  components: { FormTabs, WorkFlow, VueMultiselect , Stepper, FilePond,Subprocess,Attachemnts},
  data() {
    return {
      attachments:[],
        domains: [],
      faultlevels: [],
        networkTypes: [],
        useroptions:[],
        data: {
        createDescription: "",
        processor: "",
        processors: "",
        information: {
          title: "",
          description: "",
          probableCause: "",
          solution: "",
          source: "",
          initialDiagnosis: ""
        },
        faultAlarm: {
          faultLevel: "",
          domain: "",
          networkType: "",
          emsId: "",
          alarmId: "",
          alarmName: "",
          alarmType: "",
          faultNumber: "",
          faultSummary: "",
          firstOccurTime: "",
          lastOccurTime: "",
          siteDown: "",
          resultFlag: "",
          nodeId: "",
          site: {
            siteId: "",
            clusterId: "",
            zoneId: "",
            contractorId: ""
          },
          deviceId: ""
        }
      },
    };
  },
  apollo: {
    incidents: {
      query: QUERY,
     fetchPolicy: "cache-and-network",
      variables() {
        return { id: this.$route.params.id };
      },
      update(data){
        this.getdomains()
        this.getfaultlevels()
        this.getnetworktypes()
        this.data = {...data.processes[0]?.variables}
        this.data.faultAlarm = {...data.processes[0]?.variables.faultAlarm}                
        this.data.faultAlarm.site = {...data.processes[0]?.variables.faultAlarm.site}                
        this.data.information = {...data.processes[0]?.variables.information}                
        this.data.faultAlarm.firstOccurTime = this.data.faultAlarm.firstOccurTime.substring(0,16)
        this.data.faultAlarm.lastOccurTime = this.data.faultAlarm.lastOccurTime.substring(0,16)
      }
    },
    tasks: {
      query: Q2,
     fetchPolicy: "cache-and-network",
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
    searchfunc(query){
      this.$apolloProvider.defaultClient.query({
            query:SEARCH_QUERY,
            variables:{search:query}
        }).then(res=>this.useroptions = res.data.site.map(row=>row.keycode))
        },
    getdomains(){
      this.$apolloProvider.defaultClient.query({
        query:GET_DOMAINS
      }).then(res => this.domains = res.data.domain.map(res=> res.keycode)); 
    },
    getfaultlevels(){
      this.$apolloProvider.defaultClient.query({
        query:GET_FAULT_LEVELS
      }).then(res => this.faultlevels = res.data.fault_level.map(res=> res.keycode)); 
    },
    getnetworktypes(){
      this.$apolloProvider.defaultClient.query({
        query:GET_NETWORK_TYPES
      }).then(res => this.networkTypes = res.data.network_type.map(res=> res.keycode)); 
    },
    async submitData() {
      this.$store.commit('toggle_spinner');
        const req = await fetch(
        `http://localhost:8080/api/incidents/${this.$route.params.id}/review/${this.$route.params.taskid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state._keycloak.token,
          },
          method: "POST",
          body: JSON.stringify({ data: this.data ,attachments: this.attachments})
})
        if(req.ok){
          this.Notification(
            "success",
            `status ${req.status}`,
            `Saved Successfuly ${new Date().toLocaleString()}.`
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
        },6000)
        setTimeout(()=>{
        
        this.$router.push('/')
        },800)
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
        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
      <pf-card>
        <pf-card-body>
           <Stepper />     
          </pf-card-body>
      </pf-card>
    </div>
        <div
          class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-6-col-on-xl"
        >
          <div class="phase-action">
            <pf-card>
              <pf-card-title>Review Incident</pf-card-title>
              <pf-divider />
              <pf-card-body>
                <pf-spinner v-if="$apollo.loading" size="lg" />
            <pf-form
              @submit.prevent="submitData"
              class="pf-l-grid"
              v-else
              :class="tasks ? '' : 'hide_unauthorized'"
            >
                    <div class="pf-l-grid">
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Title" field-id="title" required>
                                <pf-text-input id="title_input" name="title" required
                                    v-model="data.information.title"/>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="createDescription">
                                <pf-textarea id="createDescription_input" name="createDescription"
                                    v-model="data.information.description" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Probable Cause" field-id="probableCause">
                                <pf-textarea id="probableCause_input" name="probableCause"
                                    v-model="data.information.probableCause" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Initial Diagnosis?" field-id="initialDiagnosis" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.information.initialDiagnosis" >
                                        <option value="Yes" >Yes</option>
                                        <option value="No" >No</option>                                    
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Site ID" field-id="siteId" required>
                                <VueMultiselect v-model="data.faultAlarm.site.siteId"
                                  :options="useroptions"
                                  id="site"
                                  :searchable="true"                
                                  @search-change="searchfunc">
                              </VueMultiselect>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="EMS ID" field-id="emsId" required>
                                <pf-text-input id="emsId_input" name="emsId" required
                                    v-model="data.faultAlarm.emsId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Alarm ID" field-id="alarmId">
                                <pf-text-input id="alarmId_input" name="alarmId"
                                    v-model="data.faultAlarm.alarmId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Alarm Name" field-id="alarmName" required>
                                <pf-text-input id="alarmName_input" name="alarmName" required
                                    v-model="data.faultAlarm.alarmName"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Alarm Type" field-id="alarmType" required>
                                <pf-text-input id="alarmType_input" name="alarmType" required
                                    v-model="data.faultAlarm.alarmType"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="First Occur Time" field-id="firstOccurTime" required>
                                <pf-text-input type="datetime-local" id="firstOccurTime_input" name="firstOccurTime" required
                                    v-model="data.faultAlarm.firstOccurTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Last Occur Time" field-id="firstOccurTime">
                                <pf-text-input type="datetime-local" id="firstOccurTime_input" name="firstOccurTime"
                                    v-model="data.faultAlarm.lastOccurTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Fault Level" field-id="faultLevel" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.faultAlarm.faultLevel"                                     
                                        @click="getfaultlevels" >
                                        <option value="" v-if="$apollo.loading">...loading</option>                                    
                                        <option :value="item" v-else v-for="item in faultlevels">{{item}}</option>                  
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Domain" field-id="domain" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control" required
                                        v-model="data.faultAlarm.domain"                                     
                                        @click="getdomains" >
                                        <pf-spinner v-if="$apollo.loading" size="lg" />                                    
                                        <option :value="item" v-else v-for="item in domains">{{item}}</option>                  
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Network Type" field-id="networkType">
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.faultAlarm.networkType"                                     
                                        @click="getnetworktypes" >
                                        <pf-spinner v-if="$apollo.loading" size="lg" />                                    
                                        <option :value="item" v-else v-for="item in networkTypes">{{item}}</option>                  
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Device ID" field-id="deviceId">
                                <pf-text-input id="deviceId_input" name="deviceId"
                                    v-model="data.faultAlarm.deviceId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Site Down?" field-id="domain" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.faultAlarm.siteDown" >
                                        <option value="Yes" >Yes</option>
                                        <option value="No" >No</option>                                    
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Fault NO." field-id="faultNumber">
                                <pf-text-input id="faultNumber_input" name="faultNumber"
                                    v-model="data.faultAlarm.faultNumber"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Summary" field-id="faultSummary">
                                <pf-textarea id="faultSummary_input" name="faultSummary"
                                    v-model="data.faultAlarm.faultSummary" />
                            </pf-form-group>
                        </div>              
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Assign to User" field-id="processor" required>
                                <pf-text-input id="processor_input" name="processor" required
                                    v-model="data.processor"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Assign to Group" field-id="processors" required>
                                <pf-text-input id="processors_input" name="processors" required
                                    v-model="data.processors"/>
                            </pf-form-group>
                        </div>
                    <div
                  class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
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
              </pf-card-body>
            </pf-card>
          </div>
        </div>
        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-6-col-on-xl">
          <div class="side">
            <pf-card>
              <pf-card-body>
                <pf-tabs>
                  <pf-tab title="Ticket Information">
                    <form-tabs :ticketid="$route.params.id" />
                  </pf-tab>
                  <pf-tab title="WorkFlow Details">
                    <WorkFlow :ticketid="$route.params.id" />
                  </pf-tab>
                  <pf-tab title="Attachments">
                    <Attachemnts />
                  </pf-tab>
                  <pf-tab title="Subprocess">
                    <Subprocess />
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
