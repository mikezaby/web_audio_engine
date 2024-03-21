import { pick } from "lodash";
import { Module, IModule } from "./core";
import {
  IChildParams,
  ICreateParams,
  ModuleType,
  createModule,
} from "./modules";

interface IUpdateModule<T extends ModuleType> {
  id: string;
  moduleType: T;
  changes: Partial<Omit<IChildParams<T>, "id">>;
}

class Engine {
  private static instance: Engine;
  modules: {
    [Identifier: string]: Module<ModuleType>;
  };

  public static getInstance(): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine();
    }

    return Engine.instance;
  }

  constructor() {
    this.modules = {};
  }

  addModule<T extends ModuleType>(params: ICreateParams) {
    const module = createModule(params);
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

  findModule(id: string) {
    const module = this.modules[id];
    if (!module) throw Error(`The module with id ${id} is not exists`);

    return module;
  }
}

export default Engine.getInstance();
