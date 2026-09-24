import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import { useAuth } from "@/composables/authComposable";

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to) => {
    const { isAuthenticated, isLoading, checkAuth } = useAuth();

    if (isLoading.value) {
        await checkAuth();
    }

    if (to.meta.requiresAuth && !isAuthenticated.value) {
        return { name: 'Login' };
    }
})

export default router;