import { describe, it, expect, beforeEach } from "vitest";
import { InspectorNode } from "@/utils/audioNodes/InspectorNode";
import { ScaleNode } from "@/utils/audioNodes/ScaleNode";
import "@/utils/nodePolyfill";
import { sleep } from "@/utils/time";

describe("ScaleNode", () => {
  let context: AudioContext;
  let scale: ScaleNode;
  let amount: ConstantSourceNode;
  let inspector: InspectorNode;

  beforeEach(async () => {
    context = new AudioContext();
    await context.resume();

    scale = new ScaleNode({ context, min: 20, max: 20000, current: 440 });

    amount = new ConstantSourceNode(context);
    amount.start();

    inspector = new InspectorNode(context);

    amount.connect(scale.output);
    scale.connect(inspector.input);
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
