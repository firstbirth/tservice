// task.interface.ts

export interface Task {
	taskUID: string;
	dateCreated: number;
	dateDone: number;
	dateClosed: number;
	dateDeadline: number;
	author: string;
	authorId: string;
	description: string;
	performer: string;
	performerId: number;
	status: string;
	isSynced: string;
	isImportant: string;
	version: number;
	image: string;
}