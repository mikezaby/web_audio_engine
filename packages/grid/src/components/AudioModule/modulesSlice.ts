import Engine, { IOProps } from "@blibliki/engine";
import { UpdateModuleProps } from "@blibliki/engine/dist/src/Engine";
import {
  createSlice,
  createSelector,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { XYPosition } from "reactflow";
import { addNode } from "@/components/Grid/gridNodesSlice";
import { AppDispatch, RootState } from "@/store";
import { AnyObject, Optional } from "@/types";

interface ModuleInterface {
  name: string;
  type: string;
  numberOfVoices?: number;
  props: AnyObject;
}

export interface ModuleProps extends ModuleInterface {
  id: string;
  inputs: IOProps[];
  outputs: IOProps[];
}

export const AvailableModules: {
  [key: string]: Optional<ModuleInterface, "props">;
} = {
  Master: { name: "Master", type: "Master" },
  Oscillator: { name: "Oscilator", type: "Oscillator" },
  Envelope: {
    name: "Envelope",
    type: "Envelope",
  },
  AmpEnvelope: {
    name: "Amp Envelope",
    type: "AmpEnvelope",
  },
  Filter: { name: "Filter", type: "Filter" },
  Volume: { name: "Volume", type: "Volume" },
  MidiSelector: {
    name: "Midi Selector",
    type: "MidiSelector",
  },
  VoiceScheduler: {
    name: "Voice Scheduler",
    type: "VoiceScheduler",
    props: { numberOfVoices: 1 },
  },
  VirtualMidi: { name: "VirtualMidi", type: "VirtualMidi" },
  Reverb: { name: "Reverb", type: "Reverb" },
  Delay: { name: "Delay", type: "Delay" },
  Distortion: { name: "Distortion", type: "Distortion" },
  BitCrusher: { name: "BitCrusher", type: "BitCrusher" },
  LFO: { name: "LFO", type: "LFO" },
  Sequencer: {
    name: "Sequencer",
    type: "Sequencer",
  },
};

const modulesAdapter = createEntityAdapter<ModuleProps>({});

export const modulesSlice = createSlice({
  name: "modules",
  initialState: modulesAdapter.getInitialState(),
  reducers: {
    addModule: modulesAdapter.addOne,
    updateModule: (state, update: PayloadAction<UpdateModuleProps>) => {
      const { id, ...changes } = Engine.updateModule(update.payload);
      return modulesAdapter.updateOne(state, {
        id,
        changes,
      });
    },
    removeModule: modulesAdapter.removeOne,
    updatePlainModule: modulesAdapter.updateOne,
    removeAllModules: modulesAdapter.removeAll,
  },
});

const { addModule: _addModule } = modulesSlice.actions;

export const { updateModule, updatePlainModule, removeAllModules } =
  modulesSlice.actions;

export const addModule =
  (params: { audioModule: ModuleInterface; position?: XYPosition }) =>
  (dispatch: AppDispatch) => {
    const { audioModule, position = { x: 0, y: 0 } } = params;
    const serializedModule = Engine.addModule(audioModule);
    dispatch(_addModule(serializedModule));

    dispatch(
      addNode({
        id: serializedModule.id,
        type: "audioNode",
        position,
        data: {},
      }),
    );
  };

export const addNewModule =
  (params: { type: string; position?: XYPosition }) =>
  (dispatch: AppDispatch) => {
    const { type, position } = params;
    const modulePayload = AvailableModules[type];
    dispatch(
      addModule({ audioModule: { props: {}, ...modulePayload }, position }),
    );
  };

export const removeModule =
  (id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const audioModule = modulesSelector.selectById(getState(), id);
    if (!audioModule) throw Error(`Audio module with id ${id} not exists`);

    Engine.removeModule(id);
    dispatch(modulesSlice.actions.removeModule(id));
  };

export const modulesSelector = modulesAdapter.getSelectors(
  (state: RootState) => state.modules,
);

export const selectModulesByType = createSelector(
  (state: RootState) => modulesSelector.selectAll(state),
  (_: RootState, type: string) => type,
  (modules: ModuleProps[], type: string) =>
    modules.filter((m) => m.type === type),
);

export default modulesSlice.reducer;
