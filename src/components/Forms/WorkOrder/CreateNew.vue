<script>
import gql from "graphql-tag";
import VueMultiselect from "vue-multiselect";
import "../../../styles/vue-multiselect.css";

const USER_TEMPLATE = gql`
    query ($user: String!,$type:String!) {
    template_create1(where: { user: { _eq: $user },_and:{type:{_eq:$type}} }) {
			template_name   
    }
  }
`;
const GET_TEMPLATE_DATA = gql`
  query ($user: String!, $type: String!,$template_name:String!) {
    template_create1(
      where: { user: { _eq: $user }, _and: { type: { _eq: $type },_and:{template_name:{_eq:$template_name}} } }
    ) {
      user
      template_name
      type
      template
    }
  }
`;
const SAVE_TEMPLATE1 = gql`
  mutation ($type: String!, $template: json!, $user: String!, $template_name : String!) {
    insert_template_create1_one(
      object: { type: $type, user: $user, template: $template ,template_name:$template_name }
    ) {
      template
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
  components: { VueMultiselect},
  name: "CreateNew",
  data() {
    return {
      open1:false,
      template_name:"",
      user_templates: [],
      loaded_template_data: [],
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
    
    }
  },methods:{
    load_template(search) {
      console.log(search)
      this.$apolloProvider.defaultClient
        .query({
          query: GET_TEMPLATE_DATA,
          variables: {
            user: this.$store.state.userinfo.username,
            type: "workOrders",
            template_name: search
          },
        })
        .then((res) =>
        {
          console.log(res.data.template_create1[0]?.template);
          this.getdomains()
        this.getfaultlevels()
          this.getnetworktypes()
          this.data = {...res.data.template_create1[0]?.template}          
          this.data.faultAlarm = {...this.data.faultAlarm}
          this.data.faultAlarm.site = {...this.data.faultAlarm.site}
          this.data.information = {...this.data.information}
          this.data.faultAlarm.firstOccurTime = this.data.faultAlarm.firstOccurTime.substring(0,16)
          this.data.faultAlarm.lastOccurTime = this.data.faultAlarm.lastOccurTime.substring(0,16)
        }
        )
    },
    save_template_func() {
      this.$apolloProvider.defaultClient
        .mutate({
          mutation: SAVE_TEMPLATE1,
          variables: {
            user: this.$store.state.userinfo.username,
            type: "workOrders",
            template_name: this.template_name,
            template: this.data
          },
        })
        .then((res) => {
          setTimeout(() => {            
            if(!open1) this.open1 = !this.open1;
          }, 1000);
          this.Notification(
            "info",
            "Saved Successfuly",
            `Template Saved Successfuly.`
          );
        })
        .catch((err) => {
          console.log(err)
          this.Notification(
            "danger",
            `${err}`,
            `Unknown error , ${new Date().toLocaleString()}.`
          );
        });
    },
    get_user_template() {
      this.$apolloProvider.defaultClient
        .query({
          query: USER_TEMPLATE,
          variables: {
            user: this.$store.state.userinfo.username,
            type: "workOrders"
          },
        })
        .then((res) => {
          this.user_templates = res.data.template_create1.map(
            (row) => row.template_name
          );
        });
    },
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
      this.$store.commit('toggle_spinner')
      const req = await fetch(
        `http://localhost:8080/api/workOrders`,
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
        setTimeout(()=>{
        this.$router.push('/')
        },800)
    },
   async Notification(variant = "", title = "", msg = "") {
      this.$store.commit("setNotifications", {
        variant: variant,
        title: title,
        msg: msg,
      });
      if (variant != "danger") {
        setTimeout(() => {
          this.$store.commit("delNotifications");
        },5000);
      }
    },
    clear_alarm() {
      this.$store.commit("delNotifications");
    },
  },
};
</script>

