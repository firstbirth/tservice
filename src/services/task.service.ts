// task.service.ts

import { HttpService, API_URL } from "./http.service";
import store from "@/store";

export class TaskService {
	static async getTasks(
		_userid: number | undefined = undefined,
		_start: number = 0,
		_limit: number = 10,
	) {
		let task_data;

		try {
			const params: { [key: string]: string } = {
				start: _start.toString(),
				limit: _limit.toString(),
				selectionType: "author",
				sortType: 'DESC',
			};


			if (_userid !== undefined) {
				params.userId = _userid.toString();
			}
			task_data = await HttpService.post({
				url: `${API_URL}/GetTasks/v3/`,
				params,
			});
		} catch (error) {
			console.log(error);
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

	static async addComment(taskUID: string, dateAdded: number, dateModified: number, author: string, authorId: number, comment: string) {
		let comment_data;

		try {
			comment_data = await HttpService.post({
				url: `${API_URL}/AddComment/v3/`,
				params: {
					taskUID: taskUID,
					dateAdded: dateAdded.toString(),
					dateModified: dateModified.toString(),
					author: author,
					authorId: authorId.toString(),
					comment: comment,
				},
				shouldEncodeUrlParams: false,
			});
		} catch (error) {
			console.log(error);
		}

		if (comment_data.success === true) {
			return comment_data.data.id;
		} else return comment_data;

	}

	static async addResponsible(taskUID: string, oID: string, name: string) {
		let responsible_data;

		try {
			responsible_data = await HttpService.post({
				url: `${API_URL}/AddResponsible/v3/`,
				params: {
					taskUID: taskUID,
					oID: oID,
					name: name,
				},
				shouldEncodeUrlParams: false,
			});
		} catch (error) {
			console.error("Error:", error);
		}

		if (responsible_data.success === true) {
			return true;
		} else return responsible_data;
	}

	static async deleteResponsible(taskUID: string, oID: string) {
		let responsible_data;

		try {
			responsible_data = await HttpService.post({
				url: `${API_URL}/DeleteResponsible/v3/`,
				params: {
					taskUID: taskUID,
					oID: oID,
				},
			});
		} catch (error) {
			console.error("Error:", error);
		}

		if (responsible_data.success === true) {
			return true;
		} else return responsible_data;
	}

	static async deleteComment(commentUID: string) {
		let comment_data;

		try {
			comment_data = await HttpService.post({
				url: `${API_URL}/DeleteComment/v3/`,
				params: {
					id: commentUID,
				},
			});
		} catch (error) {
			console.error("Error:", error);
		}

		if (comment_data.success === true) {
			return true;
		} else return comment_data;
	}

	static async updateComment(commentId: string, dateModified: string, author: string, authorId: number, comment: string) {
		let comment_data;
		console.log("ENCODEDURLCOMPONENT:", encodeURIComponent("Арсланов А.А."));
		const encoded_author = encodeURIComponent(author);

		try {
			comment_data = await HttpService.post({
				url: `${API_URL}/UpdateComment/v3/`,
				params: {
					id: commentId,
					dateModified: dateModified,
					author: decodeURIComponent(encoded_author),
					authorId: authorId.toString(),
					comment: comment,
				},
				shouldEncodeUrlParams: false
			});
		} catch (error) {
			console.log(error);
		}

		if (comment_data.success === true) {
			return comment_data.data.id;
		} else return comment_data;

	}

	static async AddContractorsByGroup(taskUID: string, userGroup:string) {
		let task_contractors_group;

		try {
			task_contractors_group = await HttpService.post({
				url: `${API_URL}/AddContractorsByGroup/v3/`,
				params: {
					taskUID: taskUID,
					UserGroup: userGroup,
				},
			});
		} catch (error) {
			console.log(error);
		}

		const hasSuccess = task_contractors_group.data.some(item => item.success === true);

		if (hasSuccess) {
			return true;
		} else {
			return task_contractors_group;
		}
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
				},
				shouldEncodeUrlParams: false,
			});

			console.log("task_send_response", JSON.stringify(task_send_response));
		} catch (error) {
			console.error("Error:", error);
		}

		return task_send_response?.data;
	}


	static async completeTask(uid: string) {
		let task_data;

		try {
			task_data = await HttpService.post({
				url: `${API_URL}/GetTaskByUID/v3/`,
				params: { taskUID: uid },
			});
		} catch (error) {
			console.error("Error:", error);
		}

		if (task_data) {
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
					},
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

		console.log("updateTask", task_data);

		try {
			task_complete_update_response = await HttpService.post({
				url: `${API_URL}/UpdateTask/v3/`,
				params: task_data,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Basic 0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6Z2hidnRo",
				},
				shouldEncodeUrlParams: false,
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return task_complete_update_response?.data;
	}


}
