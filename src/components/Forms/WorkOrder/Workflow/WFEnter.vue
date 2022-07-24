<script>
export default {
  name: "WFEnter",
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
                            <pf-form-group label="Enter Time" field-id="enterTime">
                                <div class="pf-c-form__group-control">
                                    <pf-text-input type="text" id="enterTime_input" name="enterTime" readonly
                                    v-model="data.enterTime" />
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="enterDescription">
                                <pf-textarea id="enterDescription_input" name="enterDescription" readonly
                                    v-model="data.enterDescription" />
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