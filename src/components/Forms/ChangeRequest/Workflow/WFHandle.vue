<script>
export default {
  name: "WFHandle",
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
            <pf-form @submit.prevent="submitData" class="pf-l-grid">
              <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
                >
                <!-- <pre>{{$route.params.task}}</pre> -->
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
                      readonly
                      v-model="data.handleOperationMode"
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
                      v-model="data.handleOperationMode"
                    />
                  </div>
                </div>
              </div>
              <div class="pf-l-grid">
                <pf-form-group>
                  <div class="pf-c-form__group-control">
                    <select class="pf-c-form-control" name="" id="" readonly v-model="data.changeRequestCategory">
                        
                      <option value="Pre-Approved">Pre-Approved</option>
                      <option value="Standard">Standard</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                  <!-- search from -->
                </pf-form-group>
              </div>
              
              <div class="pf-l-grid">
                <div
            class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
          >
            <pf-form-group
              label="CR Analyst"
              readonly
              field-id="CR_analyst"
            >
              <pf-text-input
                id="analyst"
                name="CR_analyst"
                readonly
                v-model="data.analyst"
              />
            </pf-form-group>
          </div>
              </div>

              <div class="pf-l-grid">
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Description"
                    field-id="changeDescription_group"
                  >
                    <pf-textarea
                      id="changeDescription_input"
                      name="changeDescription"
                      readonly
                      v-model="data.handleDescription"
                    />
                  </pf-form-group>
                </div>
              </div>              
            </pf-form>

</template>
