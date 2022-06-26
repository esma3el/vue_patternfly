<script>
import VueMultiselect from "vue-multiselect";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import VueUploadComponent from "vue-upload-component";

const GET_CHANGE_CATEGORY = gql`
query {
  change_category {
    keycode
  }
}
`
const SEARCH_QUERY = gql`
  query {
    region {
      region_id_text
    }
  }
`;

export default {
  name: "Create",
  components: { VueMultiselect, FileUpload: VueUploadComponent },
  data() {
    return {
      files: [],
      selected: [],
      options: [],
      isLoading: false,
      token: window.localStorage.getItem("token"),
      err: "",
      data: {
        ticketTitle: "",
        changeSource: "",
        sourceTicketId: "",
        changeIntention: "",
        changeCategory: "",
        changeType: "",
        changeItem: "",
        changeReason: "",
        productId: "",
        affectedNEType: "",
        affectedNEId: "",
        priority: "",
        vendorId: "",
        region: "",
        startTimeForImpact: "",
        endTimeForImpact: "",
        affectedServiceId: "",
        plannedEndTime: "",
        plannedStartTime: "",
        workPlan: "",
        testResult: "",
        changeDescription: "",
        implementer: "",
        implementers: "",
        owner: "hsm",
        owners: "hsm",
      },      
      test:[]
    };
  },mounted(){    
                           
  },
  computed: {
    
    check() {
      return (this.err = this.data.region && "pf-m-success");
    },
    useroptions() {
      return this.region.map((row) => row.region_id_text);
    },
  },
  methods: {
    test1(){
      this.$apolloProvider.defaultClient.query({        
          query:GET_CHANGE_CATEGORY          
      }).then(res => this.test = res.data.change_category.map(row=> row.keycode)); 
    },
    async upload() {
      let formData = new FormData();
      this.files.map((file) => {
        formData.append(file.name, file);
      });
      const req = await fetch(
        "http://172.29.2.97:8080/api/attachments",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + this.token,
          },
        },
      );
      const res = await req.json();
      console.log(res);
    },
    del_item(e) {
      this.files = this.files.filter((name) => name != e);
    },
    async submitData() {
      console.log(JSON.stringify({ data: this.data }));
      const req = fetch("http://172.29.2.97:8080/api/changeRequests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
        method: "POST",
        body: JSON.stringify({ data: this.data }),
      })
        .then((data) => console.log(data))
        .error((err) => console.log(err));
    },
  },
  apollo: {
    region: {
      query: SEARCH_QUERY,
    },
  },
};
</script>

