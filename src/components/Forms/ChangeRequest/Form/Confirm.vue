<script>
import FormTabs from "./FormTabs.vue";

export default {
  name: "Confirm",
  components: { FormTabs },
  data() {
    return {
      data: {
        confirmAccepted: "",
        confirmDescription: "",
        confirmSatisfactionDegree: "",
      },
    };
  },
  methods: {
     async submitData(){
          
          const req = fetch(`http://172.29.2.97:8080/api/changeRequests/${this.$route.params.id}/confirm/${this.$route.params.taskid}`,
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
                    <label class="pf-c-radio__label" for="1">Yes</label>
                    <input
                      class="pf-c-radio__input"
                      id="1"
                      type="radio"
                      name="operationmode"
                      value="Yes"
                      v-model="data.confirmAccepted"
                    />
                  </div>
                </div>
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
                >
                  <div class="pf-c-radio">
                    <label class="pf-c-radio__label" for="2">No</label>
                    <input
                      class="pf-c-radio__input"
                      id="2"
                      type="radio"
                      name="operationmode"
                      value="No"
                      v-model="data.confirmAccepted"
                    />
                  </div>
                </div>
              </div>
              <!--  -->
              <!--  -->
              <!--  -->
              <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
                >
                  <label>SatisfactionDegree</label>
                </div>
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
                >
                  <div class="pf-c-radio">
                    <label class="pf-c-radio__label" for="1">Poor</label>
                    <input
                      class="pf-c-radio__input"
                      id="1"
                      type="radio"
                      name="operationmode"
                      value="poor"
                      v-model="data.confirmSatisfactionDegree"
                    />
                  </div>
                </div>
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
                >
                  <div class="pf-c-radio">
                    <label class="pf-c-radio__label" for="2">Fair</label>
                    <input
                      class="pf-c-radio__input"
                      id="2"
                      type="radio"
                      name="operationmode"
                      value="fair"
                      v-model="data.confirmSatisfactionDegree"
                    />
                  </div>
                </div>
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-3-col-on-xl"
                >
                  <div class="pf-c-radio">
                    <label class="pf-c-radio__label" for="2">Excellent</label>
                    <input
                      class="pf-c-radio__input"
                      id="2"
                      type="radio"
                      name="operationmode"
                      value="excellent"
                      v-model="data.confirmSatisfactionDegree"
                    />
                  </div>
                </div>
              </div>
                <!--  -->
                <!--  -->
                <!--  -->
              <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group label="Description" field-id="description">
                    <pf-textarea
                      maxlength="2048"
                      id="description"
                      name="description"
                      v-model="data.confirmDescription"
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
