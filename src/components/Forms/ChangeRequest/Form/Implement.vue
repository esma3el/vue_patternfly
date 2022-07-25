<script>
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";
import Attachemnts from "../../Attachemnts.vue";

const FilePond = vueFilePond();

setOptions({
  server: {
    url: "http://localhost:8080/api/attachments",
  },
});
import FormTabs from "./FormTabs.vue";
import TicketInformation from "../../TicketInformation.vue";
import WorkFlow from "../Workflow/WorkFlow.vue";
import gql from "graphql-tag";
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

export default {
  name: "Implement",
  components: { FormTabs,WorkFlow , Stepper, FilePond,TicketInformation,Attachemnts},
  data() {
    return {
      attachments:[],
      data: {
        implementationStartTime: "",
        implementationEndTime: "",
        implementationDescription: "",
        implementationQualityApprove: "",
        implementationResult: "",
        checkedWithQualityTeam: "",
        osTicketForDb: "",
      },
    };
  },apollo: {
    tasks:{
      query:Q2,
      variables(){
        return{
          user: this.$store.state.userinfo.username,
          id:this.$route.params.id,
          task_id:this.$route.params.taskid
        }
      }      
  }},
  methods: {
    handleProcessFile: function (error, file) {                  
      if(!error){
      const f = JSON.parse(file.serverId)
      this.attachments.push(f)
      console.log(this.attachments)
      }
    },
     async submitData(){
          this.$store.commit('toggle_spinner')         
          const req = await fetch(`http://localhost:8080/api/changeRequests/${this.$route.params.id}/implement/${this.$route.params.taskid}`,
          {            
            headers:{              
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + this.$store.state._keycloak.token
            },
              method:'POST',
              body: JSON.stringify({ data: this.data ,attachments: this.attachments}),
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
    <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-6-col-on-xl">
      <div class="phase-action">
        <pf-card>
          <pf-card-body>
            <pf-spinner v-if="$apollo.loading" size="lg" />
            <pf-form @submit.prevent="submitData" class="pf-l-grid" v-else :class="tasks.length != 0 ? '' : 'hide_unauthorized'" >
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
                >
                  <pf-form-group
                    label="Implementation Start Time"
                    
                    field-id="ImplementationStartTime"
                  >
                    <pf-text-input
                      id="ImplementationStartTime_input"
                      name="ImplementationStartTime"
                      type="datetime-local"
                      v-model="data.implementationStartTime"
                      :auto-validate="false"

                    />
                  </pf-form-group>
                </div>
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
                >
                  <pf-form-group
                    label="Implementation End Time"
                    
                    field-id="ImplementationEndTime"
                  >
                    <pf-text-input
                      id="ImplementationEndTime_input"
                      name="ImplementationEndTime"
                      type="datetime-local"     
                      v-model="data.implementationEndTime"
                      :auto-validate="false"
                    />
                  </pf-form-group>
                </div>

              <!--  -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Implementation Quality Approve"
                    field-id="implementationQualityApprove"
                  >
                    <pf-text-input
                      id="implementationQualityApprove_input"
                      name="implementationQualityApprove"
                      v-model="data.implementationQualityApprove"
                      :auto-validate="false"
                    />
                  </pf-form-group>
                </div>
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="osTicketForDb"
                    field-id="osTicketForDb"
                  >
                    <pf-text-input
                      id="osTicketForDb_input"
                      name="osTicketForDb"
                      v-model="data.osTicketForDb"
                      :auto-validate="false"
                    />
                  </pf-form-group>
                </div>
              <!--  -->
              <!--  -->
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Description"
                    field-id="Implementation_group"
                  >
                    <pf-textarea
                      id="Implementation_input"
                      name="Implementation"
                      v-model="data.implementationDescription"
                      :auto-validate="false"
                    />
                  </pf-form-group>
                </div>

              <!--  -->
              <!--  -->
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Implementation Result"
                    field-id="Implementation_result_group"
                  >
                    <pf-textarea
                      id="Implementationresult_input"
                      name="Implementationresult"
                      v-model="data.implementationResult"
                      
                    />
                  </pf-form-group>
                </div>

              <!--  -->
              <!--  -->
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
              <!--  -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-action-group>
                    <pf-button block type="submit" variant="primary">Submit</pf-button>
                  <pf-button @click="$router.go(-1)" block variant="tertiary">Cancel</pf-button>
                  </pf-action-group>
                </div>
            </pf-form>
          </pf-card-body>
        </pf-card>
      </div>
     
    </div>
    <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-6-col-on-xl">
      <div class="side">
        <TicketInformation />
          <br>
        <pf-card>
          <pf-card-body>
            <pf-tabs>
              <pf-tab title="Ticket Information">
                <br />
                <form-tabs :ticketid="$route.params.id" />
              </pf-tab>
              <pf-tab title="WorkFlow Details">
                <br />
                <WorkFlow :ticketid="$route.params.id" />
              </pf-tab>
              <pf-tab title="Attachments">
                    <Attachemnts />
                  </pf-tab>
            </pf-tabs>
          </pf-card-body>
        </pf-card>
      </div>
    </div>
  </div>
</template>
