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
                            <pf-form-group label="Operation Mode" field-id="assignOperationMode" required>
                                <select class="pf-c-form-control"
                                        v-model="data.assignOperationMode" required >
                                        <option value="Accept" >Accept</option>                                    
                                        <option value="Reject" >Reject</option>                                    
                                    </select>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="assignDescription">
                                <pf-textarea id="assignDescription_input" name="assignDescription"
                                    v-model="data.assignDescription" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="BO Engineer" field-id="processor" required>
                                <pf-text-input id="processor_input" name="processor" required
                                    v-model="data.processor"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="BO Group" field-id="processors" required>
                                <pf-text-input id="processors_input" name="processors" required
                                    v-model="data.processors"/>
                            </pf-form-group>
                        </div>
                        <div
                  class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl"
                >
                  <pf-form-group
                    label="Attachment"
                    required
                    field-id="simple-form-name-01"
                  >
                    <file-pond
                      name="fileupload"
                      ref="pond"
                      label-idle="Click or Drop..."
                      v-bind:allow-multiple="true"
                      accepted-file-types="image/jpeg, image/png"
                      v-on:processfile="handleProcessFile"
                    />
                  </pf-form-group>
                  <br />
                </div>
                    </div>                    
                </pf-form>
</template>