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
                            <pf-form-group label="Title" field-id="title" required>
                                <pf-text-input id="title_input" name="title" required
                                    v-model="data.information.title"/>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Site ID" field-id="siteId" required>
                                <VueMultiselect v-model="data.faultAlarm.site.siteId"
                                  :options="siteOptions"
                                  id="site"
                                  :searchable="true"                
                                  @search-change="searchfunc">
                              </VueMultiselect>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Alarm Name" field-id="alarmName" required>
                                <pf-text-input id="alarmName_input" name="alarmName" required
                                    v-model="data.faultAlarm.alarmName"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="First Occur Time" field-id="firstOccurTime" required>
                                <pf-text-input type="datetime-local" id="firstOccurTime_input" name="firstOccurTime" required
                                    v-model="data.faultAlarm.firstOccurTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Fault Level" field-id="faultLevel" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.faultAlarm.faultLevel"                                     
                                        @click="getfaultlevels" >
                                        <option value="" v-if="$apollo.loading">...loading</option>                                    
                                        <option :value="item" v-else v-for="item in faultlevels">{{item}}</option>                  
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Domain" field-id="domain" required>
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.faultAlarm.domain"                                     
                                        @click="getdomains" >
                                        <pf-spinner v-if="$apollo.loading" size="lg" />                                    
                                        <option :value="item" v-else v-for="item in domains">{{item}}</option>                  
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Network Type" field-id="networkType">
                                <div class="pf-c-form__group-control">
                                    <select class="pf-c-form-control"
                                        v-model="data.faultAlarm.networkType"                                     
                                        @click="getnetworktypes" >
                                        <pf-spinner v-if="$apollo.loading" size="lg" />                                    
                                        <option :value="item" v-else v-for="item in networkTypes">{{item}}</option>                  
                                    </select>
                                </div>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Device ID" field-id="deviceId">
                                <pf-text-input id="deviceId_input" name="deviceId"
                                    v-model="data.faultAlarm.deviceId"/>
                            </pf-form-group>
                        </div>
                        <pf-divider />
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Incident Support Category" field-id="incidentSupportCategory" required>
                                <pf-text-input id="incidentSupportCategory_input" name="incidentSupportCategory" required
                                    v-model="data.supportRequest.incidentSupportCategory"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Support Request Category" field-id="supportRequestCategory" required>
                                <pf-text-input id="supportRequestCategory_input" name="supportRequestCategory" required
                                    v-model="data.supportRequest.supportRequestCategory"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Support Request Type" field-id="supportRequestType" required>
                                <pf-text-input id="supportRequestType_input" name="supportRequestType" required
                                    v-model="data.supportRequest.supportRequestType"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Support Request Item" field-id="supportRequestItem" required>
                                <pf-text-input id="supportRequestItem_input" name="supportRequestItem" required
                                    v-model="data.supportRequest.supportRequestItem"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Description" field-id="createDescription">
                                <pf-textarea id="createDescription_input" name="createDescription"
                                    v-model="data.createDescription" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="FM Reviewer" field-id="reviewer">
                                <pf-text-input id="reviewer_input" name="reviewer" 
                                    v-model="data.reviewer"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="FM Group" field-id="reviewers">
                                <pf-text-input id="reviewers_input" name="reviewers" 
                                    v-model="data.reviewers"/>
                            </pf-form-group>
                        </div>                    
                    </div>
                    
                </pf-form>
</template>