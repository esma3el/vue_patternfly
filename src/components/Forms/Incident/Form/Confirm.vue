<script>
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";
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
export default {
  name: "Confirm",
  components: { FormTabs, WorkFlow , Stepper, FilePond,Subprocess,Attachemnts},
  data() {
    return {
      attachments:[],
      data: {
        confirmDescription: "",
        confirmOperationMode: "",
        slaBreached: ""
      },
    };
  },
  apollo: {
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
    async submitData() {
      this.$store.commit('toggle_spinner')
      const req = await fetch(
        `http://localhost:8080/api/incidents/${this.$route.params.id}/confirm/${this.$route.params.taskid}`,
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
              <pf-card-title>Confirm Incident</pf-card-title>
              <pf-divider />
              <pf-card-body>
                <pf-spinner v-if="$apollo.loading" size="sm" />
            <pf-form @submit.prevent="submitData" class="pf-l-grid" v-else :class="tasks ? '' : 'hide_unauthorized'" >
                    <div class="pf-l-grid">
                        <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Operation Mode" field-id="confirmOperationMode" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.confirmOperationMode" required >
                                        <option value="Accept" >Accept</option>                                    
                                        <option value="Reject" >Reject</option>                                    
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Breached SLA?" field-id="slaBreached" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.slaBreached" required >
                                        <option value="Yes" >Yes</option>                                    
                                        <option value="No" >No</option>                                    
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="confirmDescription">
                                <pf-textarea id="confirmDescription_input" name="confirmDescription"
                                    v-model="data.confirmDescription" />
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
                  <br />
                </div>
                    </div>
                    <pf-action-group>
                      <pf-button block type="submit" variant="primary">Submit</pf-button>
                      <pf-button block variant="link">Cancel</pf-button>
                    </pf-action-group>
                </pf-form>
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
