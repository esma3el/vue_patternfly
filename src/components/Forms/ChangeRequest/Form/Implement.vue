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

export default {
  name: "Implement",
  components: { FormTabs,WorkFlow },
  data() {
    return {
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
          task_id:this.$route.params.id,
          id:this.$route.params.taskid
        }
      }      
  }},
  methods: {
     async submitData(){
         
          const req = fetch(`http://172.29.2.97:8080/api/changeRequests/${this.$route.params.id}/implement/${this.$route.params.taskid}`,
          {            
            headers:{              
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + this.$store.state._keycloak.token
            },
              method:'POST',
              body: JSON.stringify({'data':this.data})
          })
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
    <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-5-col-on-xl">
      <div class="phase-action">
        <pf-card>
          <pf-card-body>
            <pre v-if="$apollo.loading">..loading</pre>
            <pf-form @submit.prevent="submitData" class="pf-l-grid" v-else :class="tasks.length != 0 ? '' : 'hide_unauthorized'" >
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
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
                    />
                  </pf-form-group>
                </div>
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
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
                    />
                  </pf-form-group>
                </div>

              <!--  -->
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Implementation Quality Approve"
                    field-id="implementationQualityApprove"
                  >
                    <pf-text-input
                      id="implementationQualityApprove_input"
                      name="implementationQualityApprove"
                      v-model="data.implementationQualityApprove"
                    />
                  </pf-form-group>
                </div>
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="osTicketForDb"
                    field-id="osTicketForDb"
                  >
                    <pf-text-input
                      id="osTicketForDb_input"
                      name="osTicketForDb"
                      v-model="data.osTicketForDb"
                    />
                  </pf-form-group>
                </div>
              <!--  -->
              <!--  -->
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Description"
                    field-id="Implementation_group"
                  >
                    <pf-textarea
                      id="Implementation_input"
                      name="Implementation"
                      v-model="data.implementationDescription"
                    />
                  </pf-form-group>
                </div>

              <!--  -->
              <!--  -->
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
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
              <!--  -->
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-action-group>
                    <pf-button type="submit" variant="primary"
                      >Submit</pf-button
                    >
                    <pf-button variant="link">Cancel</pf-button>
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
