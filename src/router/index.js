import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/IndexView.vue"),
  },
  {
    path: "/character:id",
    name: "character",
    component: () => import("@/views/CharacterView.vue"),
  },
  {
    path: "/episode:id",
    name: "episode",
    component: () => import("@/views/EpisodeView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
