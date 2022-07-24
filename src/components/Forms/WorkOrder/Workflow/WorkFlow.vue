<script>
import gql from "graphql-tag";
import WFCreate from "./WFCreate.vue";
import WFHandle from "./WFHandle.vue";
import WFProcess from "./WFProcess.vue";
import WFDeparture from "./WFDeparture.vue";
import WFEnter from "./WFEnter.vue";

const GET_WORKFLOWS = gql`
  query ($id: String!) {
    workorders(where: { id: { _eq: $id } }) {
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
  },components:{WFCreate,WFHandle,WFEnter,WFProcess,WFDeparture},
  props: {
    ticketid: String,
  },
  computed: {
    workflow_data() {
      return this.workorders[0]?.workflows.map((row) => row);
    },
  },
  apollo: {
    workorders: {
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
    <pf-accordion v-if="$apollo.loading">loading...</pf-accordion>
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
        v-else-if="item.name == 'Enter'"
      >
        <WFEnter :data="item.data" />
      </pf-accordion-item>
     
     <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Process'"
      >
        <WFProcess :data="item.data" />
      </pf-accordion-item>

     <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Departure'"
      >
        <WFDeparture :data="item.data" />        
      </pf-accordion-item>

    </pf-accordion>

  </div>
</template>
