import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [


        {
            path: '/',
            name: 'index',
            components: {
                default: () => import('../pages/index/index'),
            }
        },
        {
            path: '/translate',
            name: 'translate',
            components: {
                default: () => import('../pages/translate/index'),
            }
        },




    ]
})

export default router;
