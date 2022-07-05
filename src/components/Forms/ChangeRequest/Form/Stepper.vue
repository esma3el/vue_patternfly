<script>
import gql from "graphql-tag";

const WFSTEPPER = gql`
  query ($id: String!) {
    tasks(where: { id: { _eq: $id } }) {
      id
      state
      process {
        workflows(order_by: { created: asc }) {
          name
          created
          actor
        }
      }
    }
  }
`;

export default {
  name: "Stepper",
  data() {
    return {
    };
  },computed:{
    getdata(){
        return this.tasks[0]?.process.workflows.map(row => row)
    }
  },
  apollo: {
    tasks: {
      query: WFSTEPPER,
      variables() {
        return { id: this.$route.params.id };
      },
    },
  },
};
</script>

<template>  
  <pre v-if="$apollo.loading">..loading</pre>
  <ol v-else class="pf-c-progress-stepper">    
    <li
      v-for="(item,index) in getdata"      
      :class="tasks[0].state == 'Completed' ? 'pf-c-progress-stepper__step pf-m-success' : getdata[getdata.length - 1].name == item.name ? 'pf-c-progress-stepper__step pf-m-current pf-m-info' : 'pf-c-progress-stepper__step pf-m-success' "
      :aria-label="getdata[getdata.length - 1].name == item.name ? 'current step,in process step,' : 'completed step,' "      
    >
      <div class="pf-c-progress-stepper__step-connector">
        <span class="pf-c-progress-stepper__step-icon" v-if="tasks[0].state == 'Completed'">
          <i class="fas fa-check-circle" aria-hidden="true"></i>                    
        </span>
        <span class="pf-c-progress-stepper__step-icon" v-else>
          <i :class="getdata[getdata.length - 1].name == item.name ? 'pficon pf-icon-resources-full' : 'fas fa-check-circle' "
           aria-hidden="true"></i>           
        </span>
      </div>
      <div class="pf-c-progress-stepper__step-main">
        <div class="pf-c-progress-stepper__step-title">{{item.name}}</div>
      </div>
    </li>
    
    <!--  -->
     <!-- <li
     
      class="pf-c-progress-stepper__step pf-m-current pf-m-info"
      aria-label="current step,in process step,"
    >
      <div class="pf-c-progress-stepper__step-connector">
        <span class="pf-c-progress-stepper__step-icon">
          <i class="pficon pf-icon-resources-full" aria-hidden="true"></i>
        </span>
      </div>
      <div class="pf-c-progress-stepper__step-main">
        <div class="pf-c-progress-stepper__step-title"></div>
      </div>
    </li> -->

    <!-- <li
      class="pf-c-progress-stepper__step pf-m-pending"
      aria-label="pending step,"
    >
      <div class="pf-c-progress-stepper__step-connector">
        <span class="pf-c-progress-stepper__step-icon"></span>
      </div>
      <div class="pf-c-progress-stepper__step-main">
        <div class="pf-c-progress-stepper__step-title">Third step</div>
      </div>
    </li>  -->
  </ol>
</template>

<style>
.poponver{
  position: relative;
}
</style>