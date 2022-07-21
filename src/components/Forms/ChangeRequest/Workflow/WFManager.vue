<script>
export default {
  name: "WFManager",
  data() {
    return {
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
            <pf-form @submit.prevent="submitData" class="pf-l-grid" >
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
              >              
                <pf-form-group>
                  <div class="pf-c-form__group-label">
                    <label class="pf-c-form__label" for="Change Category">
                      <span class="pf-c-form__label-text">Operation Mode</span>
                    </label>
                  </div>
                  <div class="pf-c-form__group-control">
                    <select
                      class="pf-c-form-control"
                      v-model="data.handleOperationMode"
                      name=""
                      id=""
                    >
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                    </select>
                  </div>
                </pf-form-group>
              </div>

              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
              >
                <pf-form-group label="Description" field-id="description">
                  <pf-textarea
                    id="description"
                    name="description"
                    v-model="data.authorizeManagerDescription"
                  />
                </pf-form-group>
              </div>

              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
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
</template>