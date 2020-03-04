import Vue from "vue";
import VueRouter from "vue-router";
import GuidePage from "../views/GuidePage.vue";
import MyPage from "../views/MyPage.vue";
import MyMenu from "../views/MyMenu.vue";
import MyMenus from "../views/MyMenus.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/guide",
    name: "guide",
    component: GuidePage
  },
  {
    path: "/",
    name: "mypage",
    component: MyPage
  },
  {
    path: "/menu",
    name: "menu",
    component: MyMenu
  },
  {
    path: "/menus",
    name: "menus",
    component: MyMenus
  }
];

const router = new VueRouter({
  routes
});

export default router;
