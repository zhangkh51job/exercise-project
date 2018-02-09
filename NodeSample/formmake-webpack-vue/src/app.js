/**
 * Created by yangjie on 2018/1/30.
 */
import Vue from 'vue'
import Vuex from 'vuex'
//import VueRouter from 'vue-router'
import store from './store/index'
import App from './App.vue'
import {initData} from  './store/actions.js';

//Vue.use( VueRouter )

new Vue({
    el: '#app',
    render: h => h(App),
    store
});

$(document).on('mousedown', '.fx_flow_node', function(e){
    console.log('.. mousedown..');
})
setTimeout(initData, 1200, store);
