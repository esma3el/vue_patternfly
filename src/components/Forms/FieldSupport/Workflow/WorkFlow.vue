<script>
import gql from "graphql-tag";
import WFCreate from "./WFCreate.vue";
import WFConfirm from "./WFConfirm.vue";
import WFReview from "./WFReview.vue";
import WFHandle from "./WFHandle.vue";
import WFProcess from "./WFProcess.vue";
import WFProcessBO from "./WFProcessBO.vue";
import WFAssign from "./WFAssign.vue";

const GET_WORKFLOWS = gql`
  query ($id: String!) {
    processes(where: { id: { _eq: $id } }) {
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
      data:[]
    };
  },components:{WFCreate,WFHandle,WFProcessBO,WFProcess,WFAssign,WFConfirm,WFReview},
  props: {
    ticketid: String,
  },
  apollo: {
    processes: {
      query: GET_WORKFLOWS,
     fetchPolicy: "cache-and-network",
      variables() {
        return { id: this.ticketid };
      },
      update(data){
        this.data = data.processes[0]?.workflows
      }
    },
  },
};
</script>

<template>
  <div class="wfstyle">
    <pf-spinner v-if="$apollo.loading" size="lg" />
    <pf-accordion v-else v-for="(item, index) in data">
      <!-- <pre>{{data}}</pre> -->
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
        v-else-if="item.name == 'Review'"
      >
        <WFReview :data="item.data" />
      </pf-accordion-item>
      
      <pf-accordion-item
        :title="item.name"
        :expanded="expanded == index"
        @update:expanded="expanded = $event ? index : null"
        v-else-if="item.name == 'Assign'"
      >
        <WFAssign :data="item.data" />
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
        v-else-if="item.name == 'BoProcess'"
      >
        <WFProcessBO :data="item.data" />
        
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
.wfstyle form{
  opacity: .7;
  pointer-events: none;
}
</style>