/// <reference path="../../core/type/ICloneable.ts"/>
module com.maigo.mvc.event {

    export interface IEvent extends com.maigo.core.type.ICloneable<IEvent> {
        type:string;
        bubbles:boolean;
        timeStamp:number;

        target:any;
        currentTarget:any;
        eventPhase:Object;

        propagationStopped:boolean;
        defaultPrevented:boolean;
        immediatePropagationStopped:boolean;
        removed:boolean;

        preventDefault():void;
        stopPropagation():void;
        stopImmediatePropagation():void;
        remove():void;
    }
}