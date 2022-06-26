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
        <tr role="row" v-for="process in processes">
          <td role="cell" data-label="Ticket ID">
            <router-link v-if="process.tasks[0]" :to="`/${process.processid}/${process.id}/${process.tasks[0]?.name}/${process.tasks[0]?.id}`">{{process.businesskey}}</router-link>
            <router-link v-else :to="`/${process.processid}/${process.id}`">{{process.businesskey}}</router-link>
          </td>
          <td v-if="process.tasks[0]" role="cell" data-label="Ticket State"> {{process.tasks[0]?.referencename}}</td>
          <td v-else role="cell" data-label="Ticket State"> Closed</td>
          <td v-if="process.tasks[0]" role="cell" data-label="Handler"> {{process.tasks[0]?.tasks_potential_users[0]?.user_id}}</td>
          <td v-else role="cell" data-label="Handler"></td>
          <td role="cell" data-label="Process Name">{{process.processname}}</td>
          <td role="cell" data-label="Created">{{process.starttime}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";

const GET_PENDING_DATA = gql`
  query ($user: String!) {
  processes(where: {tasks: {actualowner: {_eq: $user}}}) {
    id
    processid
    businesskey
    processname
    starttime
    tasks(where: {state: {_eq: "Ready"}}) {
      id
      state
      name
      referencename
      tasks_potential_users{
        user_id
      }
    }
  }
}
`;
export default {
  name: "ProcessedByMe",
  data() {
    return {};
  },
  apollo: { processes:{
    query:GET_PENDING_DATA,
    variables:{user:JSON.parse(window.localStorage.getItem("userInfo"))?.username}
  }  },
};
</script>

<style></style>
