<script>
import FormTabs from "./FormTabs.vue";

export default {
  name: "Analyze",
  components: { FormTabs },
  data() {
    return {
      data: {
        priority: "",
        workPlan: "",
        testingPlan: "",
        rollbackPlan: "",
      },
    };
  },
  methods: {
      async submitData(){
          console.log(JSON.stringify({'data':this.data}))
          const req = fetch(`http://172.29.2.97:8080/api/changeRequests/${this.$route.params.id}/analyze/${this.$route.params.taskid}`,
          {            
            headers:{              
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + window.localStorage.getItem('token')
            },
              method:'POST',
              body: JSON.stringify({'data':this.data})
          }).then(data => console.log(data)).error(err => console.log(err)) 
        }
      }
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
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
                >
                  <pf-form-group label="Priority" field-id="priority">
                    <pf-text-input
                      id="priority_input"
                      name="priority"
                      
                      v-model="data.priority"
                    />
                  </pf-form-group>
                </div>
              </div>
              <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
                >
                  <pf-form-group label="Work Plan" field-id="workPlan">
                    <pf-textarea
                      id="workPlan_input"
                      name="workPlan"
                      v-model="data.workPlan"
                    />
                  </pf-form-group>
                </div>
              </div>
              <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            >
              <pf-form-group label="Test Result" field-id="testResult">
                <pf-textarea
                  id="testResult_input"
                  name="testResult"
                  v-model="data.testResult"
                />
              </pf-form-group>
            </div>
          </div>
              <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            >
              <pf-form-group label="rollback" field-id="rollback">
                <pf-textarea
                  id="rollback_input"
                  name="rollback"
                  v-model="data.rollbackPlan"
                />
              </pf-form-group>
            </div>
          </div>
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
              >
                <pf-action-group>
                  <pf-button type="submit" variant="primary">Submit</pf-button>
                  <pf-button variant="link">Cancel</pf-button>
                </pf-action-group>
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
