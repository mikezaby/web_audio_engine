import Engine from "@blibliki/engine";
import { createSlice } from "@reduxjs/toolkit";
import { updatePlainModule } from "@/components/AudioModule/modulesSlice";
import { initialize as patchInitialize, loadById } from "@/patchSlice";
import { AppDispatch, RootState } from "@/store";

interface IContext {
  latencyHint: "interactive" | "playback";
  lookAhead?: number;
}

interface GlobalProps {
  isInitialized: boolean;
  isStarted: boolean;
  context: IContext;
  bpm: number;
}

const initialState: GlobalProps = {
  isInitialized: false,
  isStarted: false,
  context: { latencyHint: "interactive", lookAhead: 0.05 },
  bpm: 120,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAttributes: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const initialize =
  (patchId?: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { context, bpm } = getState().global;

    Engine.initialize({ context });
    Engine.bpm = bpm;

    if (patchId) {
      dispatch(loadById(patchId));
    } else {
      dispatch(patchInitialize());
    }

    Engine.onPropsUpdate((id, props) => {
      dispatch(updatePlainModule({ id, changes: { props } }));
    });

    return dispatch(
      setAttributes({
        isInitialized: true,
        isStarted: Engine.isStarted,
        bpm: Engine.bpm,
      }),
    );
  };

export const start = () => (dispatch: AppDispatch) => {
  Engine.start();
  dispatch(setAttributes({ isStarted: true }));
};

export const stop = () => (dispatch: AppDispatch) => {
  Engine.stop();
  dispatch(setAttributes({ isStarted: false }));
};

export const setBpm = (bpm: number) => (dispatch: AppDispatch) => {
  Engine.bpm = bpm;
  dispatch(setAttributes({ bpm }));
};

export const dispose = () => () => {
  Engine.stop();
};

export const { setAttributes } = globalSlice.actions;

export default globalSlice.reducer;
