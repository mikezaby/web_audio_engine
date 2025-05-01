import { sleep } from "@blibliki/utils";
import { describe, it, expect, beforeEach } from "vitest";
import { createModule, ModuleType } from "@/modules";
import Constant from "@/modules/Constant";
import Inspector from "@/modules/Inspector";

describe("Constant", () => {
  let constant: Constant;
  let inspector: Inspector;

  beforeEach((ctx) => {
    constant = createModule(ctx.audioContext, {
      name: "constant",
      moduleType: ModuleType.Constant,
      props: { value: 23 },
    }) as Constant;
    constant.start(0);

    inspector = createModule(ctx.audioContext, {
      name: "inspector",
      moduleType: ModuleType.Inspector,
      props: {},
    }) as Inspector;

    constant.audioNode.connect(inspector.audioNode);
  });

  describe("when amount is 1", () => {
    beforeEach(async () => {
      await sleep(50);
    });

    it("it returns max value", () => {
      expect(inspector.getValue()).to.be.closeTo(23, 1);
    });
  });
});
