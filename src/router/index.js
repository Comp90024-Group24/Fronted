import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import TwitterAll from '@/components/TwitterAll.vue'

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
        }
    ]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router