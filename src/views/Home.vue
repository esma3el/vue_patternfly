<template>
  <!-- <Dashboard /> -->
<pre>{{userinfo.username}}</pre>
</template>

<script>
import gql from "graphql-tag";


export default {
  name: "Home",
  components: { },
  data() {
    return {
      userinfo:JSON.parse(window.localStorage.getItem('userInfo'))
    };
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
