<template>
  <div>    
    <table
      class="pf-c-table pf-m-compact pf-m-grid-md"
      role="grid"
      aria-label="This is a simple table example"
      id="table-basic"
    >
      <caption>
        This is the table caption
      </caption>
      <thead>
        <tr role="row">
          <th role="columnheader" scope="col">Ticket ID</th>
          <th role="columnheader" scope="col">Ticket State</th>
          <th role="columnheader" scope="col">Handler</th>
          <th role="columnheader" scope="col">Process Name</th>
          <th role="columnheader" scope="col">Created</th>
        </tr>
      </thead>

      <tbody role="rowgroup" v-if="$apollo.loading">
        ...loading
      </tbody>
      <tbody role="rowgroup" v-else>
        <tr role="row" v-for="task in tasks">
          <td role="cell" data-label="Ticket ID">
          <router-link :to="`/${task.process.processid}/${task.process.id}/${task.name}/${task.id}`"> {{task.process.businesskey}} </router-link></td>
          <td role="cell" data-label="Ticket State"> {{task.referencename}}</td>
          <td role="cell" data-label="Handler">{{task.tasks_potential_users[0].user_id}}</td>
          <td role="cell" data-label="Process Name">{{task.process.processname}}</td>
          <td role="cell" data-label="Created">{{task.process.starttime}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";

const GET_PENDING_DATA = gql`
  query ($user: String!) {
    tasks(
      where: {
        tasks_potential_users: { user_id: { _eq: $user } }
        _and: { state: { _eq: "Ready" } }
      }
    ) {
    id
    name
      referencename
      tasks_potential_users {
        user_id
      }
      process {
      id
      processid
        businesskey
        processname
        starttime
      }
    }
  }
`;
export default {
  name: "Home",
  data() {
    return {};
  },
  apollo: { tasks:{
    query:GET_PENDING_DATA,
    variables:{user:JSON.parse(window.localStorage.getItem("userInfo"))?.username}
  }  },
};
</script>

<style></style>
