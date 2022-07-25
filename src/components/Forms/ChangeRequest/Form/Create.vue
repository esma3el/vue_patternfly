<script>
import VueMultiselect from "vue-multiselect";
import gql from "graphql-tag";
import VueUploadComponent from "vue-upload-component";
import FormTabs from "./FormTabs.vue";
import WorkFlow from "../Workflow/WorkFlow.vue";
import Stepper from '../../Stepper.vue'
import vueFilePond, { setOptions } from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "../../../../styles/vue-multiselect.css";

const FilePond = vueFilePond();

setOptions({
  server: {
    url: "http://localhost:8080/api/attachments",
  },
});

const LOAD_DATA = gql`
   query($id : String!){
  processes(where:{id:{_eq:$id}}){
    variables
  }
}
`;
const USER_TEMPLATE = gql`
    query ($user: String!,$type:String!) {
    template_create1(where: { user: { _eq: $user },_and:{type:{_eq:$type}} }) {
			template_name   
    }
  }
`;

const GET_TEMPLATE_DATA = gql`
  query ($user: String!, $type: String!,$template_name:String!) {
    template_create1(
      where: { user: { _eq: $user }, _and: { type: { _eq: $type },_and:{template_name:{_eq:$template_name}} } }
    ) {
      user
      template_name
      type
      template
    }
  }
`;
const SAVE_TEMPLATE1 = gql`
  mutation ($type: String!, $template: json!, $user: String!, $template_name : String!) {
    insert_template_create1_one(
      object: { type: $type, user: $user, template: $template ,template_name:$template_name }
    ) {
      template
    }
  }
`;
// const SAVE_TEMPLATE = gql`
//   mutation (
//     $title: String!
//     $affectedNEId: String!
//     $affectedNEType: String!
//     $affected_serviceID: String!
//     $change_category: String!
//     $change_intention: String!
//     $change_item: String!
//     $change_product: String!
//     $change_request_source: String!
//     $change_type: String!
//     $description: String!
//     $end_time_for_impact: String!
//     $implementer: String!
//     $planned_end_time: String!
//     $planned_start_time: String!
//     $priority: String!
//     $reason_for_change: String!
//     $region: String!
//     $source_ticket_id: String!
//     $test_result: String!
//     $start_time_for_impact: String!
//     $user: String!
//     $vendor: String!
//     $work_plan: String!
//   ) {
//     insert_template_create_one(
//       object: {
//         title: $title
//         affectedNEId: $affectedNEId
//         affectedNEType: $affectedNEType
//         affected_serviceID: $affected_serviceID
//         change_category: $change_category
//         change_intention: $change_intention
//         change_item: $change_item
//         change_product: $change_product
//         change_request_source: $change_request_source
//         change_type: $change_type
//         description: $description
//         end_time_for_impact: $end_time_for_impact
//         implementer: $implementer
//         planned_end_time: $planned_end_time
//         planned_start_time: $planned_start_time
//         priority: $priority
//         reason_for_change: $reason_for_change
//         region: $region
//         source_ticket_id: $source_ticket_id
//         test_result: $test_result
//         start_time_for_impact: $start_time_for_impact
//         user: $user
//         vendor: $vendor
//         work_plan: $work_plan
//       }
//     ) {
//       title
//     }
//   }
// `;
const GET_CHANGE_CATEGORY = gql`
  query {
    change_category {
      keycode
    }
  }
`;
const GET_REGION = gql`
  query {
    region {
      keycode
    }
  }
`;
const GET_CHANGE_TYPE = gql`
  query ($type: String!) {
    change_type(where: { change_category: { keycode: { _eq: $type } } }) {
      keycode
    }
  }
`;

const GET_CHANGE_ITEM = gql`
  query ($type: String!) {
    change_item(where: { change_type: { keycode: { _eq: $type } } }) {
      keycode
    }
  }
`;

const GET_PRIORITY = gql`
  query {
    change_priority {
      keycode
    }
  }
`;

const SEARCH_QUERY = gql`
  query {
    region {
      region_id_text
    }
  }
`;

const GET_AFFECTED_SERVICE = gql`
  query {
    affected_service {
      keycode
    }
  }
`;
const GET_AFFECTED_NE_TYPE = gql`
  query {
    affected_ne_type {
      keycode
    }
  }
`;

const GET_PORDUCT_ID = gql`
  query {
    change_product {
      keycode
    }
  }
`;

