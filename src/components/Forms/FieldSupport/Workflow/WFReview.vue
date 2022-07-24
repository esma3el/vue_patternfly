<script>
export default {
  props:{
    data:Array
  }
};
</script>

<template>
 <pf-form>
                    <div class="pf-l-grid">
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Operation Mode" field-id="reviewOperationMode" required>
                                    <select class="pf-c-form-control"
                                        v-model="data.reviewOperationMode" required >
                                        <option value="Accept" >Accept</option>                                    
                                        <option value="Reject" >Reject</option>                                    
                                    </select>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="reviewDescription">
                                <pf-textarea id="reviewDescription_input" name="reviewDescription"
                                    v-model="data.reviewDescription" />
                            </pf-form-group>
                        </div>
                        <div v-if="data.assigner != null" class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="FO User" field-id="assigner" required>
                                <pf-text-input id="assigner_input" name="assigner" required
                                    v-model="data.assigner"/>
                            </pf-form-group>
                        </div>
                        <div v-if="data.processor != null" class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="FM User" field-id="processor" required>
                                <pf-text-input id="processor_input" name="processor" required
                                    v-model="data.processor"/>
                            </pf-form-group>
                        </div>
                        <div v-if="data.assigners != null" class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="FO Group" field-id="assigners" required>
                                <pf-text-input id="assigners_input" name="assigners" required
                                    v-model="data.assigners"/>
                            </pf-form-group>
                        </div>
                         <div v-if="data.processors != null" class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="FM Group" field-id="processors" required>
                                <pf-text-input id="processors_input" name="processors" required
                                    v-model="data.processors"/>
                            </pf-form-group>
                        </div>
                </div>
                    
                </pf-form>
</template>