/// <reference path="../event/IEvent"/>
module com.maigo.mvc.event {

    export interface IEventDispatcher {
        addEventListener(type:string, listener:any, useCapture?:boolean /*false*/):any;
        removeEventListener(type:string, listener:any, useCapture?:boolean /*false*/):void;
        removeAllEventListeners(type?:string /*null*/):void;

        hasEventListener(type:string):boolean;
        willTrigger(type:string):boolean;

        on(type:string, listener:any, scope?:Object /*null*/, once?:boolean /*false*/, data?:any /*null*/, useCapture?:boolean /*false*/):any;
        off(type:string, listener:any, useCapture?:boolean /*false*/):void;

        dispatchEvent(event:com.maigo.mvc.event.IEvent):boolean;
    }
}