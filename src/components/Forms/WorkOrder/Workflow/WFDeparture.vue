<script>
export default {
  name: "WFDeparture",
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
    <pf-form @submit.prevent="submitData" class="pf-l-grid" >
                    <div class="pf-l-grid wf-style">
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Departure Time" field-id="departureTime">
                                <div class="pf-c-form__group-control">
                                    <pf-text-input type="text" id="departureTime_input" name="departureTime"
                                    v-model="data.departureTime" readonly/>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="departureDescription">
                                <pf-textarea id="departureDescription_input" name="departureDescription"
                                    v-model="data.departureDescription" readonly />
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