export default {
  name: "Create",
  components: { VueMultiselect, VueUploadComponent, FilePond ,FormTabs,WorkFlow,Stepper},
  data() {
    return {      
      template_name:"",
      open1: false,
      f: "",
      files: [],
      selected: [],
      options: [],
      selectedTemplate:"",
      isLoading: false,
      token: this.$store.state._keycloak.token,
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
        affectedNEType: [],
        affectedNEId: "",
        priority: "",
        vendorId: "",
        region: "",
        startTimeForImpact: "",
        endTimeForImpact: "",
        affectedServiceId: [],
        plannedEndTime: "",
        plannedStartTime: "",
        workPlan: "",
        testResult: "",
        changeDescription: "",
        implementer: "",
        implementers: "",
        owner: this.$store.state.userinfo.username,
        owners: this.$store.state.userinfo.username,
      },
      attachments:[],
      changeCategorydata: [],
      changeTypedata: [],
      changeitemdata: [],
      regiondata: [],
      prioritydata: [],
      affectedservicedata: [],
      affectedNETypeydata: [],
      user_templates: [],
      productservicedata: [],
      loaded_template_data: [],
    };
  },
  mounted() {},
  computed: {
    check() {
      return (this.err = this.data.region && "pf-m-success");
    },
    useroptions() {
      return this.region.map((row) => row.region_id_text);
    },
  },
  methods: {
    handleProcessFile: function (error, file) {                  
      if(!error){
      const f = JSON.parse(file.serverId)
      this.attachments.push(f)
      console.log(this.attachments)
      }
    },

    load_template(search) {
      console.log(search)
      this.data.affectedServiceId = [];
      this.data.affectedNEType = [];
      this.$apolloProvider.defaultClient
        .query({
          query: GET_TEMPLATE_DATA,
          variables: {
            user: this.$store.state.userinfo.username,
            type: "changeRequest",
            template_name: search
          },
        })
        .then((res) =>
          this.data = {...res.data.template_create1[0]?.template})
    },
    save_template_func() {
      this.$apolloProvider.defaultClient
        .mutate({
          mutation: SAVE_TEMPLATE1,
          variables: {
            user: this.$store.state.userinfo.username,
            type: "changeRequest",
            template_name: this.template_name,
            template: this.data
          },
        })
        .then((res) => {
          setTimeout(() => {            
            this.open1 = !this.open1;
          }, 1000);
          this.Notification(
            "info",
            "Saved Successfuly",
            `Template Saved Successfuly.`
          );
        })
        .catch((err) => {
          console.log(err)
          this.Notification(
            "danger",
            `${err}`,
            `Unknown error , ${new Date().toLocaleString()}.`
          );
        });
    },
    get_user_template() {
      this.$apolloProvider.defaultClient
        .query({
          query: USER_TEMPLATE,
          variables: {
            user: this.$store.state.userinfo.username,
            type: "changeRequest"
          },
        })
        .then((res) => {
          this.user_templates = res.data.template_create1.map(
            (row) => row.template_name
          );
        });
    },
    clear1() {
      this.changeTypedata = [];
      this.changeitemdata = [];
      this.data.changeType = "";
      this.data.changeItem = "";
    },
    clear2() {
      this.changeitemdata = [];
      this.data.changeItem = "";
    },
    getaffectedservicedata() {
      this.$apolloProvider.defaultClient
        .query({
          query: GET_AFFECTED_SERVICE,
        })
        .then(
          (res) =>
            (this.affectedservicedata = res.data.affected_service.map(
              (res) => res.keycode
            ))
        );
    },
    getprioritydata() {
      this.$apolloProvider.defaultClient
        .query({
          query: GET_PRIORITY,
        })
        .then(
          (res) =>
            (this.prioritydata = res.data.change_priority.map(
              (res) => res.keycode
            ))
        );
    },
    getproductservicedata() {
      this.$apolloProvider.defaultClient
        .query({
          query: GET_PORDUCT_ID,
        })
        .then(
          (res) =>
            (this.productservicedata = res.data.change_product.map(
              (res) => res.keycode
            ))
        );
    },
    getaffectedNETypedata() {
      this.$apolloProvider.defaultClient
        .query({
          query: GET_AFFECTED_NE_TYPE,
        })
        .then(
          (res) =>
            (this.affectedNETypeydata = res.data.affected_ne_type.map(
              (res) => res.keycode
            ))
        );
    },
    getregiondata() {
      this.$apolloProvider.defaultClient
        .query({
          query: GET_REGION,
        })
        .then(
          (res) => (this.regiondata = res.data.region.map((res) => res.keycode))
        );
    },
    getchangeitemdata() {
      this.$apolloProvider.defaultClient
        .query({
          query: GET_CHANGE_ITEM,
          variables: { type: this.data.changeType },
        })
        .then(
          (res) =>
            (this.changeitemdata = res.data.change_item.map(
              (row) => row.keycode
            ))
        );
    },
    getchangetypedata() {
      this.$apolloProvider.defaultClient
        .query({
          query: GET_CHANGE_TYPE,
          variables: { type: this.data.changeCategory },
        })
        .then(
          (res) =>
            (this.changeTypedata = res.data.change_type.map(
              (row) => row.keycode
            ))
        );
    },
    getchangeCategorydata() {
      this.$apolloProvider.defaultClient
        .query({
          query: GET_CHANGE_CATEGORY,
        })
        .then(
          (res) =>
            (this.changeCategorydata = res.data.change_category.map(
              (row) => row.keycode
            ))
        );
    },
    async upload() {
      let formData = new FormData();
      this.files.map((file) => {
        formData.append(file.name, file);
      });

      const req = await fetch(
        "http://localhost:8080/api/attachments",
        // "http://localhost:5000",
        {
          method: "POST",
          contentType: false,
          processData: false,
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data;",
            "Access-Control-Allow-Methods": "*",
          },
        }
      );
      const res = await req.json();
      this.attachments.push(JSON.parse(res.serverId));
    },
    del_item(e) {
      this.files = this.files.filter((name) => name != e);
    },
    async submitData() {
      this.$store.commit('toggle_spinner');      
      try{
      this.data.affectedServiceId = this.data.affectedServiceId.join(",") || null;
      
      this.data.implementer = this.data.implementer.join(",") || null;
      this.data.affectedNEType = this.data.affectedNEType.join(",") || null;
      }
      catch{}

      const req = await fetch("http://localhost:8080/api/changeRequests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
        method: "POST",
        body: JSON.stringify({ data: this.data ,attachments: this.attachments}),
      })
      if(req.ok){
          this.Notification(
            "success",
            `status ${req.status}`,
            `Saved Successfuly ${new Date().toLocaleString()}.`
          )
        }
        else{          
          this.Notification(
            "danger",
            `status:${req.status}`,
            `${req.statusText} ${new Date().toLocaleString()}.`
          );
        };
        console.log(req);
        this.$store.commit('toggle_spinner')
    },
    async Notification(variant = "", title = "", msg = "") {
      this.$store.commit("setNotifications", {
        variant: variant,
        title: title,
        msg: msg,
      });
      if (variant != "danger") {
        setTimeout(() => {
          this.$store.commit("delNotifications");
        }, 6000);
        // setTimeout(() => {
        //   this.$router.push("/");
        // }, 800);
      }
    },
    clear_alarm() {
      this.$store.commit("delNotifications");
    },
  },
  apollo: {
    region: {
      query: SEARCH_QUERY,
    },
    processes:{
      query: LOAD_DATA,
      variables(){
        return{
          id: this.$route.params.id
        }
      },
      update(data){
        console.log(data.processes[0]?.variables)
        this.data = {...data.processes[0]?.variables}
        this.data.plannedEndTime = this.data.plannedEndTime.substring(0,16)
        this.data.plannedStartTime = this.data.plannedStartTime.substring(0,16)
        this.data.startTimeForImpact = this.data.startTimeForImpact.substring(0,16)
        this.data.endTimeForImpact = this.data.endTimeForImpact.substring(0,16)
        this.data.implementer = this.data.implementer.split(',')
        this.data.affectedServiceId = this.data.affectedServiceId.split(',')
        this.data.affectedNEType = this.data.affectedNEType.split(',')
      }
    }
  },
};
</script>

