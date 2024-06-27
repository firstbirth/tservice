// task.service.ts

import { HttpService, API_URL } from "./http.service";
import store from "@/store";

export class TaskService {
	static async getTasks(
		_userid: number = 1,
		_start: number = 0,
		_limit: number = 10
	) {
		let task_data;

		try {
			task_data = await HttpService.post({
				url: `${API_URL}/GetTasks/v3/`,
				params: {
					userId: _userid.toString(),
					start: _start.toString(),
					limit: _limit.toString(),
				},
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return task_data?.data;
	}

	static async getTaskByUID(uid: string) {
		let task_data;

		try {
			task_data = await HttpService.post({
				url: `${API_URL}/GetTaskByUID/v3/`,
				params: { taskUID: uid },
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return task_data?.data;
	}

	static async getTaskComments(uid: string) {
		let task_data;

		try {
			task_data = await HttpService.post({
				url: `${API_URL}/GetTaskComments/v3/`,
				params: { taskUID: uid },
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return task_data?.data;
	}

	static async createTask(task_data: any) {
		let task_send_response;

		console.log(task_data);

		try {
			task_send_response = await HttpService.post({
				url: `${API_URL}/CreateTask/v3/`,
				params: task_data,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Basic 0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6Z2hidnRo",
				}
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return task_send_response?.data;
	}


	static async completeTask(uid : string) {
		let task_data;

		try {
			task_data = await HttpService.post({
				url: `${API_URL}/GetTaskByUID/v3/`,
				params: { taskUID: uid },
			});
		} catch (error) {
			console.error("Error:", error);
		}

		if(task_data) {
			task_data.data[0].status = "DONE";
			task_data.data[0].dateClosed = Math.round(new Date(Date.now()).getTime() / 1000);

			let update_response;

			try {
				update_response = await HttpService.post({
					url: `${API_URL}/UpdateTask/v3/`,
					params: task_data.data[0],
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic 0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6Z2hidnRo",
					}
				});
			} catch (error) {
				// alert('Не удалось обновить статус задачи');
				console.error("Error:", error);
			}

			return update_response?.data;

		}
	
		// console.log(task_data.data[0]);

		return false;

	}


	static async updateTask(task_data: any) {
		let task_complete_update_response;

		console.log(task_data);

		try {
			task_complete_update_response = await HttpService.post({
				url: `${API_URL}/UpdateTask/v3/`,
				params: task_data,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Basic 0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6Z2hidnRo",
				}
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return task_complete_update_response?.data;
	}


}
