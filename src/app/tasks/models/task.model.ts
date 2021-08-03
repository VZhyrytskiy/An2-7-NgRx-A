export interface Task {
  id?: number;
  action?: string;
  priority?: number;
  estHours?: number;
  actHours?: number;
  done?: boolean;
}
export class TaskModel implements Task {
  constructor(
    public id: number | null = null,
    public action: string = '',
    public priority: number = 0,
    public estHours: number = 0,
    public actHours?: number,
    public done?: boolean
  ) {
    this.actHours = actHours || 0;
    this.done = done || false;
  }
}
