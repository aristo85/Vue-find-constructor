import { createRouter, createWebHistory } from "vue-router";
import CoatchList from "./pages/CoatchList.vue";
import CoatchDetails from "./pages/CoatchDetails.vue";
import CoatchContact from "./pages/CoatchContact.vue";
import RegisterCoach from "./pages/RegisterCoach.vue";
import RequestList from "./pages/RequestList.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import store from "./store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coatches" },
    { path: "/coatches", name: "coatches", component: CoatchList },
    {
      path: "/coatches/:id",
      component: CoatchDetails,
      props: true,
      name: "coatch",
      children: [
        { path: "contact", name: "coatch-contact", component: CoatchContact },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: RegisterCoach,
      meta: { authNeed: true },
    },
    {
      path: "/requests",
      name: "requests",
      component: RequestList,
      meta: { authNeed: true },
    },
    {
      path: "/auth",
      name: "auth",
      component: UserAuth,
      meta: { onlyUnauth: true },
    },

    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  if (!store.getters.isAuth && to.meta.authNeed) {
    next("/auth");
  } else if (store.getters.isAuth && to.meta.onlyUnauth) {
    next("/coatches");
  } else {
    next();
  }
});

export default router;
