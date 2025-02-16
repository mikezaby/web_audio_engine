import { Engine, ModuleType } from "blibliki";

const context = new AudioContext();
const engine = new Engine(context);
await engine.initialize();

const midiDevices = Array.from(engine.midiDeviceManager.devices.values());

const midiSelector = engine.addModule({
  name: "midi selector",
  moduleType: ModuleType.MidiSelector,
  props: {},
});

const osc = engine.addModule({
  name: "osc",
  moduleType: ModuleType.Oscillator,
  props: { wave: "sine", frequency: 440 },
});

const lfo = engine.addModule({
  name: "osc",
  moduleType: ModuleType.Oscillator,
  props: { wave: "sine", frequency: 2 },
});

const vol = engine.addModule({
  name: "vol",
  moduleType: ModuleType.Volume,
  props: { volume: 0.01 },
});

const master = engine.addModule({
  name: "master",
  moduleType: ModuleType.Master,
  props: {},
});

engine.addRoute({
  source: { moduleId: osc.id, ioName: "out" },
  destination: { moduleId: vol.id, ioName: "in" },
});
engine.addRoute({
  source: { moduleId: lfo.id, ioName: "out" },
  destination: { moduleId: osc.id, ioName: "detune" },
});
engine.addRoute({
  source: { moduleId: vol.id, ioName: "out" },
  destination: { moduleId: master.id, ioName: "in" },
});
engine.addRoute({
  source: { moduleId: midiSelector.id, ioName: "midi out" },
  destination: { moduleId: osc.id, ioName: "midi in" },
});

declare global {
  interface Window {
    toggle: () => Promise<void>;
    handleDeviceChange: (selectedId: string) => void;
  }
}

window.toggle = async () => {
  if (engine.isStarted) {
    engine.stop();
  } else {
    await engine.start();
  }
};

window.handleDeviceChange = (selectedId: string) => {
  engine.updateModule({
    id: midiSelector.id,
    moduleType: midiSelector.moduleType,
    changes: { props: { selectedId } },
  });
};

const appEl = document.querySelector<HTMLDivElement>("#app");
if (!appEl) {
  throw Error("Application container #app not found");
}

appEl.innerHTML = `
<div>
  <h1>Hi from blibliki</h1>

  <div>
    <h2>Select a MIDI Device</h2>
    <select id="midi-device-select" onchange="handleDeviceChange(this.value)">
      <option value="">Select a device...</option>
      ${midiDevices.map((device) => `<option value="${device.id}">${device.name}</option>`).join()}
    </select>
  </div>

  <button onclick="toggle()">toggle</button>
</div>
`;
