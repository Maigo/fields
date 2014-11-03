/// <reference path="../event/IEvent.ts"/>
module com.maigo.mvc.command {

    export interface ICommand {
        execute():void;
        dispatch(event:com.maigo.mvc.event.IEvent):boolean;
    }
}