import Vue from 'vue'
import * as types from './mutation-types'
import * as datas from './datas';

var nodeid = 0, pathid=0;
export default {
  [types.add_node_mutation](state, {}){

    var simulateData = [
      /*{'widgetname':"widget1517982170724", 'left': '144px', 'top': '107px', 'z-index': 1, "text":'A'},
      {'widgetname':"widget1517982171754", 'left': '362px', 'top': '171px', 'z-index': 1, "text":'B'},
      {'widgetname':"widget1517982173185", 'left': '328px', 'top': '291px', 'z-index': 1, "text":'C'},
      {'widgetname':"widget1517982192001", 'left': '639px', 'top': '187px', 'z-index': 1, "text":'D'}*/
    ];

    for(var i = 0, leni = simulateData.length;i < leni;i++){
      Vue.set(state.nodes, nodeid++, simulateData[i]);
    }
  },

  [types.make_node_mutation](state, data){
    //debugger
    /* Vue.set动态添加的组件，组件的数据不能传递 */
    Vue.set(state.nodes, nodeid++, data);
  },

  [types.add_path_mutation](state, {}){
    var simulateData = [
      /*{'start-anchor':"r", 'path-str': 'M214, 127L288, 127L288, 191L362, 191', 'startX': '214', 'startY': '127',
        "attachStartId":"widget1517982170724_r", "end-anchor":"l", "attachEndId":"widget1517982171754_l", "endX":"362", "endY":"191",
        "path-lt":'M362, 191L356, 185', "path-rb":'M362, 191L356, 197'},
      {'start-anchor':"b", 'path-str': 'M396.3906, 211L396.3906, 251L362.5, 251L362.5, 291', 'startX': '396.3906', 'startY': '211',
        "attachStartId":"widget1517982171754_b", "end-anchor":"t", "attachEndId":"widget1517982173185_t", "endX":"362.5", "endY":"291",
        "path-lt":'M362.5, 291L356.5, 285', "path-rb":'M362.5, 291L368.5, 285'},
      {'start-anchor':"r", 'path-str': 'M430.7969, 191L534.89845, 191L534.89845, 207L639, 207', 'startX': '430.7969', 'startY': '191',
        "attachStartId":"widget1517982171754_r", "end-anchor":"l", "attachEndId":"widget1517982192001_l", "endX":"639", "endY":"207",
        "path-lt":'M639, 207L633, 201', "path-rb":'M639, 207L633, 213'}*/
    ];

    var attachNodesArr = state.nodes;
    for(var i = 0, leni = simulateData.length;i < leni;i++){
      var startid = simulateData[i].attachStartId.split("_")[0],
           endid   = simulateData[i].attachEndId.split("_")[0];
      for(var key in attachNodesArr){
        if(startid == attachNodesArr[key].widgetname){
          state.node2paths[startid] = state.node2paths[startid] || [];
          state.node2paths[startid].push(simulateData[key] )
        }
        if(endid == attachNodesArr[key].widgetname){
          state.node2paths[endid] = state.node2paths[endid] || [];
          state.node2paths[endid].push(simulateData[key] )
        }
      }
      Vue.set(state.paths, pathid++, simulateData[i]);
    }
  }
}

function createThread (state, id, name) {
  Vue.set(state.threads, id, {
    id,
    name,
    messages: [],
    lastMessage: null
  })
}

function addMessage (state, message) {
  // add a `isRead` field before adding the message
  message.isRead = message.threadID === state.currentThreadID
  // add it to the thread it belongs to
  const thread = state.threads[message.threadID]
  if (!thread.messages.some(id => id === message.id)) {
    thread.messages.push(message.id)
    thread.lastMessage = message
  }
  // add it to the messages map
  Vue.set(state.messages, message.id, message)
}

function setCurrentThread (state, id) {
  state.currentThreadID = id
  if (!state.threads[id]) {
    debugger
  }
  // mark thread as read
  state.threads[id].lastMessage.isRead = true
}
