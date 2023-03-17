import {
    createRouter,
    createWebHistory
} from '@ionic/vue-router';
import TabsPage from '@/components/TabsLayout.vue';

const routes = [
    {
        path: '/',
        redirect: '/tabs/messages'
    },
    {
        path: '/signInAndSignUp',
        component: () => import('@/pages/SignInAndSignUp.vue'),
    },
    {
        path: '/tabs/',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/tabs/messages'
            },
            {
                path: 'messages',
                component: () => import('@/pages/Messages.vue')
            },
            {
                path: 'dashboards',
                component: () => import('@/pages/Dashboards.vue')
            },
            {
                path: 'screener',
                component: () => import('@/pages/Screener.vue')
            },
            {
                path: 'mine',
                component: () => import('@/pages/Mine.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