<template>        
  <div class="pf-l-grid pf-m-gutter">
    <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-12-col-on-xl">
      <pf-card>
        <pf-card-body>
           <Stepper />     
          </pf-card-body>
      </pf-card>
    </div>      
    <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-6-col-on-xl">
      <pf-card>        
        <pf-card-title>Create Change Request Ticket</pf-card-title>
        <pf-divider />
        <pf-spinner v-if="$apollo.loading" size="lg" />
        <pf-card-body v-else>        
          <pf-form @submit.prevent="submitData" class="pf-l-grid">          
            <!-- <div
              class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-8-col-on-xl"
            ></div> -->
            <!-- <div
              class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
            >
              <pf-form-group>
                <div class="pf-c-form__group-label">
                  <label class="pf-c-form__label" for="user_template">
                    <span class="pf-c-form__label-text">Template</span>
                  </label>
                </div>
                <div class="pf-c-form__group-control">
                  <VueMultiselect
                    :multiple="false"
                    :options="user_templates"
                    id="ajax"
                    @click="get_user_template"
                    @select="load_template"
                    :show-labels="false"
                  >
                  </VueMultiselect>
                  
                </div>
              </pf-form-group>
            </div> -->
            <!-- <pf-divider /> -->

            <!-- Row 1 -->
            <!-- Title -->
            <div
              class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
            >
              <pf-form-group label="Title" required field-id="form-title-group">
                <pf-text-input
                  id="form-title-input"
                  name="Title"
                  required
                  v-model="data.ticketTitle"
                />
              </pf-form-group>
            </div>
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
                ></div>
                <pf-divider />
            <!-- Row 2 -->            
                <!-- Change Request Source -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
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
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
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
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
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

                <!-- Row 3 -->
                <!-- changeCategory -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group>
                    <div class="pf-c-form__group-label">
                      <label class="pf-c-form__label" for="Change Category">
                        <span class="pf-c-form__label-text"
                          >Change Category</span
                        >
                      </label>
                    </div>
                    <div class="pf-c-form__group-control">
                      <VueMultiselect
                        v-model="data.changeCategory"
                        :multiple="false"
                        :options="changeCategorydata"
                        id="ajax"
                        @click="getchangeCategorydata"
                        @select="clear1"
                        :show-labels="false"
                      >
                      </VueMultiselect>
                    </div>
                  </pf-form-group>
                </div>
                <!-- Change Type -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group>
                    <div class="pf-c-form__group-label">
                      <label class="pf-c-form__label" for="Change Category">
                        <span class="pf-c-form__label-text">Change Type</span>
                      </label>
                    </div>
                    <div class="pf-c-form__group-control">
                      <VueMultiselect
                        v-model="data.changeType"
                        :multiple="false"
                        :options="changeTypedata"
                        id="ajax"
                        @click="getchangetypedata"
                        @select="clear2"
                        :show-labels="false"
                      >
                      </VueMultiselect>
                    </div>
                  </pf-form-group>
                </div>
                <!-- changeItem -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group>
                    <div class="pf-c-form__group-label">
                      <label class="pf-c-form__label" for="Change item">
                        <span class="pf-c-form__label-text">Change Item</span>
                      </label>
                    </div>
                    <div class="pf-c-form__group-control">
                      <VueMultiselect
                        v-model="data.changeItem"
                        :multiple="false"
                        :options="changeitemdata"
                        id="ajax"
                        @click="getchangeitemdata"
                        @select="clear2"
                        :allowEmpty="false"
                        :show-labels="false"
                      >
                      </VueMultiselect>
                    </div>
                  </pf-form-group>
                </div>
                <pf-divider />
                <!-- changeReason -->
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-8-col-on-xl"
                >
                  <pf-form-group
                    label="Reason for Change"
                    required
                    field-id="changeReason"
                  >
                    <pf-text-area
                      id="changeReason_input"
                      name="changeReason"
                      required
                      v-model="data.changeReason"
                    />
                    <pf-textarea />
                  </pf-form-group>
                </div>
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                ></div>
                <pf-divider />
                <!-- Row 5 -->
                <!-- change product(productId) -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group
                    label="Change Product"
                    required
                    field-id="productId"
                  >
                    <VueMultiselect
                      v-model="data.productId"
                      :multiple="false"
                      :options="productservicedata"
                      id="ajax"
                      @click="getproductservicedata"
                      :show-labels="false"
                    >
                    </VueMultiselect>
                  </pf-form-group>
                </div>
                <!-- affectedNEType -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group
                    label="AffectedNEType"
                    field-id="affectedNEType"
                  >
                    <VueMultiselect
                      v-model="data.affectedNEType"
                      :multiple="true"
                      :options="affectedNETypeydata"
                      id="ajax"
                      @click="getaffectedNETypedata"
                      :closeOnSelect="false"
                      :show-labels="false"
                    >
                    </VueMultiselect>
                  </pf-form-group>
                </div>
                <!-- affectedNEId -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group label="AffectedNEId" field-id="affectedNEId">
                    <pf-text-input
                      id="affectedNEId_input"
                      name="affectedNEId"
                      v-model="data.affectedNEId"
                    />
                  </pf-form-group>
                </div>
                <!-- Row 6 -->
                <!--  -->
                <!-- priority -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group>
                    <div class="pf-c-form__group-label">
                      <label class="pf-c-form__label" for="Change Category">
                        <span class="pf-c-form__label-text">Priority</span>
                      </label>
                    </div>
                    <div class="pf-c-form__group-control">
                      <VueMultiselect
                        v-model="data.priority"
                        :multiple="false"
                        :options="prioritydata"
                        id="ajax"
                        @click="getprioritydata"
                        :show-labels="false"
                      >
                      </VueMultiselect>
                    </div>
                  </pf-form-group>
                </div>
                <!-- vendorId -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
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
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group>
                    <div class="pf-c-form__group-label">
                      <label class="pf-c-form__label" for="Change Category">
                        <span class="pf-c-form__label-text">Region</span>
                      </label>
                    </div>
                    <div class="pf-c-form__group-control">
                      <VueMultiselect
                        v-model="data.region"
                        :multiple="false"
                        :options="regiondata"
                        id="ajax"
                        @click="getregiondata"
                        :show-labels="false"
                      >
                      </VueMultiselect>
                    </div>
                  </pf-form-group>
                </div>
                <pf-divider />
                <!--startTimeForImpact-->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group
                    label="Affected ServiceID"
                    field-id="affectedserviceid"
                  >
                    <VueMultiselect
                      v-model="data.affectedServiceId"
                      :multiple="true"
                      :options="affectedservicedata"
                      id="ajax"
                      @click="getaffectedservicedata"
                      :closeOnSelect="false"
                      :show-labels="false"
                    >
                    </VueMultiselect>
                  </pf-form-group>
                </div>
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
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
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
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
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
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
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
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

                <!-- Row 8 -->              

            <!-- Row 9 -->            
                <!--  -->
                <pf-divider />
                <div class="pf-l-grid">
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
                >
                  <pf-form-group label="Work Plan" field-id="workPlan">
                    <pf-textarea
                      id="workPlan_input"
                      name="workPlan"
                      v-model="data.workPlan"
                    />
                  </pf-form-group>
                </div>

                <!--  -->
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
                >
                  <pf-form-group label="Test Result" field-id="testResult">
                    <pf-textarea
                      id="testResult_input"
                      name="testResult"
                      v-model="data.testResult"
                    />
                  </pf-form-group>
                </div>
                <!--  -->
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-6-col-on-xl"
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
                <!-- Row 11 -->
                <!--  -->
                <pf-divider />
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                >
                  <pf-form-group label="implementer" field-id="implementer">
                    <VueMultiselect
                      v-model="data.implementer"
                      :multiple="true"
                      :options="useroptions"
                      id="ajax"
                      :searchable="true"
                      :loading="isLoading"
                      @search-change="searchfunc"
                      :closeOnSelect="false"
                      :show-labels="false"
                    >
                    </VueMultiselect>
                  </pf-form-group>
                </div>
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
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
                <!--  -->
                <div
                  class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-4-col-on-xl"
                ></div>
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
                </div>                         
            <div
              class="pf-l-grid__item pf-m-4-col pf-m-12-col-on-md pf-m-12-col-on-xl"
            >
              <pf-action-group>
                <pf-button block type="submit" variant="primary">Submit</pf-button>
                  <pf-button @click="$router.go(-1)" block variant="tertiary">Cancel</pf-button>
              </pf-action-group>
            </div>
          </pf-form>
        </pf-card-body>
      </pf-card>
    </div>
    <div class="pf-l-grid__item pf-m-12-col pf-m-12-col-on-md pf-m-6-col-on-xl">
      <div class="side">
        <pf-card>
          <pf-card-body>
            <pf-tabs>
              <pf-tab title="Ticket Information">
                <br />
                <form-tabs :ticketid="$route.params.id" />
              </pf-tab>
              <pf-tab title="WorkFlow Details">
                <br />
                <WorkFlow :ticketid="$route.params.id" />
              </pf-tab>
            </pf-tabs>
          </pf-card-body>
        </pf-card>
      </div>
    </div>
                </div>

</template>

<style>
.multiselect__tag {
  background: #444548;
}
</style>
