import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [


        {
            path: '/index',
            name: 'index',
            components: {
                default: () => import('../pages/index/index'),
            }
        },




    ]
})

export default router;
