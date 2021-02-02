import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
    state: {
        name: ''
    },
    mutations: {
        SET_NAME: (state, name) => {
            console.log(123);
            state.name = name
        }
    },
    actions: {
        "<ACTION_PREFIX><EVENT_NAME>"() {
            // do something
        }
    }
})