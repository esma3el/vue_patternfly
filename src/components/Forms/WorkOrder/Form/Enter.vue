<script>
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";

const FilePond = vueFilePond();

setOptions({
  server: {
    url: "http://localhost:8080/api/attachments",
  },
});
import FormTabs from "./FormTabs.vue";
import WorkFlow from "../Workflow/WorkFlow.vue";
import Stepper from '../../Stepper.vue'
import gql from 'graphql-tag';

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
  name: "Enter",
  components: { FormTabs, WorkFlow , Stepper, FilePond,},
  data() {
    return {
      attachments:[],
      data: {
        enterDescription: "",
        enterTime: ""
      },
    };
  },
  apollo: {
    tasks:{
      query:Q2,
      variables(){
        return{
          user: this.$store.state.userinfo.username,
          id:this.$route.params.id,
          task_id:this.$route.params.taskid
        }
      },
      fetchPolicy: "cache-and-network"
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
        `http://localhost:8080/api/workOrders/${this.$route.params.id}/enter/${this.$route.params.taskid}`,
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
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-5-col-on-xl">
          <div class="phase-action">
            <pf-card>
              <pf-card-title>Enter Work Order</pf-card-title>
              <pf-divider />
              <pf-card-body>
                <pf-spinner v-if="$apollo.loading" size="sm" />
            <pf-form @submit.prevent="submitData" class="pf-l-grid" v-else :class="tasks.length != 0 ? '' : 'hide_unauthorized'" >
                    <div class="pf-l-grid">
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Enter Time" field-id="enterTime" required>
                                <div class="pf-c-form__group-control">
                                    <pf-text-input type="datetime-local" id="enterTime_input" name="enterTime"
                                    v-model="data.enterTime" required/>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="enterDescription">
                                <pf-textarea id="enterDescription_input" name="enterDescription"
                                    v-model="data.enterDescription" />
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
