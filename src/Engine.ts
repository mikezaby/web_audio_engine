import { pick } from "lodash";
import { IModule, IAnyAudioContext } from "./core";
import { AnyModule, ICreateParams, ModuleType, createModule } from "./modules";
import { Startable } from "./core/Module";

interface IUpdateModule<T extends ModuleType> {
  id: string;
  moduleType: T;
  changes: Partial<Omit<ICreateParams<T>, "id" | "moduleType">>;
}

export class Engine {
  context: IAnyAudioContext;
  isStarted: boolean = false;

  modules: {
    [Identifier: string]: AnyModule;
  };

  constructor(context: IAnyAudioContext) {
    this.context = context;
    this.modules = {};
  }

  addModule<T extends ModuleType>(params: ICreateParams<T>) {
    const module = createModule<T>(this.context, params);
    this.modules[module.id] = module;

    return module.serialize() as IModule<T>;
  }

  updateModule<T extends ModuleType>(params: IUpdateModule<T>) {
    const module = this.findModule(params.id);
    if (module.moduleType !== params.moduleType) {
      throw Error(
        `The module id ${params.id} isn't moduleType ${params.moduleType}`,
      );
    }

    const updates = pick(params.changes, ["name", "props"]);
    Object.assign(module, updates);

    return module.serialize() as IModule<T>;
  }

  removeModule(id: string) {
    delete this.modules[id];
  }

  connect(outputModuleId: string, inputModuleId: string) {
    const output = this.findModule(outputModuleId);
    const input = this.findModule(inputModuleId);

    output.connect(input);
  }

  async start(time?: number) {
    await this.resume();

    time ??= this.context.currentTime;
    this.isStarted = true;

    Object.values(this.modules).forEach((m) => {
      const module = m as unknown as Startable;
      if (!module.start) return;

      module.start(time);
    });
  }

  stop(time?: number) {
    time ??= this.context.currentTime;
    this.isStarted = false;

    Object.values(this.modules).forEach((m) => {
      const module = m as unknown as Startable;
      if (!module.stop) return;

      module.stop(time);
    });
  }

  async resume() {
    return await this.context.resume();
  }

  findModule(id: string) {
    const module = this.modules[id];
    if (!module) throw Error(`The module with id ${id} is not exists`);

    return module;
  }
}
