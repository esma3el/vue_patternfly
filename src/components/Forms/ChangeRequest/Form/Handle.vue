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
import WorkFlow from "../Workflow/WorkFlow.vue";
import gql from 'graphql-tag';
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
  name: "Handle",
  components: { FormTabs, WorkFlow , Stepper, FilePond,Attachemnts},
  data() {
    return {
      attachments:[],
      data: {
        changeRequestCategory: "",
        handleOperationMode: "",
        handleDescription: "",
        approver: "",
        approvers: "",
        analyst: "",
        analysts: "",        
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
  }
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
        `http://localhost:8080/api/changeRequests/${this.$route.params.id}/handle/${this.$route.params.taskid}`,
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
        },15000)
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
    <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-5-col-on-xl">
      <div class="phase-action">
        <pf-card>
          <pf-card-title> Handle CR </pf-card-title>
          <pf-divider />          
          <pf-card-body>
            <pf-spinner v-if="$apollo.loading" size="sm" />
            <pf-form @submit.prevent="submitData" class="pf-l-grid" v-else :class="tasks.length != 0 ? '' : 'hide_unauthorized'" >
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group>
                    <div class="pf-c-form__group-label">
                      <label class="pf-c-form__label" for="Change Category">
                        <span class="pf-c-form__label-text"
                          >Operation Mode</span
                        >
                      </label>
                    </div>
                    <div class="pf-c-form__group-control">
                      <select
                        class="pf-c-form-control"
                        v-model="data.handleOperationMode"
                        name=""
                        id=""
                      >
                        <option value="Accept">Accept</option>
                        <option value="Reject">Reject</option>
                      </select>
                    </div>
                  </pf-form-group>
                </div>
                <pf-form-group>
                  <label class="pf-c-form__label" for="Change Category">
                        <span class="pf-c-form__label-text"
                          >Change Category</span
                        >
                      </label>
                  <div class="pf-c-form__group-control">
                    <select
                      class="pf-c-form-control"
                      name=""
                      id=""
                      v-model="data.changeRequestCategory"
                    >
                      <option value="Pre-Approved">Pre-Approved</option>
                      <option value="Standard">Standard</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                  <!-- search from -->
                </pf-form-group>

                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="CR Analyst"
                    required
                    field-id="CR_analyst"
                  >
                    <pf-text-input
                      id="analyst"
                      name="CR_analyst"
                      required
                      v-model="data.analyst"
                    />
                  </pf-form-group>
                </div>
                
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="CR approver"
                    required
                    field-id="CR_approver"
                  >
                    <pf-text-input
                      id="approver"
                      name="CR_approver"
                      required
                      v-model="data.approver"
                    />
                  </pf-form-group>
                </div>

                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Description"
                    field-id="changeDescription_group"
                  >
                    <pf-textarea
                      id="changeDescription_input"
                      name="changeDescription"
                      v-model="data.handleDescription"
                    />
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
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
              >
                <pf-action-group>
                  <pf-button block type="submit" variant="primary">Submit</pf-button>
                  <pf-button block variant="tertiary">Cancel</pf-button>
                </pf-action-group>
              </div>
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

<style>
.pf-l-grid {
  gap: 2em;
}
.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.test{
  pointer-events: none;
  opacity: .5;
}
</style>
