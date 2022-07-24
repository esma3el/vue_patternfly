<script>
export default {
  name: "WFHandle",
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
                            <pf-form-group label="Operation Mode" field-id="handleOperationMode">
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control" readonly
                                        v-model="data.handleOperationMode" >
                                        <option value="Accept" >Accept</option>                                    
                                        <option value="Reject" >Reject</option>                                    
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="handleDescription">
                                <pf-textarea id="handleDescription_input" name="handleDescription" readonly
                                    v-model="data.handleDescription" />
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