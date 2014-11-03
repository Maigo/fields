/// <reference path="../command/ICommand.ts"/>
/// <reference path="../command/ICommandMap.ts"/>
/// <reference path="../event/IEvent.ts"/>
/// <reference path="../event/IEventDispatcher.ts"/>
/// <reference path="../injector/IInjector.ts"/>
module com.maigo.mvc.command {

    export class Command implements com.maigo.mvc.command.ICommand {
        public eventDispatcher:com.maigo.mvc.event.IEventDispatcher = undefined; // [Inject]
        public commandMap:com.maigo.mvc.command.ICommandMap = undefined; // [Inject]
        public injector:com.maigo.mvc.injector.IInjector = undefined; // [Inject]

        execute():void { /* override in subclass */ }

        dispatch(event:com.maigo.mvc.event.IEvent):boolean {
            return (this.eventDispatcher.hasEventListener(event.type)) ?
                this.eventDispatcher.dispatchEvent(event) : false;
        }

    }
}