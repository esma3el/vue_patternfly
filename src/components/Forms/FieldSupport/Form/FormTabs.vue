<script>
import gql from "graphql-tag";

const GET_TAB_FORM_DATA = gql`
  query ($id: String!) {
    fieldsupport(where: { id: { _eq: $id } }) {
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
    processcompletetime
    processdescription
    resultflag
    reviewdescription
    sitedown
    siteid
    solution
    source
    incidentsupportcategory
    supportrequestcategory
    supportrequestitem
    supportrequesttype
    title
    zoneid
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
    fieldsupport: {
      query: GET_TAB_FORM_DATA,
     fetchPolicy: "cache-and-network",
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
      <pf-spinner v-if="$apollo.loading" size="lg" />
      <div v-else>
        <pf-tabs secondary>
          <pf-tab title="Support Request" :content-ref="$refs.supportRequest" />
          <pf-tab title="Fault Alarm" :content-ref="$refs.faultAlarm" />
        </pf-tabs>
        <pf-tab-content ref="supportRequest">
          <br>
          <div class="pf-l-grid">
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Originator">
                <pf-text-input disabled v-model="fieldsupport[0].originator"/>
              </pf-form-group>
            </div>
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Incident Support Category">
                <pf-text-input disabled v-model="fieldsupport[0].incidentSupportGroup"/>
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Support Request Category">
                <pf-text-input disabled
                  v-model="fieldsupport[0].supportrequestcategory"
                />
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Support Request Type">
                <pf-text-input disabled
                  v-model="fieldsupport[0].supportrequesttype"
                />
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Support Request Item">
                <pf-text-input disabled
                  v-model="fieldsupport[0].supportrequestitem"
                />
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
            >
              <pf-form-group label="Support Request Description">
                <pf-textarea
                  disabled
                  v-model="fieldsupport[0].createdescription"
                />
              </pf-form-group>
            </div>
            <div
              class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
            >
              <pf-form-group label="Support Complete Time">
                <pf-text-input disabled
                  v-model="fieldsupport[0].processcompletetime"
                />
              </pf-form-group>
            </div>
            </div>
        </pf-tab-content>
        <pf-tab-content ref="faultAlarm">
          <br>
          <div class="pf-l-grid">
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Fault Level">
                <pf-text-input disabled v-model="fieldsupport[0].faultlevel"/>
              </pf-form-group>
            </div>
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Domain">
                <pf-text-input disabled v-model="fieldsupport[0].domain"/>
              </pf-form-group>
            </div>
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Network type">
                <pf-text-input disabled v-model="fieldsupport[0].networktype"/>
              </pf-form-group>
            </div>
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Alarm ID">
                <pf-text-input disabled v-model="fieldsupport[0].alarmid"/>
              </pf-form-group>
            </div>
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Alarm Name">
                <pf-text-input disabled v-model="fieldsupport[0].alarmname"/>
              </pf-form-group>
            </div>
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="First Occur Time">
                <pf-text-input disabled v-model="fieldsupport[0].firstoccurtime"/>
              </pf-form-group>
            </div>
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Site ID">
                <pf-text-input disabled v-model="fieldsupport[0].siteid"/>
              </pf-form-group>
            </div>
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Cluster ID">
                <pf-text-input disabled v-model="fieldsupport[0].clusterid"/>
              </pf-form-group>
            </div>
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Zone ID">
                <pf-text-input disabled v-model="fieldsupport[0].zoneid"/>
              </pf-form-group>
            </div>
            <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
              <pf-form-group label="Device ID">
                <pf-text-input disabled v-model="fieldsupport[0].deviceid"/>
              </pf-form-group>
            </div>
          </div>
        </pf-tab-content>
      </div>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}

</style>
