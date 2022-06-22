<script>
import FormTabs from "./FormTabs.vue";

export default {
  name: "Update",
  components: { FormTabs },
  data() {
    return {
      data: {
        startTimeForImpact: "",
        endTimeForImpact: "",
        plannedStartTime: "",
        plannedEndTime: "",
        implementer: "",
        implementers: "",
      },
    };
  },
  methods: {
    submitData() {},
  },
};
</script>

<template>
  <div>
    <div class="content">
      <div class="phase-action">
        <pf-card>
          <pf-card-body>
            <pf-form class="pf-l-grid">
              <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
                >
                  <label>Update Ticket Information</label>
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
                      value="Accept"
                      v-model="data.authorizeCabOperationMode"
                      
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
                      value="Reject"                      
                      v-model="data.authorizeCabOperationMode"
                    />
                  </div>
                </div>
              </div>
              <div class="pf-l-grid">
                <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Start Time For Impact"
              
              field-id="startTimeForImpact"
            >
              <pf-text-input
                id="startTimeForImpact_input"
                name="startTimeForImpact"
                
                v-model="data.startTimeForImpact"
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="End Time For Impact"
              
              field-id="endTimeForImpact"
            >
              <pf-text-input
                id="endTimeForImpact_input"
                name="endTimeForImpact"
                
                v-model="data.endTimeForImpact"
              />
            </pf-form-group>
          </div>
              </div>
              <div class="pf-l-grid">
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Planned Start Time"
              
              field-id="plannedStartTime"
            >
              <pf-text-input
                id="plannedStartTime_input"
                name="plannedStartTime"
                
                v-model="data.plannedStartTime"
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Planned End Time"
              
              field-id="plannedEndTime"
            >
              <pf-text-input
                id="plannedEndTime_input"
                name="plannedEndTime"
                
                v-model="data.plannedEndTime"
              />
            </pf-form-group>
          </div>
          </div>

              <div class="pf-l-grid">
                <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="implementer"
              
              field-id="implementer"
            >
              <pf-text-input
                id="implementer_input"
                name="implementer"
                
                v-model="data.implementer"
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
