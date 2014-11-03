/// <reference path="../event/IEvent.ts"/>
/// <reference path="../event/IEventDispatcher.ts"/>
/// <reference path="../event/EventDispatcher.ts"/>
/// <reference path="./IContext.ts"/>
module com.maigo.mvc.context {

    export class ContextBase implements com.maigo.mvc.context.IContext, com.maigo.mvc.event.IEventDispatcher {
        private _eventDispatcher:com.maigo.mvc.event.IEventDispatcher;

        public constructor() {
            this._eventDispatcher = new com.maigo.mvc.event.EventDispatcher();
        }

        //---------------------------------------------------------------------
        //  IContext Methods
        //---------------------------------------------------------------------
        public get eventDispatcher():com.maigo.mvc.event.IEventDispatcher {
            return this._eventDispatcher;
        }

        //---------------------------------------------------------------------
        //  IEventDispatcher Methods
        //---------------------------------------------------------------------
        addEventListener(type:string, listener:any, useCapture:boolean = false):any {
            return this._eventDispatcher.addEventListener(type, listener, useCapture);
        }

        removeEventListener(type:string, listener:any, useCapture:boolean = false):void {
            this._eventDispatcher.removeEventListener(type, listener, useCapture);
        }

        removeAllEventListeners(type:string = null):void {
            this._eventDispatcher.removeAllEventListeners(type);
        }

        hasEventListener(type:string):boolean {
            return this._eventDispatcher.hasEventListener(type);
        }

        willTrigger(type:string):boolean {
            return this._eventDispatcher.willTrigger(type);
        }

        on(type:string, listener:any, scope:Object = null, once:boolean = false, data:any = null, useCapture:boolean = false):any {
            this._eventDispatcher.on(type, listener, scope, once, data, useCapture);
        }

        off(type:string, listener:any, useCapture:boolean = false):void {
            this._eventDispatcher.off(type, listener, useCapture);
        }

        dispatchEvent(event:com.maigo.mvc.event.IEvent):boolean {
            return this._eventDispatcher.dispatchEvent(event);
        }
    }
}