import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import TwitterAll from '@/components/TwitterAll.vue'
import TwitterJob from '@/components/TwitterJob.vue'
import SudoPage from '@/components/SudoPage.vue'
import MastodonH from '@/components/MastodonH.vue'

const routes = [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/view1',
            name: 'TwitterAll',
            component: TwitterAll
        },
        {
            path: '/view2',
            name: 'TwitterJob',
            component: TwitterJob
        },
        {
            path: '/view3',
            name: 'SudoPage',
            component: SudoPage
        },
        {
            path: '/view4',
            name: 'MastodonH',
            component: MastodonH
        }
    ]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router