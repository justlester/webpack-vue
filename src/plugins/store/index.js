import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loadingRoute: false,
        initializing: false,
        isInitialized: false,
        userData: null
    },
    getters: {
        loadingRoute: state => state.loadingRoute,
        initializing: state => state.initializing,
        isInitialized: state => state.isInitialized,
        userData: state => state.userData || {}
    },
    mutations: {
        setLoadingRoute(state,value){
            state.loadingRoute = !!value;
        },
        setInitializing(state,value){
            state.initializing = !!value;
        },
        setIsInitialized(state,value){
            state.isInitialized = !!value;
        },
        setUserData(state,value){
            state.userData = value || null;
        }
    },
    actions: {
        initialize({commit,state}){
            return new Promise(async(resolve,reject)=>{
                try {
                    commit('setInitializing',true);
                    var user = { Id: 1, Name: 'test'};
                    commit('setUserData',user);
                    commit('setIsInitialized',true);
                    resolve();
                } catch (err) {
                    console.error(err);
                    reject(err);
                }finally{   
                    commit('setInitializing',false);
                }
            })
        }
    }

})