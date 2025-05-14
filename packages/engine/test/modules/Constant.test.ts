import { sleep } from "@blibliki/utils";
import { describe, it, expect, beforeEach } from "vitest";
import { createModule, ModuleType } from "@/modules";
import Constant from "@/modules/Constant";
import Inspector from "@/modules/Inspector";

describe("Constant", () => {
  let constant: Constant;
  let inspector: Inspector;

  beforeEach((ctx) => {
    constant = createModule(ctx.engine.id, {
      name: "constant",
      moduleType: ModuleType.Constant,
      props: { value: 23 },
    }) as Constant;
    constant.start(0);

    inspector = createModule(ctx.engine.id, {
      name: "inspector",
      moduleType: ModuleType.Inspector,
      props: {},
    }) as Inspector;

    constant.audioNode.connect(inspector.audioNode);
  });

  describe("Initialize", () => {
    beforeEach(async () => {
      await sleep(50);
    });

    it("it returns proper value", () => {
      expect(inspector.getValue()).to.be.closeTo(23, 1);
    });
  });

  describe("Update value", () => {
    beforeEach(async () => {
      constant.props = { value: 30 };
      await sleep(50);
    });

    it("it returns proper value", () => {
      expect(inspector.getValue()).to.be.closeTo(30, 1);
    });
  });
});
