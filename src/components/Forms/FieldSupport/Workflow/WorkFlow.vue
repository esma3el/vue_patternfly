<script>
import gql from "graphql-tag";
import WFCreate from "./WFCreate.vue";
import WFHandle from "./WFHandle.vue";
import WFAnalyze from "./WFAnalyze.vue";
import WFCabApproval from "./WFCabApproval.vue";
import WFCustomerApproval from "./WFCustomerApproval.vue";
import WFPlan from "./WFPlan.vue";
import WFImplement from "./WFImplement.vue";
import WFConfirm from "./WFConfirm.vue";

const GET_WORKFLOWS = gql`
  query ($id: String!) {
    requests(where: { id: { _eq: $id } }) {
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
  },components:{WFCreate,WFHandle,WFAnalyze,WFCabApproval,WFCustomerApproval,WFPlan,WFImplement,WFConfirm},
  props: {
    ticketid: String,
  },
  computed: {
    workflow_data() {
      return this.requests[0]?.workflows.map((row) => row);
    },
  },
  apollo: {
    requests: {
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
        v-else-if="item.name == 'Analyze'"
      >
        <WFAnalyze :data="item.data" />
      </pf-accordion-item>
      
      <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Cab Approval'"
      >
        <WFCabApproval :data="item.data" />
      </pf-accordion-item>
     
     <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Customer Approval'"
      >
        <WFCustomerApproval :data="item.data" />
      </pf-accordion-item>

     <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Plan'"
      >
        <WFPlan :data="item.data" />
        
      </pf-accordion-item>

     <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Implement'"
      >
        <WFImplement :data="item.data" />
        
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
