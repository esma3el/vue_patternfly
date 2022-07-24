<script>
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";
import Attachemnts from "../../Attachemnts.vue";

const FilePond = vueFilePond();

setOptions({
  server: {
    url: "http://localhost:8080/api/attachments",
  },
});
import FormTabs from "./FormTabs.vue";
import gql from "graphql-tag";
import WorkFlow from "../Workflow/WorkFlow.vue";
import Stepper from '../../Stepper.vue'


const Q2 = gql`
  query ($user: String!, $id: String!, $task_id: String!) {
    tasks(
      where: {
        id: { _eq: $task_id }
        state: { _eq: "Ready" }
        tasks_potential_users: { user_id: { _eq: $user } }
        _and: { state: { _eq: "Ready" } }
        process: { id: { _eq: $id } }
      }
    ) {
      id
    }
  }
`;

const QUERY = gql`
  query ($id: String!) {
    requests(where: { id: { _eq: $id } }) {
      id
      endtimeforimpact
      implementer
      implementers
      plannedendtime
      plannedstarttime
      starttimeforimpact
    }
  }
`;
export default {
  name: "Update",
  components: { FormTabs ,WorkFlow , Stepper, FilePond,Attachemnts},
  data() {
    return {
      attachments:[],
      data: {
        startTimeForImpact: "",
        endTimeForImpact: "",
        plannedStartTime: "",
        plannedEndTime: "",
        implementer: "",
        implementers: "",
      },
      checked: false,
    };
  },
  methods: {
    handleProcessFile: function (error, file) {                  
      if(!error){
      const f = JSON.parse(file.serverId)
      this.attachments.push(f)
      console.log(this.attachments)
      }
    },
    async submitData() {
      this.$store.commit('toggle_spinner')
      this.data.startTimeForImpact = this.requests[0].starttimeforimpact;
      this.data.endTimeForImpact = this.requests[0].endtimeforimpact;
      this.data.plannedStartTime = this.requests[0].plannedstarttime;
      this.data.plannedEndTime = this.requests[0].plannedendtime;
      this.data.implementer = this.requests[0].implementer;
      const req = await fetch(
        `http://localhost:8080/api/changeRequests/${this.$route.params.id}/updatePlan/${this.$route.params.taskid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state._keycloak.token,
          },
          method: "POST",
          body: JSON.stringify({ data: this.data ,attachments: this.attachments})
})
if(req.ok){
          this.Notification(
            "success",
            `status ${req.status}`,
            `${req.statusText} ${new Date().toLocaleString()}.`
          )
        }
        else{          
          this.Notification(
            "danger",
            `status:${req.status}`,
            `${req.statusText} ${new Date().toLocaleString()}.`
          );
        };
        console.log(req);
        this.$store.commit('toggle_spinner')
    },
    async Notification(variant = "", title = "", msg = "") {
      this.$store.commit("setNotifications", {
        variant: variant,
        title: title,
        msg: msg,
      });
      if (variant != "danger") {
        setTimeout(() => {
          this.$store.commit("delNotifications");
        }, 15000);
        setTimeout(() => {
          this.$router.push('/');        
        }, 800);
      }
    },
    clear_alarm() {
      this.$store.commit("delNotifications");
    },
  },
  apollo: {
    requests: {
      query: QUERY,
      variables() {
        return { id: this.$route.params.id };
      },
    },
    tasks: {
      query: Q2,
      variables() {
        return{
          user: this.$store.state.userinfo.username,
          id:this.$route.params.id,
          task_id:this.$route.params.taskid
        }
      },
    },
  },
};
</script>

<template>
  <div class="pf-l-grid pf-m-gutter">
    <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
      <pf-card>
        <pf-card-body>
           <Stepper />     
          </pf-card-body>
      </pf-card>
    </div>
    <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
      <div class="phase-action">        
        <pf-card>
          <pf-card-title> Update Ticket Information </pf-card-title>
          <pf-divider />
          <pf-card-body>
            <pf-spinner v-if="$apollo.loading" size="sm" />
            <pf-form
              @submit.prevent="submitData"
              class="pf-l-grid"
              v-else
              :class="tasks.length != 0 ? '' : 'hide_unauthorized'"
            >
              <div
                class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
              >
                <pf-switch v-model:checked="checked" />
              </div>
              <div
                class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Start Time For Impact"
                  field-id="startTimeForImpact"
                >
                  <pf-text-input
                    :readonly="!checked"
                    :auto-validate="false"
                    id="startTimeForImpact_input"
                    name="startTimeForImpact"
                    type="datetime-local"
                    v-model="requests[0].starttimeforimpact"
                  />
                </pf-form-group>
              </div>
              <div
                class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="End Time For Impact"
                  field-id="endTimeForImpact"
                >
                  <pf-text-input
                    :readonly="!checked"
                    :auto-validate="false"
                    id="endTimeForImpact_input"
                    name="endTimeForImpact"
                    type="datetime-local"
                    v-model="this.requests[0].endtimeforimpact"
                  />
                </pf-form-group>
              </div>
              <div
                class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Planned Start Time"
                  field-id="plannedStartTime"
                >
                  <pf-text-input
                    :readonly="!checked"
                    :auto-validate="false"
                    id="plannedStartTime_input"
                    name="plannedStartTime"
                    type="datetime-local"
                    v-model="this.requests[0].plannedstarttime"
                  />
                </pf-form-group>
              </div>
              <div
                class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Planned End Time"
                  field-id="plannedEndTime"
                >
                  <pf-text-input
                    :readonly="!checked"
                    :auto-validate="false"
                    id="plannedEndTime_input"
                    name="plannedEndTime"
                    type="datetime-local"
                    v-model="this.requests[0].plannedendtime"
                  />
                  <pre>{{requests[0].plannedendtime}}</pre>
                </pf-form-group>
              </div>

              <div
                class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
              >
                <pf-form-group label="implementer" field-id="implementer">
                  <pf-text-input
                    :readonly="!checked"
                    :auto-validate="false"
                    id="implementer_input"
                    name="implementer"
                    v-model="requests[0].implementer"
                  />
                </pf-form-group>
              </div>
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Attachment"
                    required
                    field-id="simple-form-name-01"
                  >
                    <file-pond
                      name="fileupload"
                      ref="pond"
                      label-idle="Click or Drop..."
                      v-bind:allow-multiple="true"
                      accepted-file-types="image/jpeg, image/png"
                      v-on:processfile="handleProcessFile"
                    />
                  </pf-form-group>
                  <br />
                </div>
              <div
                class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
              >
                <pf-action-group>
                  <pf-button block type="submit" variant="primary">Submit</pf-button>
                  <pf-button block variant="tertiary">Cancel</pf-button>
                </pf-action-group>
              </div>
            </pf-form>
          </pf-card-body>
        </pf-card>
      </div>
    </div>
    <div class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
      <div class="side">
        <pf-card>
          <pf-card-body>
            <pf-tabs>
              <pf-tab title="Ticket Information">
                <br />
                <form-tabs :ticketid="$route.params.id" />
              </pf-tab>
              <pf-tab title="WorkFlow Details">
                <br />
                <WorkFlow :ticketid="$route.params.id" />
              </pf-tab>
              <pf-tab title="Attachments">
                    <Attachemnts />
                  </pf-tab>
            </pf-tabs>
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
