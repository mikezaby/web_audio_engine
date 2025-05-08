import { IAnyAudioContext, IModule, Module } from "@/core";
import { ICreateModule, ModuleType } from ".";

export type IInspector = IModule<ModuleType.Inspector>;
export type IInspectorProps = {
  fftSize: number;
};

const DEFAULT_PROPS: IInspectorProps = { fftSize: 256 };

export default class Inspector extends Module<ModuleType.Inspector> {
  declare audioNode: AnalyserNode;
  private _buffer?: Float32Array;

  constructor(
    context: IAnyAudioContext,
    params: ICreateModule<ModuleType.Inspector>,
  ) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    const audioNode = new AnalyserNode(context);

    super(context, {
      ...params,
      props,
      audioNode,
    });

    this.registerDefaultIOs("in");
  }

  protected onSetFftSize(value: number) {
    this._buffer = new Float32Array(value);
  }

  get buffer() {
    if (this._buffer) return this._buffer;

    this._buffer = new Float32Array(this.props.fftSize);

    return this._buffer;
  }

  getValue(): number {
    return this.getValues()[0];
  }

  getValues(): Float32Array {
    this.audioNode.getFloatTimeDomainData(this.buffer);

    return this.buffer;
  }
}
