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
                            <pf-form-group label="Service Recovery Time" field-id="recoveryTime" required>
                                <pf-text-input type="datetime-local" id="recoveryTime_input" name="recoveryTime" required
                                    v-model="data.faultSolution.recoveryTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Service Interruption Time" field-id="interruptionTime" readonly>
                                <pf-text-input type="number" id="interruptionTime_input" name="interruptionTime" readonly
                                    v-model="data.faultSolution.interruptionTime"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
            <pf-form-group label="Root Cause Category" field-id="rootCauseCategory" required>
              <div class="pf-c-form__group-control">
                <select
                  class="pf-c-form-control"
                  v-model="data.faultSolution.rootCauseCategory"
                  required
                  name=""
                  id=""   
                  @click="getrootcausecategories"               
                >
                  <pf-spinner v-if="$apollo.loading" size="lg" />                                    
                  <option :value="item" v-else v-for="item in rootCauseCategories">{{item}}</option>                  
                </select>
              </div>
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
          >
              <pf-form-group label="Root Cause Type" field-id="rootCauseType" required>
              <div class="pf-c-form__group-control">
                <select
                  class="pf-c-form-control"
                  v-model="data.faultSolution.rootCauseType"
                  required
                  name=""
                  id=""   
                  @click="getrootcausetypes"               
                >
                  <pf-spinner v-if="$apollo.loading" size="lg" />                                    
                  <option :value="item" v-else v-for="item in rootCauseTypes">{{item}}</option>                  
                </select>
              </div>
            </pf-form-group>
          </div>
           <div
            class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
          >
                      <pf-form-group label="Root Cause Item" field-id="rootCauseItem" required>

              <div class="pf-c-form__group-control">
                <select
                required
                  class="pf-c-form-control"
                  v-model="data.faultSolution.rootCauseItem"                                    
                  name=""
                  id=""   
                  @click="getrootcauseitems"               
                >
                  <pf-spinner v-if="$apollo.loading" size="lg" />                                    
                  <option :value="item" v-else v-for="item in rootCauseItems">{{item}}</option>                  
                </select>
              </div>
            </pf-form-group>
          </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl">
                            <pf-form-group label="Root Cause Description" field-id="rootCauseDescription">
                                <pf-text-input id="rootCauseDescription_input" name="rootCauseDescription"
                                    v-model="data.faultSolution.rootCauseDescription"/>
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Reason Description" field-id="faultReasonDescription">
                                <pf-textarea id="faultReasonDescription_input" name="faultReasonDescription"
                                    v-model="data.faultSolution.faultReasonDescription" />
                            </pf-form-group>
                        </div>
                        <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
                            <pf-form-group label="Fault Solution Description" field-id="faultSolutionDescription">
                                <pf-textarea id="faultSolutionDescription_input" name="faultSolutionDescription"
                                    v-model="data.faultSolution.faultSolutionDescription" />
                            </pf-form-group>
                        </div>                                 
                </div>
 </pf-form>                 
</template>