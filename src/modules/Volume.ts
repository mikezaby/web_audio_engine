import { IChildParams, ModuleType } from ".";
import Module, { IModule } from "../core/Module";

export interface IVolume extends IModule<ModuleType.Volume> {}

export interface IVolumeProps {
  volume: number;
}

const DEFAULT_PROPS: IVolumeProps = { volume: 100 };

export default class Volume extends Module<ModuleType.Volume> {
  constructor(params: IChildParams<ModuleType.Volume>) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    super({ ...params, props, moduleType: ModuleType.Volume });
  }
}
