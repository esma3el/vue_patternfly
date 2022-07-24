<script>
export default {
  name: "WFPlan",
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
                  <label>Update Ticket Information</label>
                </div>
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-3-col-on-xl"
                >
                  <div class="pf-c-radio">
                    <label class="pf-c-radio__label" for="1">Yes</label>
                    <input
                      class="pf-c-radio__input"
                      id="1"
                      type="radio"
                      name="operationmode"
                      value="Accept"                                            
                      readonly
                    />
                  </div>
                </div>
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-3-col-on-xl"
                >
                  <div class="pf-c-radio">
                    <label class="pf-c-radio__label" for="2">No</label>
                    <input
                      class="pf-c-radio__input"
                      id="2"
                      type="radio"
                      name="operationmode"
                      value="Reject"                                            
                      readonly
                    />
                  </div>
                </div>
              </div>
              <div class="pf-l-grid">
                <div
            class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Start Time For Impact"
              
              field-id="startTimeForImpact"
            >
              <pf-text-input
                id="startTimeForImpact_input"
                name="startTimeForImpact"
                type="datetime-local"
                v-model="data.startTimeForImpact"
                readonly
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="End Time For Impact"
              
              field-id="endTimeForImpact"
            >
              <pf-text-input
                id="endTimeForImpact_input"
                name="endTimeForImpact"
                type="datetime-local"
                v-model="data.endTimeForImpact"
                readonly
              />
            </pf-form-group>
          </div>
              </div>
              <div class="pf-l-grid">
          <div
            class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Planned Start Time"
              
              field-id="plannedStartTime"
            >
              <pf-text-input
                id="plannedStartTime_input"
                name="plannedStartTime"
                type="datetime-local"
                v-model="data.plannedStartTime"
                readonly
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Planned End Time"
              
              field-id="plannedEndTime"
            >
              <pf-text-input
                id="plannedEndTime_input"
                name="plannedEndTime"
                type="datetime-local"
                v-model="data.plannedEndTime"
                readonly
              />
            </pf-form-group>
          </div>
          </div>

              <div class="pf-l-grid">
                <div
            class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="implementer"
              
              field-id="implementer"
            >
              <pf-text-input
                id="implementer_input"
                name="implementer"                
                v-model="data.implementer"
                readonly
              />
            </pf-form-group>
          </div>
              </div>
             
            </pf-form>          
</template>