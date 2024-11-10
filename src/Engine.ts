import { pick } from "lodash";
import { IAnyAudioContext, IModuleSerialize, IRoute, Routes } from "./core";
import { AnyModule, ICreateParams, ModuleType, createModule } from "./modules";
import { Optional } from "./utils/types";
import { isStartable } from "./core/Module";

interface IUpdateModule<T extends ModuleType> {
  id: string;
  moduleType: T;
  changes: Partial<Omit<ICreateParams<T>, "id" | "moduleType">>;
}

export class Engine {
  context: IAnyAudioContext;
  isStarted: boolean = false;
  routes: Routes;
  modules: Map<string, AnyModule>;

  constructor(context: IAnyAudioContext) {
    this.context = context;
    this.routes = new Routes(this);
    this.modules = new Map();
  }

  addModule<T extends ModuleType>(params: ICreateParams<T>) {
    const module = createModule<T>(this.context, params);
    this.modules.set(module.id, module);

    return module.serialize() as IModuleSerialize<T>;
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

    return module.serialize() as IModuleSerialize<T>;
  }

  removeModule(id: string) {
    this.modules.delete(id);
  }

  addRoute(props: Optional<IRoute, "id">) {
    this.routes.addRoute(props);
  }

  remoteRoute(id: string) {
    this.routes.removeRoute(id);
  }

  async start(time?: number) {
    await this.resume();

    time ??= this.context.currentTime;
    this.isStarted = true;

    this.modules.forEach((module) => {
      if (!isStartable(module)) return;

      module.start(time);
    });
  }

  stop(time?: number) {
    time ??= this.context.currentTime;
    this.isStarted = false;

    this.modules.forEach((module) => {
      if (!isStartable(module)) return;

      module.stop(time);
    });
  }

  async resume() {
    await this.context.resume();
  }

  findModule(id: string) {
    const module = this.modules.get(id);
    if (!module) throw Error(`The module with id ${id} is not exists`);

    return module;
  }

  findIO(moduleId: string, ioName: string, type: "input" | "output") {
    const module = this.findModule(moduleId);
    return module[`${type}s`].findByName(ioName);
  }
}
