<script>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
// import GET_TAB_FORM_DATA from './GraphQueries.js'

const GET_TAB_FORM_DATA = gql`
  query ($id: String!) {
    requests(where: { id: { _eq: $id } }) {
      id
      changecategory
      changedescription
      changeintention
      changeitem
      changereason
      endtimeforimpact
      implementer
      implementationendtime
      plannedendtime
      plannedstarttime
      priority
      productid
      region
      sourceticketid
      starttimeforimpact
      tickettitle
      testresult
      vendorid
      changesource
      changerequestcategory
      changetype
      affectedserviceid
      affectedneid
      affectednetype
    }
  }
`;

export default {
  name: "FormTabs",
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
        affectedServiceId: [],
        plannedEndTime: "",
        plannedStartTime: "",
        workPlan: "",
        testResult: "",
        changeDescription: "",
        implementer: [],
        implementers: [],
        changeDescription: "",
      },
    };
  },
  mounted() {
    console.log("hi");
  },
  props: {
    ticketid: String,
  },

  apollo: {
    requests: {
      query: GET_TAB_FORM_DATA,
      variables() {
        return {
          id: this.ticketid,
        };
      },
    },
  },
};
</script>

<template>
  <div class="main">
    <pf-card>
      <pf-card-body>
        <pf-tabs>
          <pf-tab title="General" :content-ref="$refs.tabGeneral" />
          <pf-tab title="More Details" :content-ref="$refs.tabModeDetails" />
          <pf-tab title="Change Plan" :content-ref="$refs.tabChangePlan" />
          <pf-tab
            title="Implementation"
            :content-ref="$refs.tabImplementation"
          />
          <pf-tab title="PIR" :content-ref="$refs.tabPIR" />
          <pf-tab title="Time" :content-ref="$refs.tabTime" />
        </pf-tabs>
        <pf-tab-content ref="tabGeneral">
          <div class="pf-l-grid">
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
            <!--  -->
            <!--  -->
            <div class="pf-l-grid">
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
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
              >
                <pf-form-group
                  label="Change Type"
                  required
                  field-id="changeType"
                >
                  <pf-text-input
                    id="changeType_input"
                    name="changeType"
                    required
                    v-model="data.changeType"
                  />
                  <!--  -->
                </pf-form-group>
              </div>
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
              >
                <pf-form-group
                  label="Change Item"
                  required
                  field-id="changeItem"
                >
                  <pf-text-input
                    id="changeItem_input"
                    name="changeItem"
                    required
                    v-model="data.changeItem"
                  />
                </pf-form-group>
              </div>
            </div>
            <!--  -->
            <div class="pf-l-grid">
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

              <!--  -->
              <!--  -->
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
              <!--  -->
              <!--  -->
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
            </div>
            <!--  -->
            <!--  -->
            <div class="pf-l-grid">
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
              <!--  -->
              <!--  -->
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
              <!--  -->
              <!--  -->
            </div>
            <div class="pf-l-grid">
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
              <!--  -->
              <!--  -->
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
              <!--  -->
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
              <!--  -->
              <!--  -->
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
              <!--  -->
              <!--  -->
            </div>
            <div class="pf-l-grid">
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
              <!--  -->
              <!--  -->
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
            </div>
          </div>
        </pf-tab-content>
        <!-- -######################################################################## -->
        <!-- -######################################################################## -->
        <!-- -######################################################################## -->
        <!-- -######################################################################## -->
        <!-- -######################################################################## -->
        <pf-tab-content ref="tabModeDetails">
          <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            >
              <pf-form-group label="Reason for Change" field-id="changeReason">
                <pf-text-area
                  id="changeReason_input"
                  name="changeReason"
                  v-model="data.changeReason"
                />
                <pf-textarea />
              </pf-form-group>
            </div>
          </div>
          <!--  -->
          <!--  -->
          <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-sm pf-m-6-col-on-md pf-m-8-col-on-xl"
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
        </pf-tab-content>
        <pf-tab-content ref="tabChangePlan">
          <div class="pf-l-grid">
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
            <!--  -->
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
            <!--  -->
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
            <!--  -->
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
              <!--  -->
              <!--  -->
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
            </div>
            <!--  -->
            <div class="pf-l-grid">
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
              <!--  -->
              <!--  -->
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
          </div>
        </pf-tab-content>
        <!-- ################################################ -->
        <!-- ################################################ -->
        <!-- ################################################ -->
        <pf-tab-content ref="tabImplementation">
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
            <!--  -->
            <!--  -->
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
            <!--  -->
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
          </div>
        </pf-tab-content>
        <pf-tab-content ref="tabPIR">
          <div class="pf-l-grid">
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            >
              <pf-radio id="radio" label="Success" />
            </div>
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            >
              <pf-radio id="radio" label="Failure" />
            </div>
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
          </div>
        </pf-tab-content>
        <pf-tab-content ref="tabTime">ChangePlan tabTime</pf-tab-content>
      </pf-card-body>
    </pf-card>
  </div>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}
.main {
  padding: 1.5em;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
