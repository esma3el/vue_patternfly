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
      workplan
    }
  }
`;

export default {
  name: "FormTabs",
  data() {
    return {};
  },
  props: {
    ticketid: String,
  },
  apollo: {
    requests: {
      query: GET_TAB_FORM_DATA,
      variables() {
        return {
          // id: this.ticketid,
          id: this.$route.params.id,
        };
      },
    },
  },
};
</script>

<template>
      <div v-if="$apollo.loading"> ...loading</div>
      <div class="adjust-font" v-else>
        <pf-tabs secondary>
          <pf-tab title="General" :content-ref="$refs.tabGeneral" />
          <pf-tab title="More Details" :content-ref="$refs.tabModeDetails" />
          <pf-tab title="Change Plan" :content-ref="$refs.tabChangePlan" />
          <pf-tab
            title="Implementation"
            :content-ref="$refs.tabImplementation"
          />
          <pf-tab title="Time" :content-ref="$refs.tabTime" />
        </pf-tabs>
        <pf-tab-content ref="tabGeneral">
          <br>
          <div class="pf-l-grid">
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group
                label="Change Intention"
                field-id="changeIntention_group"
              >
                <pf-text-input
                  id="changeIntention_input"
                  readonly name="changeIntention"
                  :value="requests[0].changeintention"
                />
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Change Type"  field-id="changeType">
                <pf-text-input
                  id="changeType_input"
                  readonly name="changeType"
                  
                  v-model="requests[0].changetype"
                />
              </pf-form-group>
            </div>

            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group
                label="Change Request Source"
                field-id="change-request-source-group"
              >
                <pf-text-input
                  id="change-request-source-input"
                  readonly name="Change Request Source"
                  :value="requests[0].changesource"
                />
              </pf-form-group>
            </div>
            <!--  -->
            <!--  -->
            
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Change Category"
                  
                  field-id="changeCategory_group"
                >
                  <pf-text-input
                    id="changeCategory_input"
                    readonly name="changeCategory"
                    
                    :value="requests[0].changecategory"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Change Type"
                  
                  field-id="changeType"
                >
                  <pf-text-input
                    id="changeType_input"
                    readonly name="changeType"
                    
                    :value="requests[0].changetype"
                  />
                  <!--  -->
                </pf-form-group>
              </div>
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Change Item"
                  
                  field-id="changeItem"
                >
                  <pf-text-input
                    id="changeItem_input"
                    readonly name="changeItem"
                    
                    :value="requests[0].changeitem"
                  />
                </pf-form-group>
              </div>
            
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Source Ticket ID"
                  field-id="sourceTicketId_group"
                >
                  <pf-text-input
                    id="source_ticket_input"
                    readonly name="sourceTicketId"
                    :value="requests[0].sourceticketid"
                  />
                </pf-form-group>
              </div>

              <!--  -->
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group label="Region"  field-id="region">
                  <pf-text-input id="region_input" readonly name="region" :value="requests[0].region" />
                </pf-form-group>
              </div>
              <!--  -->
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group label="Priority"  field-id="priority">
                  <pf-text-input
                    id="priority_input"
                    readonly name="priority"
                    
                    :value="requests[0].priority"
                  />
                </pf-form-group>
              </div>
            
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group label="Vendor" field-id="vendorId">
                  <pf-text-input
                    id="vendorId_input"
                    readonly name="vendorId"
                    :value="requests[0].vendorid"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Change Category"
                  
                  field-id="changeCategory_group"
                >
                  <pf-text-input
                    id="changeCategory_input"
                    readonly name="changeCategory"
                    
                    :value="requests[0].changecategory"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <!--  -->
            
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group label="AffectedNEType" field-id="affectedNEType">
                  <pf-text-input
                    id="affectedNEType_inout"
                    readonly name="affectedNEType"
                    :value="requests[0].affectednetype"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group label="AffectedNEId" field-id="affectedNEId">
                  <pf-text-input
                    id="affectedNEId_input"
                    readonly name="affectedNEId"
                    :value="requests[0].affectedneid"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <!--  -->
            
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Planned Start Time"
                  
                  field-id="plannedStartTime"
                >
                  <pf-text-input
                    id="plannedStartTime_input"
                    readonly name="plannedStartTime"
                    
                    :value="requests[0].plannedstarttime"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Planned End Time"
                  
                  field-id="plannedEndTime"
                >
                  <pf-text-input
                    id="plannedEndTime_input"
                    readonly name="plannedEndTime"
                    
                    :value="requests[0].plannedendtime"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <!--  -->
            
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Start Time For Impact"
                  
                  field-id="startTimeForImpact"
                >
                  <pf-text-input
                    id="startTimeForImpact_input"
                    readonly name="startTimeForImpact"
                    
                    :value="requests[0].starttimeforimpact"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="End Time For Impact"
                  
                  field-id="endTimeForImpact"
                >
                  <pf-text-input
                    id="endTimeForImpact_input"
                    readonly name="endTimeForImpact"
                    
                    :value="requests[0].endtimeforimpact"
                  />
                </pf-form-group>
              </div>
          </div>
        </pf-tab-content>
        <!-- -######################################################################## -->
        <!-- -######################################################################## -->
        <!-- -######################################################################## -->
        <!-- -######################################################################## -->
        <!-- -######################################################################## -->
        <pf-tab-content ref="tabModeDetails">
          <br>
          <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
            >
              <pf-form-group label="Reason for Change" field-id="changeReason">
                <pf-textarea
                  id="changeReason_input"
                  readonly name="changeReason"
                  :value="requests[0].changereason"
                />
              </pf-form-group>
            </div>
          </div>
          <!--  -->
          <!--  -->
          <br>
          <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-sm pf-m-6-col-on-md pf-m-12-col-on-xl"
            >
              <pf-form-group
                label="Description"
                field-id="changeDescription_group"
              >
                <pf-textarea
                  id="changeDescription_input"
                  readonly name="changeDescription"
                  :value="requests[0].changedescription"
                />
              </pf-form-group>
            </div>
          </div>
        </pf-tab-content>
        <pf-tab-content ref="tabChangePlan">
          <br>
          <div class="pf-l-grid">
            <!-- affectedNEType -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="AffectedNEType" field-id="affectedNEType">
                <pf-text-input
                  id="affectedNEType_inout"
                  readonly name="affectedNEType"
                  :value="requests[0].affectednetype"
                />
              </pf-form-group>
            </div>
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group
                label="Affected ServiceId"
                
                field-id="affectedServiceId"
              >
                <pf-text-input
                  id="affectedServiceId_input"
                  readonly name="affectedServiceId"
                  
                  :value="requests[0].affectedserviceid"
                />
              </pf-form-group>
            </div>
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="AffectedNEId" field-id="affectedNEId">
                <pf-text-input
                  id="affectedNEId_input"
                  readonly name="affectedNEId"
                  :value="requests[0].affectedneid"
                />
              </pf-form-group>
            </div>
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Planned Start Time"
                  
                  field-id="plannedStartTime"
                >
                  <pf-text-input
                    id="plannedStartTime_input"
                    readonly name="plannedStartTime"
                    
                    :value="requests[0].plannedstarttime"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Planned End Time"
                  
                  field-id="plannedEndTime"
                >
                  <pf-text-input
                    id="plannedEndTime_input"
                    readonly name="plannedEndTime"
                    
                    :value="requests[0].plannedendtime"
                  />
                </pf-form-group>
              </div>
           
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Start Time For Impact"
                  
                  field-id="startTimeForImpact"
                >
                  <pf-text-input
                    id="startTimeForImpact_input"
                    readonly name="startTimeForImpact"
                    
                    :value="requests[0].starttimeforimpact"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="End Time For Impact"
                  
                  field-id="endTimeForImpact"
                >
                  <pf-text-input
                    id="endTimeForImpact_input"
                    readonly name="endTimeForImpact"
                    
                    :value="requests[0].endtimeforimpact"
                  />
                </pf-form-group>
              </div>
              <!--  -->
            
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
              >
                <pf-form-group label="Work Plan" field-id="workPlan">
                  <pf-textarea
                    id="workPlan_input"
                    readonly name="workPlan"
                    :value="requests[0].workplan"
                  />
                </pf-form-group>
              </div>
              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
              >
                <pf-form-group label="Test Result" field-id="testResult">
                  <pf-textarea
                    id="testResult_input"
                    readonly name="testResult"
                    :value="requests[0].testresult"
                  />
                </pf-form-group>
              </div>
            </div>
        </pf-tab-content>
        <!-- ################################################ -->
        <!-- ################################################ -->
        <!-- ################################################ -->
        <pf-tab-content ref="tabImplementation">
          <br>
          <div class="pf-l-grid">
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group
                label="Planned Start Time"
                
                field-id="plannedStartTime"
              >
                <pf-text-input
                  id="plannedStartTime_input"
                  readonly name="plannedStartTime"
                  
                  :value="requests[0].plannedstarttime"
                />
              </pf-form-group>
            </div>
            <!--  -->
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group
                label="Planned End Time"
                
                field-id="plannedEndTime"
              >
                <pf-text-input
                  id="plannedEndTime_input"
                  readonly name="plannedEndTime"
                  
                  :value="requests[0].plannedendtime"
                />
              </pf-form-group>
            </div>
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
                    readonly name="changeDescription"
                    :value="requests[0].region"
                  />
                </pf-form-group>
              </div>
          </div>
        </pf-tab-content>
        <pf-tab-content ref="tabTime">ChangePlan tabTime</pf-tab-content>
      </div>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}
/* .main {
  padding: 1.5em;
  display: flex;
  justify-content: space-between;
  width: 100%;
} */
.adjust-font,.pf-c-form-control{
  font-size: .7vw;
  opacity: .8;
}
.adjust-font input,.adjust-font textarea{
    pointer-events: none;
}


</style>
