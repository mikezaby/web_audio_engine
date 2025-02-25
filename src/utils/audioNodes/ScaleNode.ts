import { IAnyAudioContext } from "@/core";

const expMin = 1e-10;

export class ScaleNode {
  private min: number;
  private max: number;
  private current: number;

  output: WaveShaperNode;

  constructor({
    context,
    min,
    max,
    current,
  }: {
    context: IAnyAudioContext;
    min: number;
    max: number;
    current: number;
  }) {
    this.min = min;
    this.max = max;
    this.current = current;

    this.output = new WaveShaperNode(context, {
      curve: this.createExpCurve(),
      oversample: "4x",
    });
  }

  connect(node: AudioNode | AudioParam) {
    if (node instanceof AudioNode) {
      this.output.connect(node);
    } else {
      this.output.connect(node);
    }
  }

  private createExpCurve(): Float32Array {
    const N = 256;
    const curve = new Float32Array(N);
    const effectiveMin = this.min === 0 ? expMin : this.min;

    for (let i = 0; i < N; i++) {
      const normalizedAmount = (i / (N - 1)) * 2 - 1;

      if (normalizedAmount < 0) {
        curve[i] =
          this.current *
          Math.pow(effectiveMin / this.current, -normalizedAmount);
      } else {
        curve[i] =
          this.current * Math.pow(this.max / this.current, normalizedAmount);
      }
    }
    return curve;
  }
}
