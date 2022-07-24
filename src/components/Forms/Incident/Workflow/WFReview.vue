<script>
export default {
  name: "WFReview",
  data() {
    return {
      attachments:[],};
  },
  props: {
    data: Array,
  },
};
</script>

<template>
<pf-form @submit.prevent="submitData">
                    <div class="pf-l-grid wf-style">                  
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Title" field-id="title" >
                                <pf-text-input readonly id="title_input" name="title" 
                                    v-model="data.information.title"/>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Description" field-id="createDescription">
                                <pf-textarea readonly id="createDescription_input" name="createDescription"
                                    v-model="data.information.description" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Probable Cause" field-id="probableCause">
                                <pf-textarea readonly id="probableCause_input" name="probableCause"
                                    v-model="data.information.probableCause" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Initial Diagnosis?" field-id="initialDiagnosis">
                                <pf-textarea readonly id="initialDiagnosis_input" name="initialDiagnosis"
                                    v-model="data.information.initialDiagnosis" />
                            </pf-form-group>
                        </div>                        
                        <pf-divider />                        
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Site ID" field-id="siteId" >
                                <pf-text-input readonly id="emsId_input" name="siteId" 
                                    v-model="data.faultAlarm.site.siteId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="EMS ID" field-id="emsId" >
                                <pf-text-input readonly id="emsId_input" name="emsId" 
                                    v-model="data.faultAlarm.emsId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Alarm ID" field-id="alarmId">
                                <pf-text-input readonly id="alarmId_input" name="alarmId"
                                    v-model="data.faultAlarm.alarmId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Alarm Name" field-id="alarmName" >
                                <pf-text-input readonly id="alarmName_input" name="alarmName" 
                                    v-model="data.faultAlarm.alarmName"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Alarm Type" field-id="alarmType" >
                                <pf-text-input readonly id="alarmType_input" name="alarmType" 
                                    v-model="data.faultAlarm.alarmType"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="First Occur Time" field-id="firstOccurTime" >
                                <pf-text-input readonly type="text" id="firstOccurTime_input" name="firstOccurTime" 
                                    v-model="data.faultAlarm.firstOccurTime"/>
                            </pf-form-group>                            
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Last Occur Time" field-id="lastOccurTime">
                                <pf-text-input readonly type="text" id="lastOccurTime_input" name="lastOccurTime"
                                    v-model="data.faultAlarm.lastOccurTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Domain" field-id="domain">
                                <pf-text-input readonly type="text" id="domain_input" name="domain"
                                    v-model="data.faultAlarm.domain"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Network Type" field-id="networkType">
                                <pf-text-input readonly type="text" id="networkType_input" name="networkType"
                                    v-model="data.faultAlarm.networkType"/>
                            </pf-form-group>
                        </div>                                                
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Device ID" field-id="deviceId">
                                <pf-text-input readonly id="deviceId_input" name="deviceId"
                                    v-model="data.faultAlarm.deviceId"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Site Down?." field-id="siteDown">
                                <pf-text-input readonly id="faultNumber_input" name="siteDown"
                                    v-model="data.faultAlarm.siteDown"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Fault NO." field-id="faultNumber">
                                <pf-text-input readonly id="faultNumber_input" name="faultNumber"
                                    v-model="data.faultAlarm.faultNumber"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Fault Summary" field-id="faultSummary">
                                <pf-textarea readonly id="faultSummary_input" name="faultSummary"
                                    v-model="data.faultAlarm.faultSummary" />
                            </pf-form-group>
                        </div>              
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Assign to User" field-id="processor" >
                                <pf-text-input readonly id="processor_input" name="processor" 
                                    v-model="data.processor"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl">
                            <pf-form-group label="Assign to Group" field-id="processors" >
                                <pf-text-input readonly id="processors_input" name="processors" 
                                    v-model="data.processors"/>
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