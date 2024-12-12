// src/store/index.ts

import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";


const store = createStore({
	state: {
		darkMode: false,
		token: "",
		username: "",
		role: "",
		userid: 0,
		crutches: true,
		pinCode: "",
		login: "",
	},
	mutations: {
		toggleDarkMode(state) {
			state.darkMode = !state.darkMode;
			// console.log("New state: ", state.darkMode);
		},

		toggleCrutches(state) {
			state.crutches = !state.crutches;
		},

		setToken(state, token: string) {
			state.token = token;
			// console.log("Token set: ", state.token);
		},

		setRole(state, role: string) {
			state.role = role;
			// console.log("Role set: ", state.role);
		},

		setUserName(state, username: string) {
			state.username = username;
			// console.log("Username set: ", state.username);
		},

		setUserId(state, id: number) {
			state.userid = id;
			// console.log("Username set: ", state.username);
		},

		setPinCode(state, pinCode: string) {
			state.pinCode = pinCode;
		},

		setLogin(state, login: string) {
			state.login = login
		}
	},
	getters: {

		isAdmin(state) {
			if (state.role === "Админы") {
				return true;
			} else {
				return false;
			}
		},

		getUserId(state) {
			return state.userid;
		},

		getUserToken(state) {
			return state.token;
		},
	},
	actions: {
		// действия
	},
	modules: {
		// модули, если есть
	},
	plugins: [
		createPersistedState()
	],
});

export default store; // экспортируем созданный объект store
