<script>
import gql from "graphql-tag";

const QUERY = gql`
  query ($user: String!, $limit: Int!, $offset: Int!) {
    tasks(
      where: { tasks_potential_users: { user_id: { _iregex: $user } } }
      limit: $limit
      offset: $offset
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
    tasks_aggregate(
      where: {
        tasks_potential_users: { user_id: { _iregex: $user } }
        _and: { state: { _iregex: "Ready" } }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export default {
  name: "Search",
  data() {
    return {
      perPage: 10,
      page: 1,
      offset: (this.page - 1) * this.perPage,
    };
  },
  watch: {
    page() {
      this.offset = (this.page - 1) * this.perPage;
    },
  },apollo: {
    processes: {
      query: QUERY,
      variables(){ return {
        user: JSON.parse(window.localStorage.getItem("userInfo"))?.username,
        limit:this.perPage,
        offset:this.offset
      }}
    },   
   processes_aggregate: {
      query: QUERY,
      variables(){ return {
        user: JSON.parse(window.localStorage.getItem("userInfo"))?.username,
        limit:this.perPage,
        offset:this.offset
      }}
    },   

  },
};
</script>

<template>
  <pf-form @submit.prevent="" class="pf-l-grid">
    <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl">
      <pf-form-group label="Title" required field-id="form-title-group">
        <pf-text-input id="form-title-input" name="Title" />
      </pf-form-group>
    </div>

    <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl">
      <pf-action-group class="btn">
        <pf-button type="submit" variant="primary">Submit</pf-button>
        <pf-button variant="link">Cancel</pf-button>
      </pf-action-group>
    </div>
  </pf-form>
  <br />
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
        <th role="columnheader" scope="col">Ticket State</th>
        <th role="columnheader" scope="col">Handler</th>
        <th role="columnheader" scope="col">Process Name</th>
        <th role="columnheader" scope="col">Created</th>
      </tr>
    </thead>

    <tbody role="rowgroup" v-if="$apollo.loading">
      <pf-spinner />
    </tbody>
    <tbody role="rowgroup" v-else></tbody>
  </table>
  <pf-pagination
    v-model:page="page"
    v-model:per-page="perPage"
    :count="tasks_aggregate?.aggregate?.count"
  />
</template>
