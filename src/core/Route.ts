import { v4 as uuidv4 } from "uuid";
import { Optional } from "../utils/types";
import { Engine } from "../Engine";

interface IPlug {
  moduleId: string;
  ioName: string;
}

export interface IRoute {
  id: string;
  source: IPlug;
  destination: IPlug;
}

export class Routes {
  engine: Engine;
  routes: { [key: string]: IRoute };

  constructor(engine: Engine) {
    this.engine = engine;
    this.routes = {};
  }

  addRoute(props: Optional<IRoute, "id">) {
    const id = props.id || uuidv4();
    this.routes[id] = { ...props, id };

    this.plug(id);
  }

  removeRoute(id: string) {
    this.unPlug(id);
    delete this.routes[id];
  }

  private plug(id: string) {
    const { sourceIO, destinationIO } = this.getIOs(id);
    sourceIO.plug(destinationIO);
  }

  private unPlug(id: string) {
    const { sourceIO, destinationIO } = this.getIOs(id);
    sourceIO.unPlug(destinationIO);
  }

  private find(id: string): IRoute {
    if (!this.routes[id]) throw Error(`Route with id ${id} not found`);

    return this.routes[id];
  }

  private getIOs(id: string) {
    const route = this.find(id);
    const { source, destination } = route;

    const sourceIO = this.engine.findIO(
      source.moduleId,
      source.ioName,
      "output",
    );
    const destinationIO = this.engine.findIO(
      destination.moduleId,
      destination.ioName,
      "input",
    );

    return { sourceIO, destinationIO };
  }
}
