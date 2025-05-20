import { ModuleType } from "@blibliki/engine";
import Fader, { MarkProps } from "@/components/Fader";
import { ModuleComponent } from "..";
import Container from "../Container";

const Center: MarkProps[] = [{ value: 0, label: "-" }];

const WAVES: OscillatorType[] = ["sine", "triangle", "square", "sawtooth"];

const WAVE_MARKS: MarkProps[] = [
  { value: 0, label: "sin" },
  { value: 1, label: "tri" },
  { value: 2, label: "sqr" },
  { value: 3, label: "saw" },
];

const RANGES: MarkProps[] = [
  { value: -1, label: "" },
  { value: 0, label: "" },
  { value: 1, label: "" },
  { value: 2, label: "" },
];

const Oscillator: ModuleComponent<ModuleType.Oscillator> = (props) => {
  const {
    updateProp,
    props: { octave, coarse, fine, wave: waveName },
  } = props;

  const waveIndex = WAVES.findIndex((w) => w === waveName);

  const updateWaveProp = (value: number) => {
    updateProp("wave")(WAVES[value]);
  };

  return (
    <Container>
      <Fader
        name="Octave"
        marks={RANGES}
        min={-1}
        max={2}
        onChange={updateProp("octave")}
        value={octave}
      />
      <Fader
        name="Coarse"
        marks={Center}
        min={-1}
        max={1}
        step={0.01}
        onChange={updateProp("coarse")}
        value={coarse}
      />
      <Fader
        name="Fine"
        marks={Center}
        min={-1}
        max={1}
        step={0.01}
        onChange={updateProp("fine")}
        value={fine}
      />
      <Fader
        name="Wave"
        marks={WAVE_MARKS}
        onChange={updateWaveProp}
        value={waveIndex}
      />
    </Container>
  );
};

export default Oscillator;
