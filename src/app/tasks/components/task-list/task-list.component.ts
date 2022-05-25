import { Component, type OnInit } from '@angular/core';
import { type Observable } from 'rxjs';

import { TasksFacade } from './../../../core/@ngrx';
import { type TaskModel } from './../../models/task.model';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<ReadonlyArray<TaskModel>>;
  tasksError$!: Observable<Error | string | null>;

  constructor(private tasksFacade: TasksFacade) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksFacade.tasks$;
    this.tasksError$ = this.tasksFacade.tasksError$;
  }

  onCreateTask(): void {
    this.tasksFacade.goTo({ path: ['/add'] });
  }

  onCompleteTask(task: TaskModel): void {
    const taskToComplete: TaskModel = { ...task, done: true };
    this.tasksFacade.updateTask({ task: taskToComplete });
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.tasksFacade.goTo({ path: link });
  }

  onDeleteTask(task: TaskModel): void {
    const taskToDelete: TaskModel = { ...task };
    this.tasksFacade.deleteTask({ task: taskToDelete });
  }
}
