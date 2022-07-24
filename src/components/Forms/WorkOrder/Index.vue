<script>
import FormTabs from "./Form/FormTabs.vue";
import WorkFlow from "./Workflow/WorkFlow.vue";
import Stepper from '../Stepper.vue'
import Attachemnts from "../Attachemnts.vue";
import Subprocess from './Subprocess.vue'


export default {
  name: "Index",
  components: { FormTabs, WorkFlow ,Attachemnts, Stepper,Subprocess},
};

</script>

<template>
      <div class="pf-l-grid pf-m-gutter">
        <pf-card>
        <pf-card-body>
           <Stepper />     
          </pf-card-body>
      </pf-card>       
        <div
          class="pf-l-grid__item pf-m-4-col pf-m-4-col-on-md pf-m-12-col-on-xl"
        >
          <div class="side">
            <pf-card>
              <pf-card-body>
                <pf-tabs>
                  <pf-tab title="Ticket Information">
                    <br>
                    <!-- <form-tabs :ticketid="$route.params.id" /> -->
                  </pf-tab>
                  <pf-tab title="WorkFlow Details">
                    <br>
                    <WorkFlow :ticketid="$route.params.id" />
                  </pf-tab>
                  <pf-tab title="Attachments">
                    <Attachemnts />
                  </pf-tab>
                   <pf-tab title="Subprocess">
                    <Subprocess />
                  </pf-tab>
                </pf-tabs>
              </pf-card-body>
            </pf-card>
          </div>
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
