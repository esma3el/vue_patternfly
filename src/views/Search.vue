<script>
import gql from "graphql-tag";

// const GET_AFFECTED_SERVICE = gql`
//   query{
//   affected_service {
//     keycode
//   }
// }

// `;

export default {
  name: "Search",
  data() {
    return {};
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
  <br>
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
      <tbody role="rowgroup" v-else>
        
      </tbody>
    </table>
    <pf-pagination
      v-model:page="page"
      v-model:per-page="perPage"
      count="processes_aggregate.aggregate.count"
    />
    

</template>

