import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import ProcessedByMe from "../views/ProcessedByMe.vue";
import About from "../views/About.vue";

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
    component: ()=> import('../components/Forms/ChangeRequest/Form/Home.vue'),
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

export default router;