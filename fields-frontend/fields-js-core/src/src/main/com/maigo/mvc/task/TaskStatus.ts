module com.maigo.mvc.task {
    export class TaskStatus {
        static INITIALIZING:string = "TaskStatus::INITIALIZING";
        static WAITING:string = "TaskStatus::WAITING";
        static RUNNING:string = "TaskStatus::RUNNING";
        static COMPLETED:string = "TaskStatus::COMPLETED";
        static SKIPPED:string = "TaskStatus::SKIPPED";
        static ABORTED:string = "TaskStatus::ABORTED";
        static ERROR:string = "TaskStatus::ERROR";
    }
}