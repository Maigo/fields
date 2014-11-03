/// <reference path="../../../../../libs/jasmine.d.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/event/Event.ts"/>
module com.maigo.mvc.event {

    describe("com.maigo.mvc.event.Event", () => {
        it("should have default properties", () => {
            var type:string = "test_type";
            var event:com.maigo.mvc.event.Event = new com.maigo.mvc.event.Event(type, true, true);
            expect(event.type).toBe(type);
            expect(event.bubbles).toBe(true);
            expect(event.cancelable).toBe(true);
        });
    });
}