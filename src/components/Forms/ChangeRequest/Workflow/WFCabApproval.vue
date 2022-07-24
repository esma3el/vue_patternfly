<script>
export default {
  name: "WFCabApproval",
  data() {
    return {
      attachments:[],
    }
  },props:{
    data:Array
  }
};
</script>

<template>
            <pf-form @submit.prevent="submitData">
              <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
                >
                  <label>Operation Mode</label>
                </div>
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-3-col-on-xl"
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
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-3-col-on-xl"
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
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-8-col-on-xl"
                >
                  <pf-form-group label="Description" field-id="description">
                    <pf-textarea
                      readonly
                      id="description"
                      name="description"
                      v-model="data.authorizeCabDescription"
                    />
                  </pf-form-group>
                </div>
              </div>

              <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group
                    label="Customer"
                    
                    field-id="Customer"
                  >
                    <pf-text-input
                      id="Customer_input"
                      name="Customer"
                      readonly  
                      v-model="data.customer"
                    />
                  </pf-form-group>
                </div>
              </div>              
            </pf-form>
</template>