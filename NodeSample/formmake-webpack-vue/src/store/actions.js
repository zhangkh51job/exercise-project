import * as api from '../api'/*加载文件夹默认加载中的index文件*/
import * as types from './mutation-types'

export const initData = ({commit}) => {
    commit(types.add_node_mutation, {
    });
    commit(types.add_path_mutation, {
    });
};

export const makeNode = ({commit}, nodeData) => {
    //debugger;
    commit(types.make_node_mutation, nodeData)
}

export const getAllMessages = ({ commit }) => {
    api.getAllMessages(
        messages => {
            commit(types.RECEIVE_ALL, {
                    messages
                }
            )
        }
    )
};

/* commit来源：
 * Action 函数接受一个与 store实例具有相同方法和属性的 context(可能为store，可能为module） 对象，context: { commit， getters， state } */
export const sendMessage = ({ commit }, payload) => {
    api.createMessage(payload, message => {
        commit(types.RECEIVE_MESSAGE, {
            message
        })
    })
};

export const switchThread = ({ commit }, payload) => {
    commit(types.SWITCH_THREAD, payload)
};
