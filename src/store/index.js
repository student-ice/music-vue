import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => {
        return {
            url: ''
        }
    },
    getters: {
        getUrl(state) {
            return state.url
        }
    },
    actions: {
        setUrl(newUrl) {
            this.state.url = newUrl
        }
    }
})