import { Engine } from "@blibliki/engine";
import { useEffect } from "react";

const Example1 = () => {
  useEffect(() => {
    const context = new AudioContext();
    const engine = new Engine(context);
    engine
      .initialize()
      .then(() => {
        console.log("initialize");
      })
      .catch(() => {});
  }, []);

  return <div>hello</div>;
};

export default Example1;
