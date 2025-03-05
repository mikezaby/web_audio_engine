import { describe, it, expect, beforeEach } from "vitest";
import { createModule, ModuleType } from "@/modules";
import Master from "@/modules/Master";
import "@/utils/nodePolyfill";

describe("Master", () => {
  let context: AudioContext;
  let master: Master;

  beforeEach(() => {
    context = new AudioContext();
    master = createModule(context, {
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
