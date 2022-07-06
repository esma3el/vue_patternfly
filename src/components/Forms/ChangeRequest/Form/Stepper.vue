<script>
import gql from "graphql-tag";

const WFSTEPPER = gql`
  query ($id: String!) {
  tasks(where: {processinstanceid: {_eq: $id}}, order_by: {completed: asc}) {
    state
    referencename
    name
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
        return this.tasks.map(row => row)
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
      :class="item.state == 'Completed' ? 'pf-c-progress-stepper__step pf-m-success' : 'pf-c-progress-stepper__step pf-m-current pf-m-info' "
      :aria-label="item.state == 'Ready' ? 'current step,in process step,' : 'completed step,' "      
    >
      <div class="pf-c-progress-stepper__step-connector">
        <span class="pf-c-progress-stepper__step-icon" v-if="item.state == 'Completed'">
          <i class="fas fa-check-circle" aria-hidden="true"></i>                    
        </span>
        <span class="pf-c-progress-stepper__step-icon" v-else>
          <i class="pficon pf-icon-resources-full"
           aria-hidden="true"></i>           
        </span>
      </div>
      <div class="pf-c-progress-stepper__step-main">
        <div class="pf-c-progress-stepper__step-title">{{item.referencename}}</div>
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