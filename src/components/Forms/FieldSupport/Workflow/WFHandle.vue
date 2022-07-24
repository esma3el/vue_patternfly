<script>
export default {
  name: "WFHandle",
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
        <div class="pf-l-grid">
          <div
            class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
          >
            <pf-form-group
              label="Operation Mode"
              field-id="handleOperationMode"
              required
            >
              <pf-text-input
                id="handleOperationMode_input"
                name="handleOperationMode"
                required
                v-model="data.handleOperationMode"
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
          >
            <pf-form-group label="Description" field-id="handleDescription">
              <pf-textarea
                id="handleDescription_input"
                name="handleDescription"
                v-model="data.handleDescription"
              />
            </pf-form-group>
          </div>
        </div>
      </pf-card-body>
    </pf-card>
  </div>
</template>
