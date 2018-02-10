import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
//import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const state = {
  nodes: {
    /*100: {
      widgetname:'fdsafds',
      left:'100px',
      top:'200px'/!*,
       'z-index'*!/
    }*/
  },
  paths: {
    /*7:{
      'start-anchor':'r',
      'startX':'272',
      'startY':'128',
      'attachStartId':'widget1517975779525_r',
      'end-anchor':'l',
      'attachEndId':'widget1517975780509_l',
      'endX':'477',
      'endY':'255',
      'pathStr':'M272, 128L374.5, 128L374.5, 255L477, 255'
    }*/
  },
  node2paths:{

  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== 'production'
      ? [/*createLogger()*/]
      : []
})
