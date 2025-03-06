import { describe, it, expect, beforeEach } from "vitest";
import { createModule, ModuleType } from "@/modules";
import Inspector from "@/modules/Inspector";

describe("Inspector", () => {
  let currentModule: Inspector;

  beforeEach((ctx) => {
    currentModule = createModule(ctx.audioContext, {
      name: "inspector",
      moduleType: ModuleType.Inspector,
      props: {},
    }) as Inspector;
  });

  describe("Initialize", () => {
    it("has proper type", () => {
      expect(currentModule.moduleType).toBe(ModuleType.Inspector);
    });

    it("has default props", () => {
      expect(currentModule.props.fftSize).toBe(256);
    });

    it("has buffer", () => {
      const array = new Float32Array(256);

      expect(currentModule.buffer).to.be.eql(array);
    });
  });
});
