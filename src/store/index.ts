// src/store/index.ts

import { createStore } from "vuex";

// ваша логика хранилища Vuex

const store = createStore({
	state: {
		darkMode: false,
		token: "",
		username: "",
		role: "",
	},
	mutations: {
		toggleDarkMode(state) {
			state.darkMode = !state.darkMode;
			console.log("New state:", state.darkMode);
		},

		setToken(state, token: string) {
			state.token = token;
			console.log("Token set:", state.token);
		},

		setRole(state, role: string) {
			state.role = role;
			console.log("Role set:", state.role);
		},

		setUser(state, username: string) {
			state.username = username;
			console.log("Username set:", state.username);
		},
	},
	actions: {
		// ваши действия
	},
	modules: {
		// ваши модули, если есть
	},
});

export default store; // экспортируем созданный объект store
