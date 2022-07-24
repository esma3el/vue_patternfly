<script>
import gql from "graphql-tag";
import WFCreate from "./WFCreate.vue";
import WFHandle from "./WFHandle.vue";
import WFReview from "./WFReview.vue";
import WFProcess from "./WFProcess.vue";
import WFConfirm from "./WFConfirm.vue";

const GET_WORKFLOWS = gql`
  query ($id: String!) {
    incidents(where: { id: { _eq: $id } }) {
      workflows(order_by: { created: asc }) {
        id
        name
        type
        actor
        created
        data
      }
    }
  }
`;
export default {
  data() {
    return {
      attachments:[],
      expanded: 0,
    };
  },components:{WFCreate,WFHandle, WFProcess,WFReview,WFConfirm},
  props: {
    ticketid: String,
  },
  computed: {
    workflow_data() {
      return this.incidents[0]?.workflows.map((row) => row);
    },
  },
  apollo: {
    incidents: {
      query: GET_WORKFLOWS,
     fetchPolicy: "cache-and-network",
      variables() {
        return { id: this.ticketid };
      },
    },
  },
};
</script>

<template>
  <div>
    <pf-spinner v-if="$apollo.loading" size="sm" />
    <pf-accordion v-else v-for="(item, index) in workflow_data">

      <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-if="item.name == 'Create'"
      >
        <WFCreate :data="item.data" />
      </pf-accordion-item>

      <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Handle'"
      >
        <WFHandle :data="item.data" />
      </pf-accordion-item>
      
      <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Process'"
      >
      <pre>{{item.data}}</pre>

        <!-- <WFProcess :data="item.data" /> -->
      </pf-accordion-item>
     
     <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Review'"
      >
        <WFReview :data="item.data" />
      </pf-accordion-item>

     <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Confirm'"
      >
        <WFConfirm :data="item.data" />
        
      </pf-accordion-item>

    </pf-accordion>

  </div>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}
.wf-style ,.wf-style input{
  
  opacity: .8;
  pointer-events: none;
}
</style>