import { describe, it, expect, beforeEach } from "vitest";
import { createModule, ModuleType } from "@/modules";
import Inspector from "@/modules/Inspector";
import Scale from "@/modules/Scale";
import { sleep } from "@/utils/time";

describe("Scale", () => {
  let scale: Scale;
  let amount: ConstantSourceNode;
  let inspector: Inspector;

  beforeEach((ctx) => {
    scale = createModule(ctx.audioContext, {
      name: "filterScale",
      moduleType: ModuleType.Scale,
      props: { min: 20, max: 20000, current: 440 },
    }) as Scale;

    amount = new ConstantSourceNode(ctx.audioContext);
    amount.start();

    inspector = createModule(ctx.audioContext, {
      name: "inspector",
      moduleType: ModuleType.Inspector,
      props: {},
    }) as Inspector;

    amount.connect(scale.audioNode);
    scale.audioNode.connect(inspector.audioNode);
  });

  describe("when amount is 1", () => {
    beforeEach(async () => {
      amount.offset.value = 1;
      await sleep(50);
    });

    it("it returns max value", () => {
      expect(inspector.getValue()).to.be.closeTo(20000, 1);
    });
  });

  describe("when amount is -1", () => {
    beforeEach(async () => {
      amount.offset.value = -1;
      await sleep(50);
    });

    it("it returns min value", () => {
      expect(inspector.getValue()).to.be.closeTo(20, 1);
    });
  });

  describe("when amount is 0", () => {
    beforeEach(async () => {
      amount.offset.value = 0;
      await sleep(50);
    });

    it("it returns min value", () => {
      expect(inspector.getValue()).to.be.closeTo(440, 1);
    });
  });

  describe("when amount is 0.5", () => {
    beforeEach(async () => {
      amount.offset.value = 0.5;
      await sleep(50);
    });

    it("it returns value between current and max", () => {
      expect(inspector.getValue()).to.be.closeTo(2966, 1);
    });
  });

  describe("when amount is -0.5", () => {
    beforeEach(async () => {
      amount.offset.value = -0.5;
      await sleep(50);
    });

    it("it returns value between current and min", () => {
      expect(inspector.getValue()).to.be.closeTo(93, 1);
    });
  });
});
