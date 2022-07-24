<script>
export default {
  name: "WFCustomerApproval",
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
    <div>
        <pf-card>
          <pf-card-body>
            <pf-form @submit.prevent="submitData" class="pf-l-grid">
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
                      v-model="data.authorizeCustomerOperationMode"
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
                      v-model="data.authorizeCustomerOperationMode"
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
                      id="description"
                      name="description"
                      v-model="data.authorizeCustomerDescription"
                    />
                  </pf-form-group>
                </div>
              </div>
            </pf-form>
          </pf-card-body>
        </pf-card>
    </div>
</template>