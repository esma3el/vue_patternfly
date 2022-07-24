<template>
  <div>
    <table
      class="pf-c-table pf-m-compact pf-m-grid-md"
      role="grid"
      aria-label="This is a simple table example"
      id="table-basic"
    >
      <caption>        
      </caption>
      <thead>
        <tr role="row">
            <th role="columnheader" scope="col">Business Key</th>          
          <th role="columnheader" scope="col">Process Name</th>          
          <th role="columnheader" scope="col">Phase</th>          
          <th role="columnheader" scope="col">Handler</th>          
        </tr>
      </thead>
      <pf-spinner v-if="$apollo.loading" size="lg" />
      <tbody role="rowgroup" v-else>
        <tr role="row" v-for="process in data">
          <td role="cell" data-label="Process Name">
            {{process.businesskey}}
          </td>
          <td role="cell" data-label="Process Name">
            {{process.processname}}
          </td>
          <td role="cell" data-label="Phase">
            {{process.tasks[0]?.name}}
          </td>
          <td role="cell" data-label="Handler" v-for="user in process.tasks[0]?.tasks_potential_users">
            {{user.user_id}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";

const GET_DATA = gql`
query ($id: String!){
  processes (where: {parentprocessinstanceid: {_eq: $id}}) {
    processname
    tasks {
      name
      tasks_potential_users {
        user_id
      }
    }
  }
}
`
export default {
  data() {
    return {
        data:[]
    };
  },
  apollo: {
    processes: {
      query: GET_DATA,
     fetchPolicy: "cache-and-network",
      variables() {
        return {
          id:this.$route.params.id
        }
      },
      update(data){
        this.data = {...data.processes}
      }
    },
  },
};
</script>

<style></style>
