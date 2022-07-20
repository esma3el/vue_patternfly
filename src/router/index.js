import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import ProcessedByMe from "../views/ProcessedByMe.vue";
import About from "../views/About.vue";
// import store from "../store/store.js";

// store.commit('set_keycloak')
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/processed-by-me",
    name: "ProcessedByMe",
    component: ProcessedByMe,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/changeRequests/create",
    name: "create_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Create.vue'),
  },
  {
    path: "/changeRequests/:id",
    name: "home_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Index.vue'),
  },
  {
    path: "/changeRequests/:id/handle/:taskid",
    name: "handle_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Handle.vue'),
  },
  {
    path: "/changeRequests/:id/analyze/:taskid",
    name: "analyze_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Analyze.vue'),
  },
  {
    path: "/changeRequests/:id/managerApprove/:taskid",
    name: "manager_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Manager.vue'),
  },
  {
    path: "/changeRequests/:id/cabApprove/:taskid",
    name: "cab_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Cab.vue'),
  },
  {
    path: "/changeRequests/:id/customerApprove/:taskid",
    name: "customer_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Customer.vue'),
  },
  {
    path: "/changeRequests/:id/updatePlan/:taskid",
    name: "update_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Update.vue'),
  },
  {
    path: "/changeRequests/:id/implement/:taskid",
    name: "implement_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Implement.vue'),
  },
  {
    path: "/changeRequests/:id/confirm/:taskid",
    name: "confirm_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Confirm.vue'),
  },
  {
    path: "/incidents/create",
    name: "new_incident",
    component: ()=> import('../components/Forms/Incident/CreateNew.vue'),
  },
  {
    path: "/incidents/:id",
    name: "index_incident",
    component: ()=> import('../components/Forms/Incident/Index.vue'),
  },
  {
    path: "/incidents/:id/create/:taskid",
    name: "create_incident",
    component: ()=> import('../components/Forms/Incident/Form/Create.vue'),
  },
  {
    path: "/incidents/:id/review/:taskid",
    name: "review_incident",
    component: ()=> import('../components/Forms/Incident/Form/Review.vue'),
  },
  {
    path: "/incidents/:id/handle/:taskid",
    name: "handle_incident",
    component: ()=> import('../components/Forms/Incident/Form/Handle.vue'),
  },
  {
    path: "/incidents/:id/process/:taskid",
    name: "process_incident",
    component: ()=> import('../components/Forms/Incident/Form/Process.vue'),
  },
  {
    path: "/incidents/:id/confirm/:taskid",
    name: "confirm_incident",
    component: ()=> import('../components/Forms/Incident/Form/Confirm.vue'),
  },
  {
    path: "/workOrders/create",
    name: "new_work_order",
    component: ()=> import('../components/Forms/WorkOrder/CreateNew.vue'),
  },
  {
    path: "/workOrders/:id",
    name: "index_work_order",
    component: ()=> import('../components/Forms/WorkOrder/Index.vue'),
  },
  {
    path: "/workOrders/:id/create/:taskid",
    name: "create_work_order",
    component: ()=> import('../components/Forms/WorkOrder/Form/Create.vue'),
  },
  {
    path: "/workOrders/:id/dispatch/:taskid",
    name: "dispatch_work_order",
    component: ()=> import('../components/Forms/WorkOrder/Form/Dispatch.vue'),
  },
  {
    path: "/workOrders/:id/handle/:taskid",
    name: "handle_work_order",
    component: ()=> import('../components/Forms/WorkOrder/Form/Handle.vue'),
  },
  {
    path: "/workOrders/:id/departure/:taskid",
    name: "departure_work_order",
    component: ()=> import('../components/Forms/WorkOrder/Form/Departure.vue'),
  },
  {
    path: "/workOrders/:id/enter/:taskid",
    name: "enter_work_order",
    component: ()=> import('../components/Forms/WorkOrder/Form/Enter.vue'),
  },
  {
    path: "/workOrders/:id/process/:taskid",
    name: "process_work_order",
    component: ()=> import('../components/Forms/WorkOrder/Form/Process.vue'),
  },
  {
    path: "/fieldSupport/create",
    name: "new_field_support",
    component: ()=> import('../components/Forms/FieldSupport/CreateNew.vue'),
  },
  {
    path: "/fieldSupport/:id",
    name: "index_field_support",
    component: ()=> import('../components/Forms/FieldSupport/Index.vue'),
  },
  {
    path: "/fieldSupport/:id/create/:taskid",
    name: "create_field_support",
    component: ()=> import('../components/Forms/FieldSupport/Form/Create.vue'),
  },
  {
    path: "/fieldSupport/:id/review/:taskid",
    name: "review_field_support",
    component: ()=> import('../components/Forms/FieldSupport/Form/Review.vue'),
  },
  {
    path: "/fieldSupport/:id/handle/:taskid",
    name: "handle_field_support",
    component: ()=> import('../components/Forms/FieldSupport/Form/Handle.vue'),
  },
  {
    path: "/fieldSupport/:id/assign/:taskid",
    name: "assign_field_support",
    component: ()=> import('../components/Forms/FieldSupport/Form/Assign.vue'),
  },
  {
    path: "/fieldSupport/:id/boProcess/:taskid",
    name: "bo_process_field_support",
    component: ()=> import('../components/Forms/FieldSupport/Form/ProcessBO.vue'),
  },
  {
    path: "/fieldSupport/:id/process/:taskid",
    name: "process_field_support",
    component: ()=> import('../components/Forms/FieldSupport/Form/Process.vue'),
  },
  {
    path: "/fieldSupport/:id/confirm/:taskid",
    name: "confirm_field_support",
    component: ()=> import('../components/Forms/FieldSupport/Form/Confirm.vue'),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: ()=> import('../views/Dashboard.vue'),
  },
  {
    path: "/pendingformygroup",
    name: "pendingformygroup",
    component: ()=> import('../views/pendingformygroup.vue'),
  },
  {
    path: "/search",
    name: "search",
    component: ()=> import('../views/Search.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



  
// router.afterEach((to, from, next) => {
//   setTimeout(()=>{
//   store.state._keycloak.updateToken(70).then((refreshed) => {
//     if (refreshed) {
//       Vue.$log.info('Token refreshed' + refreshed);
//     } else {
//       Vue.$log.warn('Token not refreshed, valid for '
//         + Math.round(store.state._keycloak.tokenParsed.exp + store.state._keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
//     }
//   }).catch(() => {
//     Vue.$log.error('Failed to refresh token');
//   });
// },100)
// })

export default router;