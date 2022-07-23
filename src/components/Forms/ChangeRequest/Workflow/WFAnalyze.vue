<script>
export default {
  name: "WFAnalyze",
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
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
                >
                  <pf-form-group label="Priority" field-id="priority">
                    <pf-text-input
                      id="priority_input"
                      name="priority"
                      readonly     
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
                  readonly
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
                readonly
                  id="rollback_input"
                  name="rollback"
                  v-model="data.rollbackPlan"
                />
              </pf-form-group>
            </div>
          </div>             
            </pf-form>
          </pf-card-body>
        </pf-card>
    </div>
</template>