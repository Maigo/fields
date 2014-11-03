/// <reference path="../../../../../libs/jasmine.d.ts"/>
/// <reference path="../../../../../libs/dijon.d.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/command/ICommand.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/command/Command.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/command/ICommandMap.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/command/CommandMap.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/event/IEvent.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/event/Event.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/event/IEventDispatcher.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/event/EventDispatcher.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/injector/IInjector.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/injector/Injector.ts"/>
module com.maigo.mvc.command {

    class Value {
        public flag:boolean = false;
    }
    class TestCommand extends Command {
        public value:Value = undefined; // [Inject]

        public execute():void {
            this.value.flag = true;
        }
    }
    describe("CommandMap", () => {
        var injector:com.maigo.mvc.injector.IInjector;
        var eventDispatcher:com.maigo.mvc.event.IEventDispatcher;
        var commandMap:com.maigo.mvc.command.ICommandMap;

        beforeEach(() => {
            injector = new com.maigo.mvc.injector.Injector();
            eventDispatcher = new com.maigo.mvc.event.EventDispatcher();
            commandMap = new com.maigo.mvc.command.CommandMap(eventDispatcher, injector);
        });

        afterEach(() => {
            injector = null;
            eventDispatcher = null;
            commandMap = null;
        });

        it("should register event listener", () => {
            var value:Value = new Value();
            injector.mapValue("value", value);
            commandMap.mapEvent("test", TestCommand);
            expect(eventDispatcher.hasEventListener("test")).toBe(true);
        });

        it("should have event command map", () => {
            var value:Value = new Value();
            injector.mapValue("value", value);
            commandMap.mapEvent("test", TestCommand);

            expect(commandMap.hasEventCommand("test", TestCommand)).toBe(true);
        });

        it("should trigger command on event", () => {
            var value:Value = new Value();
            injector.mapValue("value", value);
            commandMap.mapEvent("test", TestCommand);
            spyOn(commandMap, 'execute').and.callThrough();
            eventDispatcher.dispatchEvent(new com.maigo.mvc.event.Event("test"));
            expect(commandMap.execute).toHaveBeenCalled();
            expect(value.flag).toBe(true);
        });
    });
}