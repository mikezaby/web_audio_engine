import { pick } from "lodash";
import { Module, IModule } from "./core";
import { ICreateParams, ModuleType, createModule } from "./modules";

interface IUpdateModule<T extends ModuleType> {
  id: string;
  moduleType: T;
  changes: Partial<Omit<ICreateParams<T>, "id" | "moduleType">>;
}

export class Engine {
  modules: {
    [Identifier: string]: Module<ModuleType>;
  };

  constructor() {
    this.modules = {};
  }

  addModule<T extends ModuleType>(params: ICreateParams<T>) {
    const module = createModule<T>(params);
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
