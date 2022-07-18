<script>
import FormTabs from "./FormTabs.vue";
import WorkFlow from "../Workflow/WorkFlow.vue";
import gql from "graphql-tag";
import Stepper from "./Stepper.vue";

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

export default {
  name: "Cab",
  components: { FormTabs, WorkFlow, Stepper },
  data() {
    return {
      data: {
        authorizeCabDescription: "",
        authorizeCabOperationMode: "",
        customer: "",
        customers: "",
      },
    };
  },
  apollo: {
    tasks: {
      query: Q2,
      variables() {
        return {
          user: this.$store.state.userinfo.username,
          id: this.$route.params.id,
          task_id: this.$route.params.taskid,
        };
      },
    },
  },
  methods: {
    async submitData() {
      console.log(JSON.stringify({ data: this.data }));
      const req = await fetch(
        `http://localhost:8080/api/changeRequests/${this.$route.params.id}/cabApprove/${this.$route.params.taskid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state._keycloak.token,
          },
          method: "POST",
          body: JSON.stringify({ data: this.data }),
        }
      ).then(res=> {this.Notification("success","Saved Successfuly",`Ticket Submited Successfuly At ${new Date().toLocaleString()}.`)})
        .catch(err => {this.Notification("danger",'error',`${err} , ${new Date().toLocaleString()}.`)})
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
          // this.$router.push({name:'Home'})
          window.location.href = "/";
        }, 500);
      }
    },
    clear_alarm() {
      this.$store.commit("delNotifications");
    },
  },
};
</script>

<template>
  <div class="pf-l-grid pf-m-gutter">
    <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-12-col-on-xl">
      <pf-card>
        <pf-card-body>
          <Stepper />
        </pf-card-body>
      </pf-card>
    </div>
    <div class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-5-col-on-xl">
      <div class="phase-action">
        <pf-card>
          <pf-card-body>
            <pre v-if="$apollo.loading">..loading</pre>
            <pf-form
              @submit.prevent="submitData"
              class="pf-l-grid"
              v-else
              :class="tasks.length != 0 ? '' : 'hide_unauthorized'"
            >
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
              >
                <pf-form-group>
                  <div class="pf-c-form__group-label">
                    <label class="pf-c-form__label" for="Change Category">
                      <span class="pf-c-form__label-text">Operation Mode</span>
                    </label>
                  </div>
                  <div class="pf-c-form__group-control">
                    <select
                      class="pf-c-form-control"
                      v-model="data.authorizeCabOperationMode"
                      name=""
                      id=""
                    >
                      <option value="Accept">Accept</option>
                      <option value="Reject">No</option>
                    </select>
                  </div>
                </pf-form-group>
              </div>

              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
              >
                <pf-form-group label="Customer" required field-id="Customer">
                  <pf-text-input
                    id="Customer_input"
                    name="Customer"
                    required
                    v-model="data.customer"
                  />
                </pf-form-group>
              </div>

              <!--  -->
              <div
                class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl"
              >
                <pf-form-group label="Description" field-id="description">
                  <pf-textarea
                    id="description"
                    name="description"
                    v-model="data.authorizeCabDescription"
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
