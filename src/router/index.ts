import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../layouts/BaseLayout.vue'),
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('../views/HomeView.vue'),
                    meta: {
                        layout: 'BaseLayout'
                    }
                },
                {
                    path: '/results',
                    name: 'results',
                    component: () => import('../views/ResultsView.vue')
                },
            ]
        },
        { 
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../layouts/NotFoundLayout.vue')
        },
    ]
})

export default router
