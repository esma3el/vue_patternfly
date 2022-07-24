<template>
  <div>
    <table
      class="pf-c-table pf-m-compact pf-m-grid-md"
      role="grid"
      aria-label="This is a simple table example"
      id="table-basic"
    >
      <caption></caption>
      <thead>
        <tr role="row">
          <th role="columnheader" scope="col">Ticket ID</th>
          <th role="columnheader" scope="col">SLA</th>
          <th role="columnheader" scope="col">Ticket State</th>
          <th role="columnheader" scope="col">Handler</th>
          <th role="columnheader" scope="col">Process Name</th>
          <th role="columnheader" scope="col">Created</th>
          <th role="columnheader" scope="col">Options</th>
        </tr>
      </thead>

      <tbody role="rowgroup" v-if="$apollo.loading">
        ...loading
      </tbody>

      <tbody role="rowgroup" v-else>
        <tr role="row" v-for="task in tasks">
          <td role="cell" data-label="Ticket ID">
            <router-link
              :to="`/${task.process.processid}/${task.process.id}/${task.name}/${task.id}`"
            >
              {{ task.process.businesskey }}
            </router-link>
          </td>
          <td role="cell" data-label="SLA">
            <img
              v-if="
                task.process.variables?.meta?.restorationSla?.status ==
                'Within Milestone'
              "
              src="http://localhost:9000/kogito/public/green.png"
            />
            <img
              v-else-if="
                task.process.variables?.meta?.restorationSla?.status ==
                'Exeeds Milestone'
              "
              src="http://localhost:9000/kogito/public/yellow.png"
            />
            <img
              v-else-if="
                task.process.variables?.meta?.restorationSla?.status ==
                'Exeeds Target'
              "
              src="http://localhost:9000/kogito/public/red.png"
            />
            <img v-else src="http://localhost:9000/kogito/public/green.png" />
          </td>
          <td role="cell" data-label="Ticket State">
            {{ task.referencename }}
          </td>
          <td role="cell" data-label="Handler">
            {{ task.tasks_potential_users[0].user_id }}
          </td>
          <td role="cell" data-label="Process Name">
            {{ task.process.processname }}
          </td>
          <td role="cell" data-label="Created">
            {{ task.process.starttime.slice(0, 16).replace("T", " ") }}
          </td>
          <td>
            <pf-dropdown v-model:open="open7" plain>
                <template #toggle>
                  <pf-kebab-toggle />
                </template>
                <pf-dropdown-item>
                  <router-link :to="`/${task.process.processid}/${task.process.id}/${task.name}/${task.id}`">
                    <i class="fa-solid fa-arrow-right"></i> View Ticket
                  </router-link>
                </pf-dropdown-item>
                <pf-dropdown-item>
                  <a @click="openSvgModal = !openSvgModal"><i class="fa-solid fa-timeline"></i> View SVG</a>
                </pf-dropdown-item>
                <pf-modal variant="large" v-model:open="openSvgModal" title="Process SVG">
                  <img :src="`http://localhost:8780/svg/processes/${task.process.processid}/instances/${task.process.id}`"/>
                </pf-modal>
            </pf-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
    <pf-pagination
      v-model:page="page"
      v-model:per-page="perPage"
      :count="tasks_aggregate?.aggregate?.count"
    />
  </div>
</template>

<script>
import gql from "graphql-tag";
import "@fortawesome/fontawesome-free/css/all.css";

const GET_PENDING_DATA = gql`
  query ($user: String!, $limit: Int!, $offset: Int!) {
    tasks(
      where: {
        tasks_potential_users: { user_id: { _eq: $user } }
        _and: { state: { _eq: "Ready" } }
      }
      limit: $limit
      offset: $offset
      order_by: { started : desc }
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
        variables
      }
    }
    tasks_aggregate(
      where: {
        tasks_potential_users: { user_id: { _eq: $user } }
        _and: { state: { _eq: "Ready" } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const SUBSCRIBE_TO_PENDING_DATA = gql`
  subscription ($user: String!, $limit: Int!, $offset: Int!) {
    tasks(
      where: {
        tasks_potential_users: { user_id: { _eq: $user } }
        _and: { state: { _eq: "Ready" } }
      }
      limit: $limit
      offset: $offset
      order_by: { process: { starttime: desc } }
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
    return {
      openSvgModal: false,
      perPage: 10,
      page: 1,
      offset: (this.page - 1) * this.perPage,
    };
  },
  created() {
    this.$apollo.queries.tasks.startPolling(2000);
  },
  destroyed() {
    this.$apollo.queries.tasks.stopPolling();
  },
  watch: {
    page() {
      this.offset = (this.page - 1) * this.perPage;
    },
    // $route(){
    //   alert('working')
    //   }
  },
  apollo: {
    tasks: {
      query: GET_PENDING_DATA,
      variables() {
        return {
          user: this.$store.state.userinfo.username,
          limit: this.perPage,
          offset: this.offset,
        };
      },
    },
    tasks_aggregate: {
      query: GET_PENDING_DATA,
      variables() {
        return {
          user: this.$store.state.userinfo.username,
          limit: this.perPage,
          offset: this.offset,
        };
      },
    },
  },
};
</script>

<style>
</style>
