/// <reference path="../event/IEvent.ts"/>
/// <reference path="../event/Event.ts"/>
/// <reference path="../task/ITask.ts"/>
module com.maigo.mvc.task {

    export class TaskEvent extends com.maigo.mvc.event.Event {
        public static TASK_INITIALIZING:string = "TaskEvent::TASK_INITIALIZING";
        public static TASK_WAITING:string = "TaskEvent::TASK_WAITING";
        public static TASK_RUNNING:string = "TaskEvent::TASK_RUNNING";
        public static TASK_COMPLETED:string = "TaskEvent::TASK_COMPLETED"
        public static TASK_SKIPPED:string = "TaskEvent::TASK_SKIPPED";
        public static TASK_ABORTED:string = "TaskEvent::TASK_ABORTED";
        public static TASK_ERROR:string = "TaskEvent::TASK_ERROR";

        private _task:com.maigo.mvc.task.ITask;

        public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
            super(type, bubbles, cancelable);
        }

        public withTask(task:com.maigo.mvc.task.ITask):TaskEvent {
            this._task = task;
            return this;
        }

        public get task():com.maigo.mvc.task.ITask {
            return this._task;
        }

        public clone():com.maigo.mvc.event.IEvent {
            return new TaskEvent(this.type).withTask(this.task);
        }
    }
}