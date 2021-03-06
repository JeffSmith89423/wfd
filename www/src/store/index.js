import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from 'router'
import debug from 'util'

let api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 2000,
    withCredentials: true
})

let auth = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 2000,
    withCredentials: true
})

// used to make an external api call to get recipes
let recipeApi = axios.create({
    baseURL: 'https://api.edamam.com/search?q=',
    timeout: 3000

})

vue.use(vuex)

var store = new vuex.Store({
    state: {
        cookBook: [],
        results: [],
        err: {},
        user: {},
        shopping: [],
        week: {},
        activeRecipe: {},
        
    },
    mutations: {
        setResults(state, results) {
            state.results = results
        },
        handleError(state, err) {
            state.err = err
        },
        setCookBook(state, recipe) {
            state.cookBook = recipe
        },
        setUser(state, user) {
            state.user = user
        },

        setShopping(state, item) {
            state.shopping = item
        },
        setActiveRecipe(state, activeRecipe) {
            state.activeRecipe = activeRecipe
        },
        setDay(state, payload) {
            vue.set(state.days[payload.index], "recipe", payload.recipe)
        },
        setDays(state, data){
            state.week = data
        }



    },

    actions: {
        //key database::::

        //jeff's   ====     '&app_id=878f5fef&app_key=0fb14457c6f7568967cea5fdf2757a7b&from=0&to=100'
        //leslie's  ===     '&app_id=d774e5c8&app_key=907d1f051ac9fd1cf1fe2484c4e002b5&from=0&to=100'


        //result actions=======================================================================================
        getRecipes({ commit, dispatch }, payload) {
            recipeApi(payload + '&app_id=878f5fef&app_key=0fb14457c6f7568967cea5fdf2757a7b&from=0&to=100')
                .then(data => {
                    commit('setResults', data.data.hits)
                    console.log(data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        //cookbook actions ============================================================================================
        addToCookBook({ commit, dispatch }, recipe) {
            api.post('recipes', recipe)
                .then(res => {
                    dispatch("getCookBook")
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        setActiveRecipe({ commit, dispatch }, activeRecipe) {
            commit('setActiveRecipe', activeRecipe)
        },

        setDay({ commit, dispatch }, payload) {
            commit('setDay', payload)
        },

        saveDays({commit, dispatch}, days){
            api.put('savedays/', days)
            .then(res => {
                commit('setDays', res.data.data)
            })
        },
        

        getCookBook({ commit, dispatch }) {

            api('cookbook')
                .then(res => {
                    commit('setCookBook', res.data.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        removeFromCookBook({ commit, dispatch }, recipe) {
            api.delete('recipes/' + recipe._id)
                .then(res => {
                    dispatch('getCookBook')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        addToShopList({ commit, dispatch }, payload) {
            api.post('items', payload)
                .then(res => {
                    dispatch('getShopList')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        removeFromShopList({ commit, dispatch }, item) {
            api.delete('items/' + item._id)
                .then(res => {
                    dispatch('getShopList', { _id: item.creatorId })
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        getShopList({ commit, dispatch }, user) {
            api('items?creatorId=' + user._id)
                .then(res => {
                    commit('setShopping', res.data.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },


        //Login and Register actions ===================================================================
        register({ commit, dispatch }, payload) {
            auth.post('register', payload)
                .then(res => {
                    commit('setUser', res.data.data)
                    router.push({ name: 'Results' })
                    console.log('User account successfully created')
                })
                .catch(err => {
                    commit('handleError', err)
                })

        },
        createWeek({commit, dispatch}, week){
            api.post('weeks', week)
                .then(res => {
                    commit('setDays', res.data.data)
                })
        },
        

        login({ commit, dispatch }, payload) {
            auth.post('login', payload)
                .then(res => {
                    commit('setUser', res.data.data)
                    commit('setDays', res.data.data.days)
                    router.push({ name: 'Results' })
                    console.log(res)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        logout({ commit, dispatch }) {
            auth.delete('logout')
                .then(res => {
                    commit('setUser', {})
                    router.push({ name: 'Login' })
                    console.log('User session terminated')
                })
                .catch(err => {
                    commit('handleError', err)
                })

        },
        authenticate({ commit, dispatch }) {
            auth.get('authenticate')
                .then(res => {

                    router.push({ name: 'Results' })
                    commit('setUser', res.data.data)
                    console.log(res.data.data)


                })
                .catch(err => {

                    commit('handleError', err)
                    router.push({ name: 'Login' })
                })

        },

    }
})


export default store