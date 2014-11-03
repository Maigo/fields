/// <reference path="../../../../../libs/jasmine.d.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/event/Event.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/event/IEvent.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/event/EventDispatcher.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/event/IEventDispatcher.ts"/>
module com.maigo.mvc.event {

    class Callback {
        handleEvent(event:com.maigo.mvc.event.IEvent):void {
        }
    }

    describe("EventDispatcher", function ():void {
        var eventDispatcher:com.maigo.mvc.event.IEventDispatcher;

        beforeEach(() => {
            eventDispatcher = new com.maigo.mvc.event.EventDispatcher();
        });

        afterEach(() => {
            eventDispatcher = null;
        });

        it("should be able to add listeners", () => {
            var callback:Function = () => {
            };
            eventDispatcher.addEventListener("test_type", callback);
            expect(eventDispatcher.hasEventListener("test_type")).toBe(true);
        });

        it("it should dispatch events through callback functions", () => {
            var value:boolean = false;
            eventDispatcher.addEventListener("test_type", () => { value = true; });

            var event:com.maigo.mvc.event.IEvent = new com.maigo.mvc.event.Event("test_type");
            eventDispatcher.dispatchEvent(event);
            expect(value).toBe(true);
        });

        it("it should dispatch events through callback objects", () => {
            var callback:Callback = new Callback();
            spyOn(callback, "handleEvent");

            eventDispatcher.addEventListener("test_type", callback);

            var event:com.maigo.mvc.event.IEvent = new com.maigo.mvc.event.Event("test_type");
            eventDispatcher.dispatchEvent(event);
            expect(callback.handleEvent).toHaveBeenCalledWith(event);
        });

    });
}