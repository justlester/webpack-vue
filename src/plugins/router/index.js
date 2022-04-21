import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/plugins/store'
import HomePage from '@/components/pages/HomePage.vue'

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'hash',
    routes: [{
        path: '/',
        component: HomePage
    }]
});


router.beforeEach((to,from,next)=>{
    store.commit('setLoadingRoute',true);
    if(!store.getters.isInitialized){
        console.log('initializing chassis...');
        store.dispatch('initialize')
        .catch(err=>{
            console.error('initializing error: ',err);
        }).finally(()=>{
            next()
        });
    }else next()
});

router.afterEach(()=>{
    store.commit('setLoadingRoute',false);
});

export default router;