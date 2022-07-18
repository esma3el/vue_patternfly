<script>
export default {
  name: "WFCreate",
  data() {
    return {
    }
  },props:{
    data:Array
  }
};
</script>

<template>
<pf-form @submit.prevent="submitData" class="pf-l-grid wf-style">
    <div class="pf-l-grid">
      <!-- Row 1 -->
      <!-- Title -->
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl">
        <pf-form-group label="Title" readonly field-id="form-title-group">
          <pf-text-input
            id="form-title-input"
            name="Title"
            readonly
            v-model="data.ticketTitle"
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
                readonly
                v-model="data.changeSource"
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
                readonly
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
                readonly
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
              field-id="changeCategory_group"
            >
              <pf-text-input
                id="changeCategory_input"
                name="changeCategory"
                readonly
                v-model="data.changeCategory"
              />
            </pf-form-group>
          </div>
          <!-- Change Type -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Change Type" field-id="changeType">
              <pf-text-input
                id="changeType_input"
                name="changeType"
                readonly
                v-model="data.changeType"
              />
            </pf-form-group>
          </div>
          <!-- changeItem -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Change Item" field-id="changeItem">
              <pf-text-input
                id="changeItem_input"
                name="changeItem"
                readonly
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
              field-id="changeReason"
            >
              <pf-text-area id="changeReason_input" name="changeReason" v-model="data.changeReason" />              
            </pf-form-group>
          </div>
        </div>
        <!-- Row 5 -->
        <div class="pf-l-grid">
          <!-- change product(productId) -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Change Product" readonly field-id="productId">
              <pf-text-input
                id="productId_input"
                name="productId"
                readonly
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
                readonly
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
                readonly
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
            <pf-form-group label="Priority" readonly field-id="priority">
              <pf-text-input
                id="priority_input"
                name="priority"
                readonly
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
                readonly
                v-model="data.vendorId"
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Region" field-id="region">
              <pf-text-input
                id="region_input"
                name="region"
                v-model="data.region"
                readonly
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
              readonly
              field-id="affectedServiceId"
            >
              <pf-text-input
                id="affectedServiceId_input"
                name="affectedServiceId"
                readonly
                v-model="data.affectedServiceId"
              />
            </pf-form-group>
          </div>
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
                readonly
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
              field-id="endTimeForImpact"
            >
              <pf-text-input
                id="endTimeForImpact_input"
                name="endTimeForImpact"
                readonly
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
              field-id="plannedStartTime"
            >
              <pf-text-input
                id="plannedStartTime_input"
                name="plannedStartTime"
                readonly
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
                readonly
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
                readonly
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
                  readonly
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
                  readonly
                  v-model="data.changeDescription"
                />
              </pf-form-group>
            </div>
          </div>
          <!--  -->          
        </div>
        <!-- Row 11 -->
        <div class="pf-l-grid">
          <!--  -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="implementer" field-id="implementer">
              <pf-text-input
                id="implementer"
                name="implementer"
                readonly
                v-model="data.implementer"
              />
            </pf-form-group>
          </div>
          <!--  -->
          <!--  -->
        </div>
      </pf-card-body>
    </pf-card>  
  </pf-form>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}

.wf-style ,.wf-style input{
  font-size: .7vw;
  opacity: .8;
}
</style>
