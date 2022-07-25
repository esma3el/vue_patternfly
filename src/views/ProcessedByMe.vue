<template>
  <div>
    <table    
      class="pf-c-table pf-m-compact pf-m-grid-md"
      role="grid"
      aria-label="This is a simple table example"
      id="table-basic"
    >
      <caption>
        <pf-spinner size="sm" />
      </caption>
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

      
      
      <div>
        <pf-skeleton width="50%" />
          <br>
          <pf-skeleton width="60%" />
          <br>
          <pf-skeleton width="75%" />
          <br>
          <pf-skeleton width="100%" />
      </div>
      <pf-spinner v-if="$apollo.loading"/>
      <tbody role="rowgroup" v-else>
        <tr role="row" v-for="process in processes">
          <td role="cell" data-label="Ticket ID">
            <router-link
              v-if="process.tasks[0]"
              :to="`/${process.processid}/${process.id}/${process.tasks[0]?.name}/${process.tasks[0]?.id}`"
              >{{ process.businesskey }}</router-link
            >
            <router-link v-else :to="`/${process.processid}/${process.id}`">{{
              process.businesskey
            }}</router-link>
          </td>
          <td role="cell" data-label="SLA">
            <img v-if="process.variables?.meta?.restorationSla?.status == 'Within Milestone'" src="http://localhost:9000/kogito/public/green.png"/>
            <img v-else-if="process.variables?.meta?.restorationSla?.status == 'Exeeds Milestone'" src="http://localhost:9000/kogito/public/yellow.png"/>
            <img v-else-if="process.variables?.meta?.restorationSla?.status == 'Exeeds Target'" src="http://localhost:9000/kogito/public/red.png"/>
            <img v-else src="http://localhost:9000/kogito/public/green.png"/>
          </td>
          <td v-if="process.tasks[0]" role="cell" data-label="Ticket State">
            {{ process.tasks[0]?.referencename }}
          </td>
          <td v-else role="cell" data-label="Ticket State">Closed</td>
          <td v-if="process.tasks[0]" role="cell" data-label="Handler">
            {{ process.tasks[0]?.tasks_potential_users[0]?.user_id }}
          </td>
          <td v-else role="cell" data-label="Handler"></td>
          <td role="cell" data-label="Process Name">
            {{ process.processname }}
          </td>
          <td role="cell" data-label="Created">{{ process.starttime.slice(0,16).replace("T"," ") }}</td>
          <td>
            <pf-dropdown v-model:open="open7" plain>
                <template #toggle>
                  <pf-kebab-toggle />
                </template>
                <pf-dropdown-item>
                  <router-link
                    v-if="process.tasks[0]"
                    :to="`/${process.processid}/${process.id}/${process.tasks[0]?.name}/${process.tasks[0]?.id}`"
                    ><i class="fa-solid fa-arrow-right"></i> View Ticket</router-link>
                  <router-link v-else :to="`/${process.processid}/${process.id}`"><i class="fa-solid fa-arrow-right"></i> View Ticket</router-link>
                </pf-dropdown-item>
                <pf-dropdown-item>
                  <a @click="openSvgModal = !openSvgModal"><i class="fa-solid fa-timeline"></i> View SVG</a>
                </pf-dropdown-item>
                <pf-modal variant="large" v-model:open="openSvgModal" title="Process SVG">
                  <img :src="`http://localhost:8780/svg/processes/${process.processid}/instances/${process.id}`" />
                </pf-modal>
              </pf-dropdown>
            </td>
        </tr>
      </tbody>
    </table>
    <pf-pagination
      v-model:page="page"
      v-model:per-page="perPage"
      :count="processes_aggregate?.aggregate.count"
    />
    
  </div>

</template>

<script>
import gql from "graphql-tag";
import "@fortawesome/fontawesome-free/css/all.css";

const GET_PENDING_DATA = gql`
  query ($user: String!, $limit: Int!, $offset: Int!) {
  processes(where: {tasks: {actualowner: {_eq: $user}}}, limit: $limit, offset: $offset) {
    id
    processid
    businesskey
    processname
    starttime
    variables
    tasks(where: {state: {_eq: "Ready"}}) {
      id
      state
      name
      referencename
      tasks_potential_users {
        user_id
      }
    }
  }
  processes_aggregate (where: {tasks: {actualowner: {_eq: $user}}}) {
    aggregate {
      count
    }
  }
}
`;
export default {
  name: "ProcessedByMe",
  data() {
    return {
    openSvgModal: false,
    perPage:10,
    page:1,
    offset:(this.page - 1) * this.perPage
    };
  },watch:{
      page(){
        this.offset = (this.page - 1) * this.perPage
          this.$router
          .push({ query: { ...this.$route.query, page: this.page } })
          .catch(() => {});
      }
  },mounted(){
    
  },
  apollo: {
    processes: {
      query: GET_PENDING_DATA,
      variables(){ return {
        user: this.$store.state.userinfo.username,
        limit:this.perPage,
        offset:this.offset
      }}
    },   
   processes_aggregate: {
      query: GET_PENDING_DATA,
      variables(){ return {
        user: this.$store.state.userinfo.username,
        limit:this.perPage,
        offset:this.offset
      }}
    },   

  },
};
</script>

<style>

</style>
