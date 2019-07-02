import { getCasUserName } from '../../../api/User'
import { loginOutCas } from '@/common/utils/auth'

const user = {
  state: {
    sourceChannel: { name: '', code: '' },
    userInfo: {
      // 渠道
      sysId: 'DAM',
      userId: '',
      email: '',
      // 角色
      role: '',
      mobile: '',
      userName: '',
      job: '',
      createdBy: '',
      createdDate: '',
      updateDate: '',
      updatedBy: ''
    }
  },

  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = JSON.parse(JSON.stringify(userInfo))
    },
    SET_SOURCECHANNEL: (state, sourceChannel) => {
      if (sourceChannel) {
        state.sourceChannel = JSON.parse(JSON.stringify(sourceChannel))
      }
    }
  },

  actions: {
    // 获取用户信息
    GetCasUserName({ commit, state }) {
      return new Promise((resolve, reject) => {
        getCasUserName({ sysId: state.userInfo.sysId })
          .then(res => {
            commit('SET_USERINFO', res)
            resolve()
          })
          .catch(res => {
            if (res.data.Result.errCode === -100001) {
              // 获取信息失败暂时走注销登录
              loginOutCas()
            }
            reject(res)
          })
      })
    },
    SetSourceChannel({ commit }, sourceChannel) {
      return new Promise(resolve => {
        commit('SET_SOURCECHANNEL', sourceChannel)
        resolve()
      })
    }
  }
}

export default user
