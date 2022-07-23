<script>
export default {
  name: "WFImplement",
  data() {
    return {
      attachments:[],};
  },
  props: {
    data: Array,
  },
};
</script>

<template>
  <div>
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
              <pf-form-group label="osTicketForDb" field-id="osTicketForDb">
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
        </pf-form>
      </pf-card-body>
    </pf-card>
  </div>
</template>
