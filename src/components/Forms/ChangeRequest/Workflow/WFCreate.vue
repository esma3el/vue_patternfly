<script>
export default {
  name: "Create",
  data() {
    return {
      data: {
        title: "",
        change_request_source: "",
        sourceTicketId: "",
        changeIntention: "",
        changeCategory: "",
        changeType: "",
        changeItem: "",
        changeReason: "",
        productId: "",
        affectedNEType: "",
        affectedNEId: "",
        priority: "",
        vendorId: "",
        region: "",
        startTimeForImpact: "",
        endTimeForImpact: "",
        affectedServiceId: "",
        plannedEndTime: "",
        plannedStartTime: "",
        workPlan: "",
        testResult: "",
        changeDescription: "",
        implementer: "",
        implementers: "",
        changeDescription: "",
      }
    };
  },methods:{
        async submitData(){
          const req = fetch('')
        }
      }
};
</script>

<template>
  <pf-form @submit.prevent="submitData" class="pf-l-grid">
    <div class="pf-l-grid">
      <!-- Row 1 -->
      <!-- Title -->
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl">
        <pf-form-group label="Title" required field-id="form-title-group">
          <pf-text-input
            id="form-title-input"
            name="Title"
            required
            v-model="data.title"
          />
        </pf-form-group>
      </div>
    </div>
    <!-- Row 2 -->
    <pf-card>
      <pf-card-title>Change Information</pf-card-title>
      <pf-card-body>
        <div class="pf-l-grid">
          <!-- Change Request Source -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Change Request Source"
              field-id="change-request-source-group"
            >
              <pf-text-input
                id="change-request-source-input"
                name="Change Request Source"
                v-model="data.change_request_source"
              />
            </pf-form-group>
          </div>
          <!-- sourceTicketId -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Source Ticket ID"
              field-id="sourceTicketId_group"
            >
              <pf-text-input
                id="source_ticket_input"
                name="sourceTicketId"
                v-model="data.sourceTicketId"
              />
            </pf-form-group>
          </div>
          <!-- changeIntention -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Change Intention"
              field-id="changeIntention_group"
            >
              <pf-text-input
                id="changeIntention_input"
                name="changeIntention"
                v-model="data.changeIntention"
              />
            </pf-form-group>
          </div>
        </div>

        <!-- Row 3 -->
        <div class="pf-l-grid">
          <!-- changeCategory -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Change Category"
              required
              field-id="changeCategory_group"
            >
              <pf-text-input
                id="changeCategory_input"
                name="changeCategory"
                required
                v-model="data.changeCategory"
              />
            </pf-form-group>
          </div>
          <!-- Change Type -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Change Type" required field-id="changeType">
              <pf-text-input
                id="changeType_input"
                name="changeType"
                required
                v-model="data.changeType"
              />
            </pf-form-group>
          </div>
          <!-- changeItem -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Change Item" required field-id="changeItem">
              <pf-text-input
                id="changeItem_input"
                name="changeItem"
                required
                v-model="data.changeItem"
              />
            </pf-form-group>
          </div>
        </div>
        <!-- changeReason -->
        <div class="pf-l-grid">
          <!--  -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
          >
            <pf-form-group
              label="Reason for Change"
              required
              field-id="changeReason"
            >
              <pf-text-area
                id="changeReason_input"
                name="changeReason"
                v-model="data.changeReason"
              />
              <pf-textarea />
            </pf-form-group>
          </div>
        </div>
        <!-- Row 5 -->
        <div class="pf-l-grid">
          <!-- change product(productId) -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Change Product" required field-id="productId">
              <pf-text-input
                id="productId_input"
                name="productId"
                required
                v-model="data.productId"
              />
            </pf-form-group>
          </div>
          <!-- affectedNEType -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="AffectedNEType" field-id="affectedNEType">
              <pf-text-input
                id="affectedNEType_inout"
                name="affectedNEType"
                v-model="data.affectedNEType"
              />
            </pf-form-group>
          </div>
          <!-- affectedNEId -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="AffectedNEId" field-id="affectedNEId">
              <pf-text-input
                id="affectedNEId_input"
                name="affectedNEId"
                v-model="data.affectedNEId"
              />
            </pf-form-group>
          </div>
        </div>
        <!-- Row 6 -->
        <div class="pf-l-grid">
          <!--  -->
          <!-- priority -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Priority" required field-id="priority">
              <pf-text-input
                id="priority_input"
                name="priority"
                required
                v-model="data.priority"
              />
            </pf-form-group>
          </div>
          <!-- vendorId -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Vendor" field-id="vendorId">
              <pf-text-input
                id="vendorId_input"
                name="vendorId"
                v-model="data.vendorId"
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Region" required field-id="region">
              <pf-text-input
                id="region_input"
                name="region"
                v-model="data.region"
                required
              />
            </pf-form-group>
          </div>
        </div>
        <!--startTimeForImpact-->
        <div class="pf-l-grid">
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Affected ServiceId"
              required
              field-id="affectedServiceId"
            >
              <pf-text-input
                id="affectedServiceId_input"
                name="affectedServiceId"
                required
                v-model="data.affectedServiceId"
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Start Time For Impact"
              required
              field-id="startTimeForImpact"
            >
              <pf-text-input
                id="startTimeForImpact_input"
                name="startTimeForImpact"
                required
                v-model="data.startTimeForImpact"
              />
            </pf-form-group>
          </div>

          <!-- endTimeForImpact -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="End Time For Impact"
              required
              field-id="endTimeForImpact"
            >
              <pf-text-input
                id="endTimeForImpact_input"
                name="endTimeForImpact"
                required
                v-model="data.endTimeForImpact"
              />
            </pf-form-group>
          </div>
          <!--  -->
        </div>
        <div class="pf-l-grid">
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Planned Start Time"
              required
              field-id="plannedStartTime"
            >
              <pf-text-input
                id="plannedStartTime_input"
                name="plannedStartTime"
                required
                v-model="data.plannedStartTime"
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Planned End Time"
              required
              field-id="plannedEndTime"
            >
              <pf-text-input
                id="plannedEndTime_input"
                name="plannedEndTime"
                required
                v-model="data.plannedEndTime"
              />
            </pf-form-group>
          </div>

          <!-- ----------------------------------------------------------------------------------------------- -->
        </div>

        <!-- Row 8 -->
      </pf-card-body>
    </pf-card>

    <!-- Row 9 -->
    <pf-card>
      <pf-card-body>
        <div class="pf-l-grid">
          <!--  -->
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
      </pf-card-body>
    </pf-card>

    <!-- Row 10 -->
    <pf-card>
      <pf-card-body>
        <div class="pf-l-grid">
          <!--  -->
          <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            >
              <pf-form-group label="Test Result" field-id="testResult">
                <pf-textarea
                  id="testResult_input"
                  name="testResult"
                  v-model="data.testResult"
                />
              </pf-form-group>
            </div>
          </div>
          <!--  -->
          <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            >
              <pf-form-group
                label="Description"
                field-id="changeDescription_group"
              >
                <pf-textarea
                  id="changeDescription_input"
                  name="changeDescription"
                  v-model="data.changeDescription"
                />
              </pf-form-group>
            </div>
          </div>
          <!--  -->
          <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-2-col pf-m-2-col-on-md pf-m-2-col-on-xl"
            >
              <pf-form-group
                label="Attachment"
                required
                field-id="simple-form-name-01"
              >
                <pf-text-area
                  id="simple-form-name-01"
                  name="simple-form-name-01"
                />
                <pf-button variant="secondary">Attachment</pf-button>
              </pf-form-group>
            </div>
          </div>
        </div>
        <!-- Row 11 -->
        <div class="pf-l-grid">
          <!--  -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="implementer" required field-id="implementer">
              <pf-text-input
                id="implementer"
                name="implementer"
                required
                v-model="data.implementer"
              />
            </pf-form-group>
          </div>
          <!--  -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="implementers" field-id="implementers">
              <pf-text-input
                id="implementers"
                name="implementers"
                v-model="data.implementers"
              />
            </pf-form-group>
          </div>
          <!--  -->
        </div>
      </pf-card-body>
    </pf-card>
    <div class="pf-l-grid">
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl">
        
        <pf-action-group>
          <pf-button type="submit" variant="primary">Submit</pf-button>
          <pf-button variant="link">Cancel</pf-button>
        </pf-action-group>
      </div>
    </div>
  </pf-form>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}
</style>
