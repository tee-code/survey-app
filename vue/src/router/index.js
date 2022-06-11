import { createRouter, createWebHistory } from "vue-router";

import Dashboard from '../views/Dashboard.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Survey from '../views/Survey.vue'
import store from "../store"


const routes = [{
        path: "/",
        redirect: "/dashboard",
        name: "DefaultLayout",
        component: DefaultLayout,
        meta: { authenticate: true },
        children: [{
                path: "/dashboard",
                name: "Dashboard",
                component: Dashboard
            },
            {
                path: "/surveys",
                name: "Survey",
                component: Survey
            },
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'AuthLayout',
        component: AuthLayout,
        meta: { isGuest: true },
        children: [{
                path: "/register",
                name: "Register",
                component: Register
            },
            {
                path: "/login",
                name: "Login",
                component: Login
            },
        ]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {

    const { authenticate, isGuest } = to.meta
    const { token } = store.state.user

    if (authenticate && !token) {
        next({ name: 'Login' });
    } else if (token && isGuest) {
        next({ name: 'Dashboard' })
    } else {
        next();
    }
});

export default router;