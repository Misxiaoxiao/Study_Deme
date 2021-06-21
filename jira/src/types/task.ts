export interface TaskType {
  id: number;
  name: string;
  processorId: number;
  projectId: number;
  epicId: number;
  kanbanId: number;
  typeId: number;
  note: string;
}

export interface TaskTypesType {
  id: number;
  name: string;
}
