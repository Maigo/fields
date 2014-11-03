/// <reference path="../event/IEventDispatcher.ts"/>
module com.maigo.mvc.task {

    export interface ITask extends com.maigo.mvc.event.IEventDispatcher {
        state:string;

//        suspend():void;
//        abort():void;
    }
}