<template>
      <div class="pf-l-grid pf-m-gutter">
        <div
          class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
        >
          <div class="phase-action">
            <pf-card>
              <pf-card-title>Create Work Order</pf-card-title>
              <pf-divider />
              <pf-card-body>
                <pf-form @submit.prevent="submitData">
                    <div class="pf-l-grid">
                      <div
              class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            ></div>
            <div
              class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
            >
              <pf-form-group>
                <div class="pf-c-form__group-label">
                  <label class="pf-c-form__label" for="user_template">
                    <span class="pf-c-form__label-text">Template</span>
                  </label>
                </div>
                <div class="pf-c-form__group-control">
                  <VueMultiselect
                    :multiple="false"
                    :options="user_templates"
                    id="ajax"
                    @click="get_user_template"
                    @select="load_template"
                    :show-labels="false"
                  >
                  </VueMultiselect>
                  
                </div>
              </pf-form-group>
            </div>
            <pf-divider />
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Title" field-id="title" required>
                                <pf-text-input id="title_input" name="title" required
                                    v-model="data.information.title"/>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Description" field-id="createDescription">
                                <pf-textarea id="createDescription_input" name="createDescription"
                                    v-model="data.information.description" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Probable Cause" field-id="probableCause">
                                <pf-textarea id="probableCause_input" name="probableCause"
                                    v-model="data.information.probableCause" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
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
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Site ID" field-id="siteId" required>
                                <VueMultiselect v-model="data.faultAlarm.site.siteId"
                                  :options="useroptions"
                                  id="site"
                                  :searchable="true"                
                                  @search-change="searchfunc">
                              </VueMultiselect>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="EMS ID" field-id="emsId" required>
                                <pf-text-input id="emsId_input" name="emsId" required
                                    v-model="data.faultAlarm.emsId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Alarm ID" field-id="alarmId">
                                <pf-text-input id="alarmId_input" name="alarmId"
                                    v-model="data.faultAlarm.alarmId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Alarm Name" field-id="alarmName" required>
                                <pf-text-input id="alarmName_input" name="alarmName" required
                                    v-model="data.faultAlarm.alarmName"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Alarm Type" field-id="alarmType" required>
                                <pf-text-input id="alarmType_input" name="alarmType" required
                                    v-model="data.faultAlarm.alarmType"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="First Occur Time" field-id="firstOccurTime" required>
                                <pf-text-input type="datetime-local" id="firstOccurTime_input" name="firstOccurTime" required
                                    v-model="data.faultAlarm.firstOccurTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
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
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
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
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
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
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Device ID" field-id="deviceId">
                                <pf-text-input id="deviceId_input" name="deviceId"
                                    v-model="data.faultAlarm.deviceId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
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
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Fault NO." field-id="faultNumber">
                                <pf-text-input id="faultNumber_input" name="faultNumber"
                                    v-model="data.faultAlarm.faultNumber"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Fault Summary" field-id="faultSummary">
                                <pf-textarea id="faultSummary_input" name="faultSummary"
                                    v-model="data.faultAlarm.faultSummary" />
                            </pf-form-group>
                        </div>              
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="FME User" field-id="processor" required>
                                <pf-text-input id="processor_input" name="processor" required
                                    v-model="data.processor"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="FME Group" field-id="processors" required>
                                <pf-text-input id="processors_input" name="processors" required
                                    v-model="data.processors"/>
                            </pf-form-group>
                        </div>
                    </div>
                    <pf-action-group>
                      <pf-button type="submit" variant="primary">Submit</pf-button>
                      <pf-button variant="link">Cancel</pf-button>
                      <pf-button variant="secondary" @click="open1 = !open1"
                  >Save as Template</pf-button
                >
                <pf-modal
                  v-model:open="open1"
                  variant="small"
                  title="Save Template"
                >
                  <div class="pf-l-grid">
                    <div
                      class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
                    >
                      <pf-form-group
                        label="Name"
                        field-id="templateName-group"
                      >
                        <pf-text-input
                          id="templateName"
                          name="TemplateName"
                          v-model="template_name"
                          required
                        />
                        <pre>{{template_name}}</pre>
                      </pf-form-group>
                      <br>
                      <pf-button
                        type="submit"
                        @click.prevent="save_template_func"
                        >Save</pf-button
                      >
                      <pf-button @click="open1 = !open1" variant="link">Cancel</pf-button>
                    </div>
                  </div>
                </pf-modal>
                    </pf-action-group>
                </pf-form>
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
