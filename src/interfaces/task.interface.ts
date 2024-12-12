// task.interface.ts

export interface Task {
    taskUID: string;            // Уникальный идентификатор задачи
    dateCreated: number;        // Дата создания задачи (в миллисекундах)
    dateDone: number;           // Дата выполнения задачи (в миллисекундах)
    dateClosed: number;         // Дата закрытия задачи (в миллисекундах)
    dateDeadline: number;       // Дата дедлайна (в миллисекундах)
    author: string;             // Автор задачи
    authorId: number;           // Идентификатор автора задачи
    description: string;        // Описание задачи
    performers: Performer[];    // Список исполнителей задачи
    responsibles: Responsible[];
    status: "DONE" | "PENDING" | "IN_PROGRESS" | "CANCELLED" | "NEW";  // Статус задачи
    isSynced: "SYNCED" | "NOT_SYNCED";  // Статус синхронизации задачи
    isImportant: "ORDINARY" | "IMPORTANT"; // Важность задачи
    isExpired: boolean;         // Флаг, указывающий на истечение срока
    version: number;            // Версия задачи

}

export interface Performer {
    performer: string;          // Имя исполнителя
    performerId: string;       // Идентификатор исполнителя
    taskRole: string;          // Роль исполнителя (например, "Менеджер")
}

interface Responsible{
    responsible: string,
    responsibleId: string;
}
