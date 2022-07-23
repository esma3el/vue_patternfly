<script>
import gql from "graphql-tag";


const GET_TAB_FORM_DATA = gql`
  query ($id: String!) {
    incidents(where: { id: { _eq: $id } }) {
      id
      alarmid
      alarmname
      clusterid
      createdescription
      alarmtype
      businessstatus
      contractorid
      description
      deviceid
      domain
      emsid
      faultlevel
      faultnumber
      faultsummary
      firstoccurtime
      initialdiagnosis
      lastoccurtime
      networktype
      nodeid
      originator
      probablecause
      processdescription
      resultflag
      sitedown
      siteid
      solution
      source
      title
      zoneid
      processdescription
      recoverytime
      interruptiontime
      rootcausecategory
      rootcausetype
      rootcauseitem
      rootcausedescription
      faultreasondescription
      faultsolutiondescription
      responseslaname
      responseslastatus
      responseslatriggertime
      responseslatargettime
      responseslaactualtime
      restorationslaname
      restorationslastatus
      restorationslatriggertime
      restorationslamilestonetime
      restorationslatargettime
      restorationslaactualtime
    }
  }
`;

export default {
  name: "FormTabs",
  data() {
    return {
      attachments:[],};
  },
  props: {
    ticketid: String,
  },
  apollo: {
    incidents: {
      query: GET_TAB_FORM_DATA,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
};
</script>

<template>
  <div v-if="$apollo.loading">...loading</div>
  <div class="adjust-font" v-else>
    <pf-tabs secondary>
      <pf-tab title="Incident Ticket" :content-ref="$refs.incidents" />
      <pf-tab title="Fault Alarm" :content-ref="$refs.faultAlarm" />
      <pf-tab title="Fault Solution" :content-ref="$refs.ProcessIncident" />
      <pf-tab title="Associated Alarms" :content-ref="$refs.associatedAlarms" />
      <pf-tab title="SLA Details" :content-ref="$refs.slaDetails" />
    </pf-tabs>
    <pf-tab-content ref="incidents">
      <br />
      <div class="pf-l-grid">
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Title" field-id="title">
            <pf-text-input id="title_input" name="title" readonly 
            v-model="incidents[0].title"/>
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Initial Diagnosis?" field-id="initialDiagnosis">
            <div class="pf-c-form__group-control">
              <pf-text-input
                id="initialDiagnosis_input"
                name="initialDiagnosis"
                readonly
                v-model="incidents[0].initialdiagnosis"
              />
            </div>
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Description" field-id="createDescription">
            <pf-textarea
              id="createDescription_input"
              name="createDescription"
              readonly
              v-model="incidents[0].description"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Probable Cause" field-id="probableCause">
            <pf-textarea
              id="probableCause_input"
              name="probableCause"
              readonly
              v-model="incidents[0].probablecause"
            />
          </pf-form-group>
        </div>
      </div>
    </pf-tab-content>
    <pf-tab-content ref="faultAlarm">
      <br />
      <div class="pf-l-grid">
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Fault Level">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].faultlevel"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Domain">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].domain"
            />
          </pf-form-group>
        </div>        
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Network type">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].networktype"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Alarm ID">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].alarmid"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Alarm Name">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].alarmname"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="First Occur Time">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].firstoccurtime"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Site ID">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].siteid"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Cluster ID">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].clusterid"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Zone ID">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].zoneid"
            />
          </pf-form-group>
        </div>
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Device ID">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].deviceid"
            />
          </pf-form-group>
        </div>
      </div>
    </pf-tab-content>
    <pf-tab-content ref="ProcessIncident">
      <div class="pf-l-grid">
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
        <pf-form-group
          label="Service Recovery Time"
          field-id="recoveryTime"
          
        >
          <pf-text-input
            type="datetime-local"
            id="recoveryTime_input"
            name="recoveryTime"
            readonly
            v-model="incidents[0].recoverytime"
          />
        </pf-form-group>
      </div>
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
        <pf-form-group
          label="Service Interruption Time"
          field-id="interruptionTime"
          
        >
          <pf-text-input
            type="datetime-local"
            id="interruptionTime_input"
            name="interruptionTime"
            readonly
            v-model="incidents[0].interruptiontime"
          />
        </pf-form-group>
      </div>
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
        <pf-form-group
          label="Root Cause Category"
          field-id="rootCauseCategory"
          
        >
          <div class="pf-c-form__group-control">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].rootcausecategory"
            />            
          </div>
        </pf-form-group>
      </div>
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
        <pf-form-group
          label="Root Cause Category"
          field-id="rootCauseCategory"
          
        >
          <div class="pf-c-form__group-control">
            <pf-text-input
              readonly
              :auto-validate="false"              
              v-model="incidents[0].rootcausetype"
            />            
          </div>
        </pf-form-group>
      </div>
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
        <pf-form-group
          label="Root Cause Category"
          field-id="rootCauseCategory"
          
        >
          <div class="pf-c-form__group-control">
            <pf-text-input
              readonly
              :auto-validate="false"
              v-model="incidents[0].rootcauseitem"
            />            
          </div>
        </pf-form-group>
      </div>
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
        <pf-form-group
          label="Root Cause Description"
          field-id="rootCauseDescription"
        >
          <pf-text-input
            id="rootCauseDescription_input"
            name="rootCauseDescription"
            v-model="incidents[0].rootcausedescription"
            readonly
          />
        </pf-form-group>
      </div>
      <div
        class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
      >
        <pf-form-group
          label="Fault Reason Description"
          field-id="faultReasonDescription"
        >
          <pf-textarea
            id="faultReasonDescription_input"
            name="faultReasonDescription"
            v-model="incidents[0].faultreasondescription"
            readonly
          />
        </pf-form-group>
      </div>
      <div
        class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
      >
        <pf-form-group
          label="Fault Solution Description"
          field-id="faultSolutionDescription"
        >
          <pf-textarea
            id="faultSolutionDescription_input"
            name="faultSolutionDescription"
            v-model="incidents[0].faultsolutiondescription"
            readonly
          />
        </pf-form-group>
      </div>
      </div>
    </pf-tab-content>
    <pf-tab-content ref="associatedAlarms">
      <br />
      <div class="pf-l-grid">
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
        >
          <pf-form-group label="Title" field-id="title">
            <pf-text-input id="title_input" name="title" readonly 
            v-model="incidents[0].title"/>
          </pf-form-group>
        </div>
      </div>
    </pf-tab-content>
    <pf-tab-content ref="slaDetails">
      <br />
      <pf-card>
        <pf-card-title>{{incidents[0].responseslaname}}</pf-card-title>
        <pf-divider />
        <pf-card-body>
          <div class="pf-l-grid">
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Status" field-id="status">
              <pf-text-input id="status_input" name="status" readonly 
                v-model="incidents[0].responseslastatus"/>
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Trigger Time" field-id="trigger">
              <pf-text-input id="trigger_input" name="trigger" readonly 
                v-model="incidents[0].responseslatriggertime"/>
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Target Time" field-id="target">
              <pf-text-input id="target_input" name="target" readonly 
                v-model="incidents[0].responseslatargettime"/>
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Actual Time" field-id="actual">
              <pf-text-input id="actual_input" name="actual" readonly 
                v-model="incidents[0].responseslaactualtime"/>
              </pf-form-group>
            </div>
          </div>
        </pf-card-body>
      </pf-card>
      <br />
      <pf-card>
        <pf-card-title>{{incidents[0].restorationslaname}}</pf-card-title>
        <pf-divider />
        <pf-card-body>
          <div class="pf-l-grid">
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Status" field-id="status">
              <pf-text-input id="status_input" name="status" readonly 
                v-model="incidents[0].restorationslastatus"/>
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Trigger Time" field-id="trigger">
              <pf-text-input id="trigger_input" name="trigger" readonly 
                v-model="incidents[0].restorationslatriggertime"/>
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Milestone Time" field-id="milestone">
              <pf-text-input id="milestone_input" name="milestone" readonly 
                v-model="incidents[0].restorationslamilestonetime"/>
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Target Time" field-id="target">
              <pf-text-input id="target_input" name="target" readonly 
                v-model="incidents[0].restorationslatargettime"/>
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Actual Time" field-id="actual">
              <pf-text-input id="actual_input" name="actual" readonly 
                v-model="incidents[0].restorationslaactualtime"/>
              </pf-form-group>
            </div>
          </div>
        </pf-card-body>
      </pf-card>
    </pf-tab-content>
  </div>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}
.adjust-font,
.pf-c-form-control {
  font-size: 0.7vw;
  opacity: 0.8;
}
.adjust-font input,
.adjust-font textarea {
  pointer-events: none;
}
</style>
