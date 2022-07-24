<script>
import FormTabs from "./Form/FormTabs.vue";
import WorkFlow from "./Workflow/WorkFlow.vue";
import Stepper from '../Stepper.vue'
import Attachemnts from "../Attachemnts.vue";

export default {
  name: "Index",
  components: { FormTabs ,WorkFlow, Stepper,Attachemnts}
};
</script>

<template>
 <div class="pf-l-grid pf-m-gutter">
   <pf-card>
        <pf-card-body>
           <Stepper />     
          </pf-card-body>
      </pf-card>
    
      <div class="side">
        <pf-card>
          <pf-card-body>
            <pf-tabs>
              <pf-tab title="Ticket Information">
                <br />
                <form-tabs :ticketid="$route.params.id" />
              </pf-tab>
              <pf-tab title="WorkFlow Details">
                <br />
                <WorkFlow :ticketid="$route.params.id" />
              </pf-tab>
              <pf-tab title="Attachments">
                    <Attachemnts />
                  </pf-tab>                  
            </pf-tabs>
          </pf-card-body>
        </pf-card>
      </div>
  </div>
</template>

<style>
.pf-l-grid {
  gap: 2em;
}
.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
