import { Injectable } from '@angular/core';

// @NgRx
import { Action } from '@ngrx/store';
import {
  Actions,
  createEffect,
  ofType,
  OnInitEffects,
  OnRunEffects,
  EffectNotification
} from '@ngrx/effects';
import * as TasksActions from './tasks.actions';
import * as RouterActions from './../router/router.actions';

// rxjs
import { Observable } from 'rxjs';
import {
  concatMap,
  pluck,
  switchMap,
  takeUntil,
  tap,
  map
} from 'rxjs/operators';

import { TaskPromiseService } from './../../../tasks/services';
import { TaskModel, Task } from '../../../tasks/models/task.model';

@Injectable()
export class TasksEffects implements OnInitEffects /*, OnRunEffects */ {
  constructor(
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService
  ) {
    console.log('[TASKS EFFECTS]');
  }

  getTasks$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTasks),
      switchMap(action =>
        this.taskPromiseService
          .getTasks()
          .then(tasks => TasksActions.getTasksSuccess({ tasks }))
          .catch(error => TasksActions.getTasksError({ error }))
      )
    )
  );

  updateTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      pluck('task'),
      concatMap((task: TaskModel) =>
        this.taskPromiseService
          .updateTask(task)
          .then((updatedTask: Task) => {
            return TasksActions.updateTaskSuccess({ task: updatedTask });
          })
          .catch(error => TasksActions.updateTaskError({ error }))
      )
    )
  );

  createTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      pluck('task'),
      concatMap((task: TaskModel) =>
        this.taskPromiseService
          .createTask(task)
          .then((createdTask: Task) => {
            return TasksActions.createTaskSuccess({ task: createdTask });
          })
          .catch(error => TasksActions.createTaskError({ error }))
      )
    )
  );

  deleteTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      pluck('task'),
      concatMap((task: TaskModel) =>
        this.taskPromiseService
          .deleteTask(task)
          .then(
            (/* method delete for this API returns nothing, so we will use previous task */) => {
              return TasksActions.deleteTaskSuccess({ task });
            }
          )
          .catch(error => TasksActions.deleteTaskError({ error }))
      )
    )
  );

  createUpdateTaskSuccess$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksActions.createTaskSuccess, TasksActions.updateTaskSuccess),
      map(action =>
        RouterActions.go({
          path: ['/home']
        })
      )
    );
  });

  // Implement this interface to dispatch a custom action after the effect has been added.
  // You can listen to this action in the rest of the application
  // to execute something after the effect is registered.
  ngrxOnInitEffects(): Action {
    // console.log('ngrxOnInitEffects is called');
    return { type: '[TasksEffects]: Init' };
  }

  // Implement the OnRunEffects interface to control the lifecycle
  // of the resolved effects.
  // ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
  //   return resolvedEffects$.pipe(
  //     // tap(val => console.log('ngrxOnRunEffects:', val)),
  //     // perform until create new task
  //     // only for demo purpose
  //     takeUntil(this.actions$.pipe(ofType(TasksActions.createTask)))
  //   );
  // }
}
