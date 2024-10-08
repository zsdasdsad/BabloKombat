import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainAuthPage from "../components/Auth/MainAuthPage.vue";
import GamePage from "../components/Game/GamePage.vue";
import LoginPage from "../components/Auth/LoginPage.vue";
import MainPage from "../components/MainPage.vue";

const routes: Array<RouteRecordRaw> = [
    {component: MainAuthPage, path: '/signup'},
    {component: GamePage, path: '/game'},
    {component: LoginPage, path: '/login'},
    {component: MainPage, path: '/'}
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

export default router