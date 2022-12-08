import {createRouter, createWebHistory} from 'vue-router'
import {defineAsyncComponent} from 'vue'

const router = createRouter({
    history: createWebHistory(),  // history 模式
    routes: [
        {
            path: '/',
            name: 'login',
            component: defineAsyncComponent(() => import(`../components/Login/index`)),
            meta: {
                title: '登录',
            },
        },
        {
            path: '/live',
            name: 'live',
            component: defineAsyncComponent(() => import(`../components/Live/index`)),
            meta: {
                title: '直播',
            },
        },
        {
            path: '/chat',
            name: 'chat',
            component: defineAsyncComponent(() => import(`../components/Chat/index`)),
            meta: {
                title: '聊天',
            },
        },
        {
            path: '/*',
            redirect: '/',
        },
    ]
})

export default router