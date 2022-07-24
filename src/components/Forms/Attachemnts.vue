<script>
import gql from "graphql-tag";

const GET_ATTACHMENTS = gql`
  query ($id: String!) {
    processes(where: { id: { _eq: $id } }) {
      tasks {
        referencename
        attachments {
          id
          name
          content
          updatedby
          updatedat
        }
      }
    }
  }
`;
export default {
  name: "Attachments",
  apollo: {
    processes: {
      query: GET_ATTACHMENTS,
     fetchPolicy: "cache-and-network",
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
};
</script>

<template>
  <div>    
    <table
      class="pf-c-table pf-m-compact pf-m-grid-md"      
      role="grid"
      aria-label="This is a simple table example"
      id="table-basic"
    >
      <caption></caption>      
      <pf-spinner v-if="$apollo.loading" size="sm" />    
      <tbody role="rowgroup" v-else>        
        <tr role="row" v-for="task in processes[0].tasks">
          <td
            v-if="task.attachments.length != 0"
            role="cell"
            data-label="Phase"
          >
            {{ task.referencename }}
          </td>

          <table
            v-if="task.attachments.length != 0"
            class="pf-c-table pf-m-compact pf-m-grid-md pf-m-no-border-rows"
            role="grid"            
            aria-label="This is a simple table example"
            id="table-basic"
          >            
            <tbody class="attach_tbody" role="rowgroup">
              <tr class="attach_tr" role="row" v-for="item in task.attachments">
                <td role="cell" data-label="File Name">
                  <small>{{ item.name }}</small>
                </td>
                <td role="cell" data-label="Uploaded At">
                  <small>{{ item.updatedat }}</small>
                </td>
                <td role="cell" data-label="Uploaded By">
                  <small>{{ item.updatedby }}</small>
                </td>
                <td role="cell" data-label="Download">
                  <small><a :href="item.content" >Download</a></small>
                </td>
              </tr>
            </tbody>
          </table>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}
.wf-style,
.wf-style input {
  opacity: 0.8;
  pointer-events: none;
}
.attach_tbody{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.attach_tr{
    width: 100%;
    display: flex;    
    justify-content: flex-end;
    gap:2em
}

</style>
