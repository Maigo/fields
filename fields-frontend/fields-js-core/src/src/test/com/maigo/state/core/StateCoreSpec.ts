/// <reference path="../../../../../libs/jasmine.d.ts"/>
/// <reference path="../../../../../main/com/maigo/state/core/StateCore.ts"/>
/// <reference path="../../../../../main/com/maigo/state/core/StateCoreException.ts"/>
module com.maigo.core.util {

    describe("com.maigo.state.core.StateCore", () => {
        var stateCore:com.maigo.state.core.StateCore;

        beforeEach(() => {
            stateCore = new com.maigo.state.core.StateCore();
        });

        afterEach(() => {
            stateCore = null;
        });

        it("should add states", () => {
            stateCore.states(["0", "1", "2"]);
            expect(stateCore.hasState("0")).toBe(true);
            expect(stateCore.hasState("1")).toBe(true);
            expect(stateCore.hasState("2")).toBe(true);
        });

        it("should add transitions", () => {
            stateCore.states(["0", "1", "2"]).transitions("0", ["1", "2"]);
            expect(stateCore.hasTransition("0", "0")).toBe(false);
            expect(stateCore.hasTransition("1", "0")).toBe(true);
            expect(stateCore.hasTransition("2", "0")).toBe(true);
        });

        it("should set init state", () => {
            stateCore.states(["0", "1", "2"]).transitions("0", ["1", "2"]).init("0");
            expect(stateCore.state).toBe("0");
        });

        it("should not allow init state to be set twice", () => {
            stateCore.states(["0", "1", "2"]).transitions("0", ["1", "2"]).init("0");
            expect(() => { stateCore.init("1"); }).toThrow();
        });

        it("should not allow invalid transition configuration", () => {
            stateCore.states(["0", "1", "2"]);
            expect(() => { stateCore.transitions("3", ["1", "2"]); }).toThrow();
            expect(() => { stateCore.transitions("0", ["1", "2", "3"]); }).toThrow();
        });

        it("should not allow invalid state transition", () => {
            stateCore.states(["0", "1", "2"]).transitions("0", ["1", "2"]).init("0");
            expect(stateCore.state).toBe("0");
            expect(() => { stateCore.state = "0"; }).toThrow();
        });

    });
}