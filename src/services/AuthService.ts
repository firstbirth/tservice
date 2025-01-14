// src/services/AuthService.ts

import ApiService from "@/services/ApiService";
import store from "@/store";

// Проверка наличия токена авторизации
export const isAuthenticated = (): boolean => {
	return !!store.state.token && store.state.token !== "";
};

export async function checkServer(): Promise<boolean> {
	try {
		// Construct the data object c	ontaining username and password
		// Base64 encode TSK:qwe123 

		const token = "VFNLOnF3ZTEyMw==";

		const response = await ApiService.getData(
			`/CheckServerStatus/v3/`,
			token,
		);

		// Check if the login was successful based on the response
		if (response.success) {
			console.log("it works");
			return true;
		} else {
			// Authentication failed
			console.log("something went wrong");
			return false;
		}
	} catch (error) {
		// Handle any errors that occur during the login process
		console.error("Error during login:", error);
		return false;
	}
}

export async function getServiceToken(): Promise<string> {
	try {
		// fetch the token from an external url
		const response = await ApiService.getData(
			`/GetServiceToken/v3/`,
			"",
		);

		// return the token
		return response.data;
	} catch (error) {
		throw error;
	}
}

export async function login(login: string, pincode: string): Promise<boolean> {
	// checkServer();

	// Создаем экземпляр TextEncoder
	const encoder = new TextEncoder();

	// Преобразуем строку в Uint8Array, представляющий байтовый массив
	const encodedString = encoder.encode(login + ":" + pincode);

	// Преобразуем байтовый массив в строку Base64
	const token = btoa(
		String.fromCharCode.apply(null, Array.from(encodedString)),
	);

	const service_token = "VFNLOnF3ZTEyMw==";

	try {
		// Construct the data object c	ontaining username and password
		const data = {};

		// const test_response = await ApiService.testData(
		// 	`/CheckServerStatus/v3/`,
		// 	token
		// );

		// Make a POST request to the login endpoint using ApiService

		const response = await ApiService.postData(
			`/CheckUser/v3/?login=${login}&pincode=${pincode}`,
			data,
			service_token,
		);

		console.log(response);
		// console.log('we are here');

		// Check if the login was successful based on the response
		if (response.response == "OK") {
			console.log("Setting user data in Vuex store");

			store.commit("setUserName", response.userName);
			store.commit("setUserId", response.userId);
			store.commit("setRole", response.role);
			store.commit("setToken", response.accessId);
			store.commit("setPinCode", pincode);
			store.commit("setLogin", response.login);
			// Проверим, что данные обновились в store
			console.log("User Name:", store.state.username);
			console.log("User ID:", store.state.userid);
			console.log("User Role:", store.state.role);
			console.log("Token:", store.state.token);
			console.log("PinCode:", pincode);
			console.log("UserLogin:", store.state.login);
			return true;
		} else {
			// Authentication failed
			return false;
		}
	} catch (error) {
		// Handle any errors that occur during the login process
		console.error("Error during login:", error);
		return false;
	}
}

export async function renewToken(login: string, pincode: string): Promise<boolean> {

	const service_token = "VFNLOnF3ZTEyMw==";

	const response = await ApiService.postData(
		`/CheckUser/v3/?login=${login}&pincode=${pincode}`,
		{},
		service_token,
	);

	console.log("RENEW TOKEN RESPONSER:", response);
	if (response.response == "OK") {
		store.commit("setToken", response.accessId);
		return true;
	} else return false;
}


// Function to log out the user
export function logout(): void {
	// Удаляем
	store.commit("setUserName", "");
	store.commit("setUserId", "");
	store.commit("setRole", "");
	store.commit("setToken", "");
}