<script>
import FormTabs from "./Form/FormTabs.vue";
import WorkFlow from "./Workflow/WorkFlow.vue";
import Subprocess from './Form/Subprocess.vue'
import Attachemnts from "../Attachemnts.vue";

export default {
  name: "Index",
  components: { FormTabs, WorkFlow ,Subprocess},
};

</script>

<template>
      <div class="pf-l-grid pf-m-gutter">
        <!-- <div
          class="pf-l-grid__item pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
        >
          <div class="phase-action">
            <pf-card>
              <pf-card-title>Ticket Information</pf-card-title>
              <pf-divider />
              <pf-card-body>
              </pf-card-body>
            </pf-card>
          </div>
        </div> -->
        
          <div class="side">
            <pf-card>
              <pf-card-body>
                <pf-tabs>
                  <pf-tab title="Ticket Information">
                    <br>
                    <form-tabs :ticketid="$route.params.id" />
                  </pf-tab>
                  <pf-tab title="WorkFlow Details">
                    <br>
                    <WorkFlow :ticketid="$route.params.id" />
                  </pf-tab>
                   <pf-tab title="Subprocess">
                    <Subprocess />
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
