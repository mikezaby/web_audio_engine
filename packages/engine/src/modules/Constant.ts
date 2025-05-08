import { IAnyAudioContext, IModule, Module, Startable } from "@/core";
import Note from "@/core/Note";
import { nt, TTime } from "@/core/Timing/Time";
import { ICreateModule, ModuleType } from ".";

export type IConstant = IModule<ModuleType.Constant>;
export type IConstantProps = {
  value: number;
};

const DEFAULT_PROPS: IConstantProps = { value: 1 };

export default class Constant
  extends Module<ModuleType.Constant>
  implements Startable
{
  declare audioNode: ConstantSourceNode;
  isStated: boolean = false;

  constructor(
    context: IAnyAudioContext,
    params: ICreateModule<ModuleType.Constant>,
  ) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    const audioNode = new ConstantSourceNode(context);

    super(context, {
      ...params,
      props,
      audioNode,
    });

    this.registerDefaultIOs("out");
  }

  protected onSetValue(value: IConstantProps["value"]) {
    this.audioNode.offset.value = value;
  }

  start(time: TTime) {
    if (this.isStated) return;

    this.isStated = true;
    this.audioNode.start(nt(time));
  }

  stop(time: TTime) {
    this.audioNode.stop(nt(time));
    this.isStated = false;
  }

  triggerAttack = (note: Note, triggeredAt: TTime) => {
    this.audioNode.offset.setValueAtTime(note.frequency, nt(triggeredAt));
    this.start(triggeredAt);
  };

  triggerRelease = () => {
    // Do nothing
  };
}
