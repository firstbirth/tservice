// task.service.ts

import { HttpService, API_URL } from "./http.service";

export class UserService {
	static async getUsers() {

		let users_data;

		try {
			users_data = await HttpService.post({
				url: `${API_URL}/GetUsers/v3/`,
			});
		} catch (error) {
			console.error("Error:", error);
		}
		
		return users_data?.data;
	}

}
