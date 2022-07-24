<script>
export default {
  props:{
    data:Array
  }
};
</script>

<template>
 <pf-form @submit.prevent="submitData">
                    <div class="pf-l-grid">
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Complete Time" field-id="processCompleteTime" required>
                                <pf-text-input type="datetime-local" id="processCompleteTime_input" name="processCompleteTime" required
                                    v-model="data.processCompleteTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Support Description" field-id="processDescription">
                                <pf-textarea id="processDescription_input" name="processDescription"
                                    v-model="data.processDescription" />
                            </pf-form-group>
                        </div>                    
                </div>
                    
                </pf-form>
</template>