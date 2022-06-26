import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/changerequest/create",
    name: "create_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Create.vue'),
  },
  {
    path: "/changerequest/:id",
    name: "home_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Home.vue'),
  },
  {
    path: "/changerequest/:id/handle/:taskid",
    name: "handle_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Handle.vue'),
  },
  {
    path: "/changerequest/:id/analyze/:taskid",
    name: "analyze_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Analyze.vue'),
  },
  {
    path: "/changerequest/:id/manager/:taskid",
    name: "manager_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Manager.vue'),
  },
  {
    path: "/changerequest/:id/cab/:taskid",
    name: "cab_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Cab.vue'),
  },
  {
    path: "/changerequest/:id/customer/:taskid",
    name: "customer_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Customer.vue'),
  },
  {
    path: "/changerequest/:id/update/:taskid",
    name: "update_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Update.vue'),
  },
  {
    path: "/changerequest/:id/implement/:taskid",
    name: "implement_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Implement.vue'),
  },
  {
    path: "/changerequest/:id/confirm/:taskid",
    name: "confirm_cr",
    component: ()=> import('../components/Forms/ChangeRequest/Form/Confirm.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;