<script>
import FormTabs from "./FormTabs.vue";
import gql from "graphql-tag";

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
  components: { FormTabs },
  data() {
    return {
      data: {
        startTimeForImpact: "",
        endTimeForImpact: "",
        plannedStartTime: "",
        plannedEndTime: "",
        implementer: "",
        implementers: "",
      },
      checked: false,
      info: window.localStorage.getItem("userInfo"),
    };
  },
  methods: {
    async submitData() {
      console.log(JSON.stringify({ data: this.data }));
      this.data.startTimeForImpact = this.requests[0].starttimeforimpact;
      this.data.endTimeForImpact = this.requests[0].endtimeforimpact;
      this.data.plannedStartTime = this.requests[0].plannedstarttime;
      this.data.plannedEndTime = this.requests[0].plannedendtime;
      this.data.implementer = this.requests[0].implementer;
      const req = fetch(
        `http://localhost:8080/api/changeRequests/${this.$route.params.id}/updatePlan/${this.$route.params.taskid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
          method: "POST",
          body: JSON.stringify({ data: this.data }),
        }
      )
      .then(res=> {this.Notification("success","Saved Successfuly",`Ticket Submited Successfuly At ${new Date().toLocaleString()}.`)})
        .catch(err => {this.Notification("danger","Unknown Error",`Unknown error , ${new Date().toLocaleString()}.`)})
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
        }, 5000);
        setTimeout(() => {
          // this.$router.push({ name: "Home" });
          window.location.href = '/';
        }, 500);
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
        return {
          user: window.localStorage.getItem("userInfo").username,
          id: this.$route.params.id,
          task_id: this.$route.params.taskid,
        };
      },
    },
  },
};
</script>

<template>
  <div class="pf-l-grid pf-m-gutter">
    <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-5-col-on-xl">
      <div class="phase-action">        
        <pf-card>
          <pf-card-title> Update Ticket Information </pf-card-title>
          <pf-divider />
          <pf-card-body>
            <pre v-if="$apollo.loading">..loading</pre>
            <pf-form
              @submit.prevent="submitData"
              class="pf-l-grid"
              v-else
              :class="tasks ? '' : 'hide_unauthorized'"
            >
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
              >
                <pf-switch v-model:checked="checked" />
              </div>
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Start Time For Impact"
                  field-id="startTimeForImpact"
                >
                  <pf-text-input
                    :readonly="!checked"
                    id="startTimeForImpact_input"
                    name="startTimeForImpact"
                    type="datetime-local"
                    v-model="requests[0].starttimeforimpact"
                  />
                </pf-form-group>
              </div>
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="End Time For Impact"
                  field-id="endTimeForImpact"
                >
                  <pf-text-input
                    :readonly="!checked"
                    id="endTimeForImpact_input"
                    name="endTimeForImpact"
                    type="datetime-local"
                    v-model="this.requests[0].endtimeforimpact"
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
                    :readonly="!checked"
                    id="plannedStartTime_input"
                    name="plannedStartTime"
                    type="datetime-local"
                    v-model="this.requests[0].plannedstarttime"
                  />
                </pf-form-group>
              </div>
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl"
              >
                <pf-form-group
                  label="Planned End Time"
                  field-id="plannedEndTime"
                >
                  <pf-text-input
                    :readonly="!checked"
                    id="plannedEndTime_input"
                    name="plannedEndTime"
                    type="datetime-local"
                    v-model="this.requests[0].plannedendtime"
                  />
                </pf-form-group>
              </div>

              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
              >
                <pf-form-group label="implementer" field-id="implementer">
                  <pf-text-input
                    :readonly="!checked"
                    id="implementer_input"
                    name="implementer"
                    v-model="this.requests[0].implementer"
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
    </div>
    <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-7-col-on-xl">
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
