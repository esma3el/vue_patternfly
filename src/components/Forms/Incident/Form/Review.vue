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
    incidents(where: { id: { _eq: $id } }) {
    alarmid
    alarmname
    alarmtype
    creator
    creators
    deviceid
    domain
    emsid
    faultlevel
    faultnumber
    firstoccurtime
    networktype
    siteid
    title
    initialdiagnosis
    description
    probablecause
    lastoccurtime
    sitedown
    faultsummary
    processor
    processors
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
    getnetworktypes(){
      this.$apolloProvider.defaultClient.query({
        query:GET_NETWORK_TYPES
      }).then(res => this.networkTypes = res.data.network_type.map(res=> res.keycode)); 
    },
    async submitData() {
      this.$store.commit('toggle_spinner');
      this.data.processor = this.incidents[0].processor;
      this.data.processors = this.incidents[0].processors;
      this.data.information.title = this.incidents[0].title;
      this.data.information.description = this.incidents[0].description;
      this.data.information.probableCause = this.incidents[0].probablecause;
      this.data.information.solution = this.incidents[0].solution;
      this.data.information.source = this.incidents[0].source;
      this.data.information.initialDiagnosis = this.incidents[0].initialdiagnosis;
      this.data.faultAlarm.faultLevel = this.incidents[0].faultlevel;
      this.data.faultAlarm.domain = this.incidents[0].domain;
      this.data.faultAlarm.networkType = this.incidents[0].networktypes;
      this.data.faultAlarm.emsId = this.incidents[0].emsid;
      this.data.faultAlarm.alarmId = this.incidents[0].alarmid;
      this.data.faultAlarm.alarmName = this.incidents[0].alarmname;
      this.data.faultAlarm.alarmType = this.incidents[0].alarmtype;
      this.data.faultAlarm.faultNumber = this.incidents[0].faultnumber;
      this.data.faultAlarm.faultSummary = this.incidents[0].faultsummary;
      this.data.faultAlarm.firstOccurTime = this.incidents[0].firstoccurtime;
      this.data.faultAlarm.lastOccurTime = this.incidents[0].lastoccurtime;
      this.data.faultAlarm.siteDown = this.incidents[0].sitedown;
      this.data.faultAlarm.resultFlag = this.incidents[0].resultflag;
      this.data.faultAlarm.nodeId = this.incidents[0].nodeid;
      this.data.faultAlarm.site.siteId = this.incidents[0].siteid;
      this.data.faultAlarm.site.clusterId = this.incidents[0].clusterid;
      this.data.faultAlarm.site.zoneId = this.incidents[0].zoneid;
      this.data.faultAlarm.site.contractorId = this.incidents[0].contractorid;
      this.data.faultAlarm.deviceId = this.incidents[0].deviceid
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
        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-12-col-on-xl">
      <pf-card>
        <pf-card-body>
           <Stepper />     
          </pf-card-body>
      </pf-card>
    </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
        >
          <div class="phase-action">
            <pf-card>
              <pf-card-title>Review Incident</pf-card-title>
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
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Title" field-id="title" required>
                                <pf-text-input id="title_input" name="title" required
                                    v-model="this.incidents[0].title"/>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Description" field-id="createDescription">
                                <pf-textarea id="createDescription_input" name="createDescription"
                                    v-model="this.incidents[0].description" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Probable Cause" field-id="probableCause">
                                <pf-textarea id="probableCause_input" name="probableCause"
                                    v-model="this.incidents[0].probablecause" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Initial Diagnosis?" field-id="initialDiagnosis" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="this.incidents[0].initialdiagnosis" >
                                        <option value="Yes" >Yes</option>
                                        <option value="No" >No</option>                                    
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Site ID" field-id="siteId" required>
                                <VueMultiselect v-model="this.incidents[0].siteid"
                                  :options="useroptions"
                                  id="site"
                                  :searchable="true"                
                                  @search-change="searchfunc">
                              </VueMultiselect>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="EMS ID" field-id="emsId" required>
                                <pf-text-input id="emsId_input" name="emsId" required
                                    v-model="this.incidents[0].emsid"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Alarm ID" field-id="alarmId">
                                <pf-text-input id="alarmId_input" name="alarmId"
                                    v-model="this.incidents[0].alarmid"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Alarm Name" field-id="alarmName" required>
                                <pf-text-input id="alarmName_input" name="alarmName" required
                                    v-model="this.incidents[0].alarmname"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Alarm Type" field-id="alarmType" required>
                                <pf-text-input id="alarmType_input" name="alarmType" required
                                    v-model="this.incidents[0].alarmtype"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="First Occur Time" field-id="firstOccurTime" required>
                                <pf-text-input type="datetime-local" id="firstOccurTime_input" name="firstOccurTime" required
                                    v-model="this.incidents[0].firstoccurtime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Last Occur Time" field-id="firstOccurTime">
                                <pf-text-input type="datetime-local" id="firstOccurTime_input" name="firstOccurTime"
                                    v-model="this.incidents[0].lastoccurtime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Domain" field-id="domain" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control" required
                                        v-model="this.incidents[0].domain"                                     
                                        @click="getdomains" >
                                        <pf-spinner v-if="$apollo.loading" size="sm" />                                    
                                        <option :value="item" v-else v-for="item in domains">{{item}}</option>                  
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Network Type" field-id="networkType">
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="this.incidents[0].networktype"                                     
                                        @click="getnetworktypes" >
                                        <pf-spinner v-if="$apollo.loading" size="sm" />                                    
                                        <option :value="item" v-else v-for="item in networkTypes">{{item}}</option>                  
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Device ID" field-id="deviceId">
                                <pf-text-input id="deviceId_input" name="deviceId"
                                    v-model="this.incidents[0].deviceid"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Site Down?" field-id="domain" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="this.incidents[0].sitedown" >
                                        <option value="Yes" >Yes</option>
                                        <option value="No" >No</option>                                    
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Fault NO." field-id="faultNumber">
                                <pf-text-input id="faultNumber_input" name="faultNumber"
                                    v-model="this.incidents[0].faultnumber"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Fault Summary" field-id="faultSummary">
                                <pf-textarea id="faultSummary_input" name="faultSummary"
                                    v-model="this.incidents[0].faultsummary" />
                            </pf-form-group>
                        </div>              
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Assign to User" field-id="processor" required>
                                <pf-text-input id="processor_input" name="processor" required
                                    v-model="this.incidents[0].processor"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Assign to Group" field-id="processors" required>
                                <pf-text-input id="processors_input" name="processors" required
                                    v-model="this.incidents[0].processors"/>
                            </pf-form-group>
                        </div>
                    <div
                  class="pf-l-grid__item pf-m-4-col pf-m-8-col-on-md pf-m-12-col-on-xl"
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
                  <br />
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
        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl">
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
