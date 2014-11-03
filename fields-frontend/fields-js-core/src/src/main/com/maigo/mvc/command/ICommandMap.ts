/// <reference path="../../core/type/Class.ts"/>
module com.maigo.mvc.command {

    export interface ICommandMap {
        mapEvent(eventType:string, commandClass:com.maigo.core.type.Class, eventClass?:com.maigo.core.type.Class /* null */, oneshot?:boolean /* false */):void;
        unmapEvent(eventType:string, commandClass?:com.maigo.core.type.Class, eventClass?:com.maigo.core.type.Class /* null */):void;
        unmapEvents():void;

        hasEventCommand(eventType:string, commandClass:com.maigo.core.type.Class, eventClass?:com.maigo.core.type.Class /* null */):boolean;

        execute(commandClass:com.maigo.core.type.Class, payload?:Object /* null */, payloadClass?:com.maigo.core.type.Class /* null */, named?:String /* '' */):void;

        detain(command:Object):void;
        release(command:Object):void;
    }
}