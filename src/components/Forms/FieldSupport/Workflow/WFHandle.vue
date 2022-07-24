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
                            <pf-form-group label="Operation Mode" field-id="handleOperationMode" required>
                                <select class="pf-c-form-control"
                                        v-model="data.handleOperationMode" required >
                                        <option value="Accept" >Accept</option>                                    
                                        <option value="Reject" >Reject</option>                                    
                                    </select>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="handleDescription">
                                <pf-textarea id="handleDescription_input" name="handleDescription"
                                    v-model="data.handleDescription" />
                            </pf-form-group>
                        </div>                    
                </div>                    
                </pf-form>
</template>