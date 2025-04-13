import { describe, it, expect, beforeEach } from "vitest";
import { createModule, ModuleType } from "@/modules";
import Master from "@/modules/Master";

describe("Master", () => {
  let master: Master;

  beforeEach((ctx) => {
    master = createModule(ctx.audioContext, {
      name: "master",
      moduleType: ModuleType.Master,
      props: {},
    }) as Master;
  });

  describe("Initialize", () => {
    it("it has proper type", () => {
      expect(master.moduleType).toBe(ModuleType.Master);
    });
  });
});
