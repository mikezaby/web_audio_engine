import { Engine, ModuleType, TransportState } from "@blibliki/engine";

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
  props: { wave: "sawtooth", frequency: 440 },
});
const osc2 = engine.addModule({
  name: "osc",
  moduleType: ModuleType.Oscillator,
  props: { wave: "sine", frequency: 0.5 },
});

const vol = engine.addModule({
  name: "vol",
  moduleType: ModuleType.Volume,
  props: { volume: 0.1 },
});

const envelope = engine.addModule({
  name: "envelope",
  moduleType: ModuleType.Envelope,
  props: {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0.3,
  },
});

const filterEnv = engine.addModule({
  name: "filterEnv",
  moduleType: ModuleType.Envelope,
  props: {
    attack: 0.3,
    decay: 0.2,
    sustain: 0,
    release: 0.3,
  },
});

const filter = engine.addModule({
  name: "filter",
  moduleType: ModuleType.Filter,
  props: { cutoff: 100, envelopeAmount: 1 },
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
  source: { moduleId: vol.id, ioName: "out" },
  destination: { moduleId: envelope.id, ioName: "in" },
});
engine.addRoute({
  source: { moduleId: envelope.id, ioName: "out" },
  destination: { moduleId: filter.id, ioName: "in" },
});
engine.addRoute({
  source: { moduleId: osc2.id, ioName: "out" },
  destination: { moduleId: filter.id, ioName: "cutoffMod" },
});
engine.addRoute({
  source: { moduleId: filter.id, ioName: "out" },
  destination: { moduleId: master.id, ioName: "in" },
});

engine.addRoute({
  source: { moduleId: midiSelector.id, ioName: "midi out" },
  destination: { moduleId: osc.id, ioName: "midi in" },
});
engine.addRoute({
  source: { moduleId: midiSelector.id, ioName: "midi out" },
  destination: { moduleId: envelope.id, ioName: "midi in" },
});
engine.addRoute({
  source: { moduleId: midiSelector.id, ioName: "midi out" },
  destination: { moduleId: filterEnv.id, ioName: "midi in" },
});

declare global {
  interface Window {
    toggle: () => void;
    handleDeviceChange: (selectedId: string) => void;
  }
}

window.toggle = () => {
  if (engine.state === TransportState.playing) {
    engine.stop();
  } else {
    engine.start();
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
