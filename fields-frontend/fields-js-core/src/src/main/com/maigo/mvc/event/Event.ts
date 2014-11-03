/// <reference path="../event/IEvent.ts"/>
module com.maigo.mvc.event {

    export class Event implements com.maigo.mvc.event.IEvent {
        public type:string = null;
        public bubbles:boolean = false;
        public cancelable:boolean = false;
        public timeStamp:number = 0;

        public target:Object = null;
        public currentTarget:Object = null;
        public eventPhase:number = 0;

        public defaultPrevented:boolean = false;
        public propagationStopped:boolean = false;
        public immediatePropagationStopped:boolean = false;
        public removed:boolean = false;

        constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
            this.type = type;
            this.bubbles = bubbles;
            this.cancelable = cancelable;
            this.timeStamp = new Date().getTime();
        }

        preventDefault():void { this.defaultPrevented = true; }

        stopPropagation():void { this.propagationStopped = true; }

        stopImmediatePropagation():void { this.immediatePropagationStopped = this.propagationStopped = true; }

        remove():void { this.removed = true; }

        clone():com.maigo.mvc.event.IEvent {
            return new Event(this.type, this.bubbles, this.cancelable);
        }
    }
}