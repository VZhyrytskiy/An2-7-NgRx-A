import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/+store';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';

// rxjs
import { Observable, Subscription } from 'rxjs';

import { TaskModel } from './../../models/task.model';
import { TaskPromiseService } from './../../services';
import { AutoUnsubscribe } from '../../../core';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
@AutoUnsubscribe()
export class TaskFormComponent implements OnInit {
  task: TaskModel;
  tasksState$: Observable<TasksState>;

  private sub: Subscription;

  constructor(
    private taskPromiseService: TaskPromiseService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.task = new TaskModel();

    this.tasksState$ = this.store.pipe(select('tasks'));
    this.sub = this.tasksState$.subscribe(tasksState =>
      this.task = tasksState.selectedTask);

    this.route.paramMap.subscribe(params => {
      const id = params.get('taskID');
      if (id) {
        this.store.dispatch(new TasksActions.GetTask(+id));
      }
    });

  }

  onSaveTask() {
    const task = { ...this.task };

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
