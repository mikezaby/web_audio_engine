import { pick } from "lodash";
import {
  IAnyAudioContext,
  IModuleSerialize,
  Startable,
  IRoute,
  Routes,
} from "./core";
import { AnyModule, ICreateParams, ModuleType, createModule } from "./modules";
import { Optional } from "./utils/types";

interface IUpdateModule<T extends ModuleType> {
  id: string;
  moduleType: T;
  changes: Partial<Omit<ICreateParams<T>, "id" | "moduleType">>;
}

export class Engine {
  context: IAnyAudioContext;
  isStarted: boolean = false;
  routes: Routes;

  modules: {
    [Identifier: string]: AnyModule;
  };

  constructor(context: IAnyAudioContext) {
    this.context = context;
    this.routes = new Routes(this);
    this.modules = {};
  }

  addModule<T extends ModuleType>(params: ICreateParams<T>) {
    const module = createModule<T>(this.context, params);
    this.modules[module.id] = module;

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
    delete this.modules[id];
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

  findIO(moduleId: string, ioName: string, type: "input" | "output") {
    const module = this.findModule(moduleId);
    return module[`${type}s`].findByName(ioName);
  }
}
