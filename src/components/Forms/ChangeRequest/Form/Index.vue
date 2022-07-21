<script>
import FormTabs from "./FormTabs.vue";
import WorkFlow from "../Workflow/WorkFlow.vue";
import gql from "graphql-tag";
import Stepper from '../../Stepper.vue'

// const Q2 = gql`
//   query ($user: String!, $id: String!, $task_id: String!) {
//     tasks(
//       where: {
//         id: { _eq: $task_id }
//         state: { _eq: "Ready" }
//         tasks_potential_users: { user_id: { _eq: $user } }
//         _and: { state: { _eq: "Ready" } }
//         process: { id: { _eq: $id } }
//       }
//     ) {
//       id
//     }
//   }
// `;

export default {
  name: "Index",
  components: { FormTabs ,WorkFlow, Stepper},
  data() {
    return {
      data: {
        confirmAccepted: "",
        confirmDescription: "",
        confirmSatisfactionDegree: "",
      },

    };
  }
};
</script>

<template>
 <div class="pf-l-grid pf-m-gutter">
   <pf-card>
        <pf-card-body>
           <Stepper />     
          </pf-card-body>
      </pf-card>
    
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
