<script>
import FormTabs from "./FormTabs.vue";

export default {
  name: "Handle",
  components: { FormTabs },
  data() {
    return {
      data: {
        changeRequestCategory: "",
        handleOperationMode: "",
        handleDescription: "",
        approver: "",
        approvers: "",
        analyst: "",
        analysts: "",
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
                      v-model="data.handleOperationMode"
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
                      v-model="data.handleOperationMode"
                    />
                  </div>
                </div>
              </div>
              <div class="pf-l-grid">
                <pf-form-group>
                  <div class="pf-c-form__group-control">
                    <select class="pf-c-form-control" name="" id="" v-model="data.changeRequestCategory"
>
                      <option value="pre-approve">PreApprove</option>
                      <option value="Standard">Standard</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                  <!-- search from -->
                </pf-form-group>
              </div>
              
              <div class="pf-l-grid">
                <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
          >
            <pf-form-group
              label="CR Analyst"
              required
              field-id="CR_analyst"
            >
              <pf-text-input
                id="analyst"
                name="CR_analyst"
                required
                v-model="data.analyst"
              />
            </pf-form-group>
          </div>
              </div>

              <div class="pf-l-grid">
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Description"
                    field-id="changeDescription_group"
                  >
                    <pf-textarea
                      id="changeDescription_input"
                      name="changeDescription"
                      v-model="data.handleDescription"
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
