export const state = () => ({
    currentId : '1Ib0IaP7iEgEdh4hRKTNVG',
  })

export const mutations = {
    setId(state, id){
        state.currentId = id
    }
}


export const getters = {
    oldId(state){
        return state.currentId
    }
}