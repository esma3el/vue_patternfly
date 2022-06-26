<script>
import FormTabs from "./FormTabs.vue";

export default {
  name: "Cab",
  components: { FormTabs },
  data() {
    return {
      data: {
        authorizeCabDescription: "",
        authorizeCabOperationMode: "",
        customer: "",
        customers: "",
      },
    };
  },
  methods: {
    async submitData(){
      console.log(JSON.stringify({'data':this.data}))
      const req = fetch(`http://172.29.2.97:8080/api/changeRequests/${this.$route.params.id}/cabApprove/${this.$route.params.taskid}`,
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
                  <label>Operation Mode</label>
                </div>
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
                >
                  <div class="pf-c-radio">
                    <label class="pf-c-radio__label" for="1">Accept</label>
                    <input
                      class="pf-c-radio__input"
                      id="1"
                      type="radio"
                      name="operationmode"
                      value="Accept"
                      v-model="data.authorizeCabOperationMode"
                    />
                  </div>
                </div>
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
                >
                  <div class="pf-c-radio">
                    <label class="pf-c-radio__label" for="2">Reject</label>
                    <input
                      class="pf-c-radio__input"
                      id="2"
                      type="radio"
                      name="operationmode"
                      value="Reject"
                      v-model="data.authorizeCabOperationMode"
                    />
                  </div>
                </div>
              </div>
              <div class="pf-l-grid">
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
                >
                  <pf-form-group label="Description" field-id="description">
                    <pf-textarea
                      id="description"
                      name="description"
                      v-model="data.authorizeCabDescription"
                    />
                  </pf-form-group>
                </div>
              </div>

              <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group
                    label="Customer"
                    required
                    field-id="Customer"
                  >
                    <pf-text-input
                      id="Customer_input"
                      name="Customer"
                      required
                      v-model="data.customer"
                    />
                  </pf-form-group>
                </div>
              </div>

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
