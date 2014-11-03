/// <reference path="../../../../../libs/jasmine.d.ts"/>
/// <reference path="../../../../../main/com/maigo/core/exception/Exception.ts"/>
module com.maigo.core.exception {

    class SubException extends com.maigo.core.exception.Exception {
        static rtti:com.maigo.core.rtti.RTTI = new com.maigo.core.rtti.RTTI("SubException");
        constructor(message:string = "") {
            super(message);
        }
    }

    describe("com.maigo.core.util.Exception", () => {
        it("should have name of class", () => {
            var exception:com.maigo.core.exception.Exception = new com.maigo.core.exception.Exception();
            expect(exception.name).toBe("Exception");
        });

        it("should have message", () => {
            var exception:com.maigo.core.exception.Exception = new com.maigo.core.exception.Exception("message");
            expect(exception.message).toBe("message");
        });

        it("should have name of sub-class", () => {
            var exception:com.maigo.core.exception.Exception = new SubException("message");
            expect(exception.name).toBe("SubException");
        });
    });
}