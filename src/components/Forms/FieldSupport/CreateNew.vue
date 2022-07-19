<script>
import gql from "graphql-tag";

const GET_DOMAINS = gql`
 query {
  domain {
    keycode
  }
}
`;
const GET_NETWORK_TYPES = gql`
 query {
  network_type {
    keycode
  }
}
`;

export default {
  name: "CreateNew",
  data() {
    return {
        domains: [],
        networkTypes: [],
      data: {
        information: {
            title: ""
        },
        createDescription: "",
        createOperationMode: "",
        reviewer: "",
        reviewers: "",
        supportRequest: {
            incidentSupportCategory: "",
            supportRequestCategory: "",
            supportRequestType: "",
            supportRequestItem: ""
        },
        faultAlarm: {
            faultLevel: "",
            domain: "",
            networkType: "",
            alarmName: "",
            firstOccurTime:  "",
            site: {
                siteId: ""
            },
            deviceId: "" 
        }
      },
    };
  },
  methods: {
    getdomains(){
      this.$apolloProvider.defaultClient.query({
        query:GET_DOMAINS
      }).then(res => this.domains = res.data.domain.map(res=> res.keycode)); 
    },
    getnetworktypes(){
      this.$apolloProvider.defaultClient.query({
        query:GET_NETWORK_TYPES
      }).then(res => this.networkTypes = res.data.network_type.map(res=> res.keycode)); 
    },
    async submitData() {
      console.log(JSON.stringify({ data: this.data }));
      const req = fetch(
        `http://localhost:8080/api/fieldSupport`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state._keycloak.token,
          },
          method: "POST",
          body: JSON.stringify({ data: this.data }),
        }
      )
        .then((data) => console.log(data))
        .error((err) => console.log(err));
    },
  },
};
</script>

<template>
      <div class="pf-l-grid pf-m-gutter">
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-12-col-on-xl"
        >
          <div class="phase-action">
            <pf-card>
              <pf-card-title>Create Field Support Request</pf-card-title>
              <pf-divider />
              <pf-card-body>
                <pf-form @submit.prevent="submitData">
                    <div class="pf-l-grid">
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Title" field-id="title" required>
                                <pf-text-input id="title_input" name="title" required
                                    v-model="data.information.title"/>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Site ID" field-id="siteId" required>
                                <pf-text-input id="siteId_input" name="siteId" required
                                    v-model="data.faultAlarm.site.siteId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Alarm Name" field-id="alarmName" required>
                                <pf-text-input id="alarmName_input" name="alarmName" required
                                    v-model="data.faultAlarm.alarmName"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="First Occur Time" field-id="firstOccurTime" required>
                                <pf-text-input type="datetime-local" id="firstOccurTime_input" name="firstOccurTime" required
                                    v-model="data.faultAlarm.firstOccurTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Domain" field-id="domain" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.faultAlarm.domain"                                     
                                        @click="getdomains" >
                                        <option value="" v-if="$apollo.loading">...loading</option>                                    
                                        <option :value="item" v-else v-for="item in domains">{{item}}</option>                  
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Network Type" field-id="networkType">
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.faultAlarm.networkType"                                     
                                        @click="getnetworktypes" >
                                        <option value="" v-if="$apollo.loading">...loading</option>                                    
                                        <option :value="item" v-else v-for="item in networkTypes">{{item}}</option>                  
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Device ID" field-id="deviceId">
                                <pf-text-input id="deviceId_input" name="deviceId"
                                    v-model="data.faultAlarm.deviceId"/>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Incident Support Category" field-id="incidentSupportCategory" required>
                                <pf-text-input id="incidentSupportCategory_input" name="incidentSupportCategory" required
                                    v-model="data.supportRequest.incidentSupportCategory"/>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Support Request Category" field-id="supportRequestCategory" required>
                                <pf-text-input id="supportRequestCategory_input" name="supportRequestCategory" required
                                    v-model="data.supportRequest.supportRequestCategory"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Support Request Type" field-id="supportRequestType" required>
                                <pf-text-input id="supportRequestType_input" name="supportRequestType" required
                                    v-model="data.supportRequest.supportRequestType"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Support Request Item" field-id="supportRequestItem" required>
                                <pf-text-input id="supportRequestItem_input" name="supportRequestItem" required
                                    v-model="data.supportRequest.supportRequestItem"/>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Description" field-id="createDescription">
                                <pf-textarea id="createDescription_input" name="createDescription"
                                    v-model="data.createDescription" />
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="FM Reviewer" field-id="reviewer" required>
                                <pf-text-input id="reviewer_input" name="reviewer" required
                                    v-model="data.reviewer"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="FM Group" field-id="reviewers" required>
                                <pf-text-input id="reviewers_input" name="reviewers" required
                                    v-model="data.reviewers"/>
                            </pf-form-group>
                        </div>
                    </div>
                    <pf-action-group>
                      <pf-button type="submit" variant="primary">Submit</pf-button>
                      <pf-button variant="link">Cancel</pf-button>
                    </pf-action-group>
                </pf-form>
              </pf-card-body>
            </pf-card>
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
