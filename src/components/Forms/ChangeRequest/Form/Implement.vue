<script>
import FormTabs from "./FormTabs.vue";

export default {
  name: "Implement",
  components: { FormTabs },
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
  },
  methods: {
     async submitData(){
         
          const req = fetch(`http://172.29.2.97:8080/api/changeRequests/${this.$route.params.id}/implement/${this.$route.params.taskid}`,
          {            
            headers:{              
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + window.localStorage.getItem('token')
            },
              method:'POST',
              body: JSON.stringify({'data':this.data})
          }).then(data => console.log(data)).error(err => console.log(err)) 
        }
  },
};
</script>

<template>
  <div>
    <div class="content">
      <div class="phase-action">
        <pf-card>
          <pf-card-body>
            <pf-form @submit.prevent="submitData" class="pf-l-grid">
              <div class="pf-l-grid">
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
              </div>

              <!--  -->
              <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
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
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
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
              </div>
              <!--  -->
              <!--  -->
              <div class="pf-l-grid">
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
              </div>

              <!--  -->
              <!--  -->
              <div class="pf-l-grid">
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
              </div>

              <!--  -->
              <!--  -->
              <!--  -->
              <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-action-group>
                    <pf-button type="submit" variant="primary"
                      >Submit</pf-button
                    >
                    <pf-button variant="link">Cancel</pf-button>
                  </pf-action-group>
                </div>
              </div>
            </pf-form>
          </pf-card-body>
        </pf-card>
      </div>
      <div class="side">
        <form-tabs :ticketid="$route.params.id" />
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
