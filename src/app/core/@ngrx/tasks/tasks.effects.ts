import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, type OnInitEffects, type OnRunEffects, type EffectNotification } from '@ngrx/effects';
import { type Action } from '@ngrx/store';
import { type Observable, concatMap, map, switchMap, takeUntil, tap } from 'rxjs';

import { TaskPromiseService } from './../../../tasks/services';
import { type TaskModel } from '../../../tasks/models/task.model';
import * as TasksActions from './tasks.actions';
import * as RouterActions from './../router/router.actions';

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
        // Notice!
        // If you have a connection to the Firebase,
        // the stream will be infinite - you have to unsibscribe
        // This can be performed following this pattern
        // this.taskObservableService
        //      .getTasks()
        //      .pipe(takeUntil(this.actions$.pipe(ofType(TasksActions.TaskListComponentIsDestroyed))
        // If you use HttpClient, the stream is finite,
        // so you have no needs to unsubscribe
        this.taskPromiseService
          .getTasks()
          .then(tasks => TasksActions.getTasksSuccess({ tasks }))
          .catch(error => TasksActions.getTasksError({ error }))
      )
    )
  );

  updateTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask, TasksActions.completeTask),
      map(action => action.task),
      concatMap((task: TaskModel) =>
        this.taskPromiseService
          .updateTask(task)
          .then((updatedTask: TaskModel) => {
            return TasksActions.updateTaskSuccess({ task: updatedTask });
          })
          .catch(error => TasksActions.updateTaskError({ error }))
      )
    )
  );

  createTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      map(action => action.task),
      concatMap((task: TaskModel) =>
        this.taskPromiseService
          .createTask(task)
          .then((createdTask: TaskModel) => {
            return TasksActions.createTaskSuccess({ task: createdTask });
          })
          .catch(error => TasksActions.createTaskError({ error }))
      )
    )
  );

  deleteTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      map(action => action.task),
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
  //     tap(val => console.log('ngrxOnRunEffects:', val)),
  //     // perform until create new task
  //     // only for demo purpose
  //     takeUntil(this.actions$.pipe(ofType(TasksActions.createTask)))
  //   );
  // }
}
