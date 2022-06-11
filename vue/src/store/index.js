import { createStore } from 'vuex';
import axios from "axios";

const baseURL = "http://survey-app.test/api";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },
    },
    getters: {},
    actions: {
        register: async({ commit }, data) => {
            try {

                const response = await axios.post(`${baseURL}/register`, data);

                commit('setData', response.data);

                return response.data;

            } catch (error) {
                if (!error.response) {
                    // network error
                    errorStatus = 'Error: Network Error';
                } else {
                    errorStatus = error.response;
                }

                console.log('error: ', errorStatus);
            }

        }
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
        },
        setData: (state, { data, token }) => {
            state.user.data = data;
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
        }
    },
    modules: {}
});

export default store;