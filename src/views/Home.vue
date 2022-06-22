<template>
  <div class="pf-l-grid pf-m-all-6-col-on-md pf-m-gutter">
    <pf-card>
      <pf-card-body>
        <h1>1</h1>
      </pf-card-body>
    </pf-card>
    <pf-card>
      <pf-card-body>
        <h1>1</h1>
      </pf-card-body>
    </pf-card>
    <pf-card>
      <pf-card-body>
        <h1>1</h1>
      </pf-card-body>
    </pf-card>
    <pf-card>
      <pf-card-body>
        </pf-card-body>
    </pf-card>
        <small>
          <pre>{{ rows }}</pre>
        </small>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    rows() {
      if (!this.processes) {
        return [];
      } else {
        return this.processes.map((row) => ({
          ...row,
          id: row.id,
          businesskey: row.businesskey,
          starttime: row.starttime,
          processname: row.processname,
        }));
      }
    },
  },
  apollo: {
    processes: gql`
      query {
        processes {
          id
          businesskey
          starttime
          processname
        }
      }
    `,
  },
};
</script>
