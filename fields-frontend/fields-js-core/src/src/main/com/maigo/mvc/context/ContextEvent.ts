/// <reference path="../event/Event.ts"/>
/// <reference path="../event/IEvent.ts"/>
module com.maigo.mvc.context {

    export class ContextEvent extends com.maigo.mvc.event.Event {
        public static STARTUP:string = 'ContextEvent::STARTUP';
        public static STARTUP_COMPLETE:string = 'ContextEvent::STARTUP_COMPLETE';

        public static SHUTDOWN:string = 'ContextEvent::SHUTDOWN';
        public static SHUTDOWN_COMPLETE:string = 'ContextEvent::SHUTDOWN_COMPLETE';

        public clone():com.maigo.mvc.event.IEvent {
            return new ContextEvent(this.type);
        }
    }
}