<script>
export default {
  name: "WFProcess",
  data() {
    return {
      attachments:[],
    }
  },props:{
    data:Array
  }
};
</script>

<template>
    <pf-form @submit.prevent="submitData" class="pf-l-grid">
                    <div class="pf-l-grid wf-style">
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Service Recovery Time" field-id="recoveryTime" >
                                <pf-text-input type="text" id="recoveryTime_input" name="recoveryTime" readonly
                                    v-model="data.faultSolution.recoveryTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Service Interruption Time" field-id="interruptionTime">
                                <pf-text-input type="time" id="interruptionTime_input" name="interruptionTime" readonly
                                    v-model="interruptionTime"/>
                            </pf-form-group>                            
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Root Cause Category" field-id="rootCauseCategory">
                                <pf-text-input type="text" id="rootCauseCategory_input" name="rootCauseCategory" readonly
                                    v-model="data.faultSolution.rootCauseCategory"/>
                            </pf-form-group>                            
                        </div>        
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Root Cause Type" field-id="rootCauseType" readonly>
                                <pf-text-input type="text" id="rootCauseType_input" name="rootCauseType" readonly
                                    v-model="data.faultSolution.rootCauseType"/>
                            </pf-form-group>                            
                        </div>              
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Root Cause Item" field-id="rootCauseItem" readonly>
                                <pf-text-input type="text" id="rootCauseItem_input" name="rootCauseItem" readonly
                                    v-model="data.faultSolution.rootCauseItem"/>
                            </pf-form-group>                            
                        </div>                        
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Root Cause Description" field-id="rootCauseDescription">
                                <pf-text-input id="rootCauseDescription_input" name="rootCauseDescription" readonly
                                    v-model="data.faultSolution.rootCauseDescription"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Reason Description" field-id="faultReasonDescription">
                                <pf-textarea id="faultReasonDescription_input" name="faultReasonDescription" readonly
                                    v-model="data.faultSolution.faultReasonDescription" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Solution Description" field-id="faultSolutionDescription">
                                <pf-textarea id="faultSolutionDescription_input" name="faultSolutionDescription" readonly
                                    v-model="data.faultSolution.faultSolutionDescription" />
                            </pf-form-group>
                        </div>
                    </div>                    
                </pf-form>
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