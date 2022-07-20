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
      <!-- <thead>
        <tr role="row">
          <th role="columnheader" scope="col">Phase</th>
        </tr>
      </thead> -->

      <tbody role="rowgroup" v-if="$apollo.loading">
        ...loading
      </tbody>
    
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
            <!-- <thead v-if="task.attachments.length != 0"> 
              <tr>
                <th role="columnheader" scope="col">File Name</th>
                <th role="columnheader" scope="col">Uploaded by</th>
                <th role="columnheader" scope="col">Uploaded At</th>
                <th role="columnheader" scope="col">Link</th>
              </tr>
            </thead> -->
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
    <!-- <pf-pagination
      v-model:page="page"
      v-model:per-page="perPage"
      :count="tasks_aggregate?.aggregate?.count"
    /> -->
  </div>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}
.wf-style,
.wf-style input {
  font-size: 0.7vw;
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