<template>
  <pf-form
    @submit.prevent="submitData"
    class="pf-l-grid"
    v-if="$apollo.loading"
  >
    ...loading
  </pf-form>
  <pf-form @submit.prevent="submitData" class="pf-l-grid" v-else>
    <div class="pf-l-grid">
      <!-- Row 1 -->
      <!-- Title -->            
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl">
        <pf-form-group label="Title" required field-id="form-title-group">
          <pf-text-input
            id="form-title-input"
            name="Title"
            required
            v-model="data.ticketTitle"
          />
        </pf-form-group>
      </div>
    </div>
    <!-- Row 2 -->
    <pf-card>
      <pf-card-title>Change Information</pf-card-title>
      <pf-card-body>
        <div class="pf-l-grid">
          <!-- Change Request Source -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Change Request Source"
              field-id="change-request-source-group"
            >
              <pf-text-input
                id="change-request-source-input"
                name="Change Request Source"
                v-model="data.changeSource"
              />
            </pf-form-group>
          </div>
          <!-- sourceTicketId -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Source Ticket ID"
              field-id="sourceTicketId_group"
            >
              <pf-text-input
                id="source_ticket_input"
                name="sourceTicketId"
                v-model="data.sourceTicketId"
              />
            </pf-form-group>
          </div>
          <!-- changeIntention -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Change Intention"
              field-id="changeIntention_group"
            >
              <pf-text-input
                id="changeIntention_input"
                name="changeIntention"
                v-model="data.changeIntention"
              />
            </pf-form-group>
          </div>
        </div>

        <!-- Row 3 -->
        <div class="pf-l-grid">
          <!-- changeCategory -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
          <pf-form-group>
            <div class="pf-c-form__group-label">
              <label class="pf-c-form__label" for="Change Category">
                <span class="pf-c-form__label-text">Change Category</span>
              </label>
            </div>
              <div class="pf-c-form__group-control">
                <select
                  class="pf-c-form-control"
                  v-model="data.changeCategory"
                  required
                  :onblur="check"
                  name=""
                  id=""   
                  @click="test1"               
                  @change=""
                >
                  <option value="" disabled ></option>
                  <option value="" v-if="$apollo.loading">...loading</option>                                    
                  <option :value="item" v-else v-for="item in test">{{item}}</option>                  
                </select>
              </div>
            </pf-form-group>
          </div>
          <!-- Change Type -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Change Type" required field-id="changeType">
              <pf-text-input
                id="changeType_input"
                name="changeType"
                required
                v-model="data.changeType"
              />
            </pf-form-group>
          </div>
          <!-- changeItem -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Change Item" required field-id="changeItem">
              <pf-text-input
                id="changeItem_input"
                name="changeItem"
                required
                v-model="data.changeItem"
              />
            </pf-form-group>
          </div>
        </div>
        <!-- changeReason -->
        <div class="pf-l-grid">
          <!--  -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
          >
            <pf-form-group
              label="Reason for Change"
              required
              field-id="changeReason"
            >
              <pf-text-area
                id="changeReason_input"
                name="changeReason"
                v-model="data.changeReason"
              />
              <pf-textarea />
            </pf-form-group>
          </div>
        </div>
        <!-- Row 5 -->
        <div class="pf-l-grid">
          <!-- change product(productId) -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Change Product" required field-id="productId">
              <pf-text-input
                id="productId_input"
                name="productId"
                required
                v-model="data.productId"
              />
            </pf-form-group>
          </div>
          <!-- affectedNEType -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="AffectedNEType" field-id="affectedNEType">
              <pf-text-input
                id="affectedNEType_inout"
                name="affectedNEType"
                v-model="data.affectedNEType"
              />
            </pf-form-group>
          </div>
          <!-- affectedNEId -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="AffectedNEId" field-id="affectedNEId">
              <pf-text-input
                id="affectedNEId_input"
                name="affectedNEId"
                v-model="data.affectedNEId"
              />
            </pf-form-group>
          </div>
        </div>
        <!-- Row 6 -->
        <div class="pf-l-grid">
          <!--  -->
          <!-- priority -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Priority" required field-id="priority">
              <pf-text-input
                id="priority_input"
                name="priority"
                required
                v-model="data.priority"
              />
            </pf-form-group>
          </div>
          <!-- vendorId -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="Vendor" field-id="vendorId">
              <pf-text-input
                id="vendorId_input"
                name="vendorId"
                v-model="data.vendorId"
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group>
              <label class="pf-c-form__group-label" for="">Region</label>
              <div class="pf-c-form__group-control">
                <select
                  :class="err"
                  class="pf-c-form-control"
                  v-model="data.region"
                  required
                  :onblur="check"
                  name=""
                  id=""
                >
                  <option value="" disabled></option>
                  <option value="Kordofan">Kordofan</option>
                  <option value="Central">Central</option>
                  <option value="Eastern">Eastern</option>
                  <option value="Gadaref">Gadaref</option>
                  <option value="Khartoum">Khartoum</option>
                  <option value="Red Sea">Red Sea</option>
                  <option value="River Nile">River Nile</option>
                  <option value="Blue Nile">Blue Nile</option>
                  <option value="Other">Other</option>
                  <option value="Darfor">Darfor</option>
                  <option value="Kordofan">Kordofan</option>
                </select>
              </div>
            </pf-form-group>
            <!-- <pf-form-group label="Region" required field-id="region">
              <pf-text-input
                id="region_input"
                name="region"
                v-model="data.region"
                required
              />
            </pf-form-group> -->
          </div>
        </div>
        <!--startTimeForImpact-->
        <div class="pf-l-grid">
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Affected ServiceId"
              required
              field-id="affectedServiceId"
            >
              <pf-text-input
                id="affectedServiceId_input"
                name="affectedServiceId"
                required
                v-model="data.affectedServiceId"
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Start Time For Impact"
              required
              field-id="startTimeForImpact"
            >
              <pf-text-input
                type="datetime-local"
                id="startTimeForImpact_input"
                name="startTimeForImpact"
                required
                v-model="data.startTimeForImpact"
              />
            </pf-form-group>
          </div>

          <!-- endTimeForImpact -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="End Time For Impact"
              required
              field-id="endTimeForImpact"
            >
              <pf-text-input
                type="datetime-local"
                id="endTimeForImpact_input"
                name="endTimeForImpact"
                required
                v-model="data.endTimeForImpact"
              />
            </pf-form-group>
          </div>
          <!--  -->
        </div>
        <div class="pf-l-grid">
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Planned Start Time"
              required
              field-id="plannedStartTime"
            >
              <pf-text-input
                type="datetime-local"
                id="plannedStartTime_input"
                name="plannedStartTime"
                required
                v-model="data.plannedStartTime"
              />
            </pf-form-group>
          </div>
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group
              label="Planned End Time"
              required
              field-id="plannedEndTime"
            >
              <pf-text-input
                type="datetime-local"
                id="plannedEndTime_input"
                name="plannedEndTime"
                required
                v-model="data.plannedEndTime"
              />
            </pf-form-group>
          </div>

          <!-- ----------------------------------------------------------------------------------------------- -->
        </div>

        <!-- Row 8 -->
      </pf-card-body>
    </pf-card>

    <!-- Row 9 -->
    <pf-card>
      <pf-card-body>
        <div class="pf-l-grid">
          <!--  -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
          >
            <pf-form-group label="Work Plan" field-id="workPlan">
              <pf-textarea
                id="workPlan_input"
                name="workPlan"
                v-model="data.workPlan"
              />
            </pf-form-group>
          </div>
        </div>
      </pf-card-body>
    </pf-card>

    <!-- Row 10 -->
    <pf-card>
      <pf-card-body>
        <div class="pf-l-grid">
          <!--  -->
          <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            >
              <pf-form-group label="Test Result" field-id="testResult">
                <pf-textarea
                  id="testResult_input"
                  name="testResult"
                  v-model="data.testResult"
                />
              </pf-form-group>
            </div>
          </div>
          <!--  -->
          <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            >
              <pf-form-group
                label="Description"
                field-id="changeDescription_group"
              >
                <pf-textarea
                  id="changeDescription_input"
                  name="changeDescription"
                  v-model="data.changeDescription"
                />
              </pf-form-group>
            </div>
          </div>
          <!--  -->
          <div class="pf-l-grid">
            <!--  -->
            <div
              class="pf-l-grid__item pf-m-2-col pf-m-2-col-on-md pf-m-8-col-on-xl"
            >
              <pf-form-group
                label="Attachment"
                required
                field-id="simple-form-name-01"
              >
                <pf-text-area
                  id="simple-form-name-01"
                  name="simple-form-name-01"
                />
                <pf-button variant="secondary">
                  <file-upload
                    ref="upload"
                    v-model="files"
                    :multiple="true"
                    post-action="/post.method"
                    put-action="/put.method"
                    @input-file="inputFile"
                    @input-filter="inputFilter"
                  >
                    Attachment
                  </file-upload>
                </pf-button>
              </pf-form-group>
            </div>
          </div>
          <div class="pf-l-grid">
            <div
              class="pf-l-grid__item pf-m-2-col pf-m-2-col-on-md pf-m-8-col-on-xl"
            >
              <pf-chip-group v-for="file in files">
               <div class="pf-c-chip">
                <span class="pf-c-chip__text" id="chip_one">{{file.name}}</span>
                <button
                @click="del_item(file)"
                  class="pf-c-button pf-m-plain"
                  type="button"
                  aria-labelledby="remove_chip_one chip_one"
                  aria-label="Remove"
                  id="remove_chip_one"
                >
                  <i class="fas fa-times" aria-hidden="true"></i>
                </button>
              </div>
              </pf-chip-group>
              <br>
              <pf-button @click="upload"  variant="primary">Upload</pf-button>
             
            </div>
          </div>
        </div>
        <!-- Row 11 -->
        <div class="pf-l-grid"></div>
        <div class="pf-l-grid">
          <!--  -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl"
          >
            <pf-form-group label="implementers" field-id="implementers">
              <VueMultiselect
                v-model="selected"
                :multiple="true"
                :options="useroptions"
                id="ajax"
                :searchable="true"
                :loading="isLoading"
                @search-change="searchfunc"
              >
              </VueMultiselect>
            </pf-form-group>
          </div>
        </div>
        <div class="pf-l-grid">
          <!--  -->
          <div
            class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl"
          >
            <pf-form-group label="implementers" field-id="implementers">
              <pf-text-input
                id="implementers"
                name="implementers"
                v-model="data.implementers"
              />
            </pf-form-group>
          </div>
          <!--  -->
        </div>
      </pf-card-body>
    </pf-card>
    <div class="pf-l-grid">
      <div class="pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-4-col-on-xl">
        <pf-action-group>
          <pf-button type="submit" variant="primary">Submit</pf-button>
          <pf-button variant="link">Cancel</pf-button>
        </pf-action-group>
      </div>
    </div>
  </pf-form>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css">
.pf-l-grid {
  gap: 2em;
}
.multiselect__tag {
  background: #444548;
}
</style>
