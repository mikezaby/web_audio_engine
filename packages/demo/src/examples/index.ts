import { create } from "zustand";

export type ExampleKey = "example1" | "filter";

export type ExampleMeta = {
  key: ExampleKey;
  label: string;
  description?: string;
};

const exampleRegistry: Record<ExampleKey, () => Promise<() => void>> = {
  example1: () => import("./example1").then((m) => m.load),
  filter: () => import("./filter").then((m) => m.load),
};

// Optional: example metadata for dropdowns, listings, etc.
export const exampleList: ExampleMeta[] = [
  { key: "example1", label: "Oscillator → Gain → Master" },
  { key: "filter", label: "Filter" },
];

type ExampleState = {
  currentExample: ExampleKey | null;
  setExample: (key: ExampleKey) => Promise<void>;
};

export const useExample = create<ExampleState>((set) => ({
  currentExample: null,

  setExample: async (key) => {
    set({ currentExample: key });

    const loadFn = await exampleRegistry[key]();
    loadFn();
  },
}));
