/// <reference path="../../state/core/IStateCore.ts"/>
/// <reference path="../../state/core/StateCore.ts"/>
/// <reference path="../event/EventDispatcher.ts"/>
/// <reference path="../task/ITask.ts"/>
/// <reference path="../task/TaskStatus.ts"/>
module com.maigo.mvc.task {

    export class Task extends com.maigo.mvc.event.EventDispatcher implements com.maigo.mvc.task.ITask {
        private _state:com.maigo.state.core.IStateCore;

        public constructor() {
            this.setupStateCore();
        }

        private setupStateCore():void {
            this._state = new com.maigo.state.core.StateCore().states([
                    TaskStatus.INITIALIZING,
                    TaskStatus.WAITING,
                    TaskStatus.RUNNING,
                    TaskStatus.COMPLETED,
                    TaskStatus.SKIPPED,
                    TaskStatus.ABORTED,
                    TaskStatus.ERROR
                ]).transitions(TaskStatus.INITIALIZING, [
                    TaskStatus.WAITING,
                    TaskStatus.SKIPPED,
                    TaskStatus.ABORTED,
                    TaskStatus.ERROR
                ]).transitions(TaskStatus.WAITING, [
                    TaskStatus.RUNNING,
                    TaskStatus.SKIPPED,
                    TaskStatus.ABORTED,
                    TaskStatus.ERROR
                ]).transitions(TaskStatus.RUNNING, [
                    TaskStatus.COMPLETED,
                    TaskStatus.SKIPPED,
                    TaskStatus.ABORTED,
                    TaskStatus.ERROR
                ]).init(TaskStatus.INITIALIZING);
        }

        public get state():string {
            return this._state.state;
        }

    }
}
