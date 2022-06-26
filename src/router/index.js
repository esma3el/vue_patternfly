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
    path: "/requests/create",
    name: "create_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Create.vue'),
  },
  {
    path: "/requests/:id",
    name: "home_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Home.vue'),
  },
  {
    path: "/requests/:id/handle/:taskid",
    name: "handle_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Handle.vue'),
  },
  {
    path: "/requests/:id/analyze/:taskid",
    name: "analyze_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Analyze.vue'),
  },
  {
    path: "/requests/:id/managerApprove/:taskid",
    name: "manager_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Manager.vue'),
  },
  {
    path: "/requests/:id/cabApprove/:taskid",
    name: "cab_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Cab.vue'),
  },
  {
    path: "/requests/:id/customerApprove/:taskid",
    name: "customer_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Customer.vue'),
  },
  {
    path: "/requests/:id/updatePlan/:taskid",
    name: "update_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Update.vue'),
  },
  {
    path: "/requests/:id/implement/:taskid",
    name: "implement_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Implement.vue'),
  },
  {
    path: "/requests/:id/confirm/:taskid",
    name: "confirm_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Confirm.vue'),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: ()=> import('../views/Dashboard.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;