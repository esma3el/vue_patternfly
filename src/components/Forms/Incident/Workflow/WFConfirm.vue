<script>
export default {
  name: "WFConfirm",
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
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                          <pf-form-group label="Operation Mode" field-id="confirmOperationMode" >
                                <pf-text-input readonly type="text" id="confirmOperationMode_input" name="confirmOperationMode" 
                                    v-model="data.confirmOperationMode"/>
                            </pf-form-group>                            
                        </div>
                        
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                          <pf-form-group label="Breached SLA?" field-id="slaBreached" >
                                <pf-text-input readonly type="text" id="slaBreached_input" name="slaBreached" 
                                    v-model="data.slaBreached"/>
                            </pf-form-group>                            
                        </div>
                        
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="confirmDescription">
                                <pf-textarea readonly id="confirmDescription_input" name="confirmDescription"
                                    v-model="data.confirmDescription" />
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