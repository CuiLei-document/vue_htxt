import mockRequest from '@/utils/mockRequest'
const state = {
    list: null
}
const mutations = {
    GETDATA(state, list) {
        state.list = list
    }
}
const actions = {
    async getData({ commit }) {
        let result = await mockRequest('/home/list')
        if (result.code === 20000) {
            commit('GETDATA', result.data)
        }
        console.log(result)
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}