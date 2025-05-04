import Fader from "@/components/Fader";
import { TUpdateProps } from "..";
import Container from "../Container";

interface GainProps {
  id: string;
  name: string;
  updateProps: TUpdateProps;
  props: { gain: number };
}

export default function Gain(props: GainProps) {
  const {
    id,
    updateProps,
    props: { gain },
  } = props;

  const updateGain = (value: number) => {
    updateProps(id, { gain: value });
  };

  return (
    <Container>
      <Fader
        name="Gain"
        onChange={updateGain}
        value={gain}
        min={0}
        max={2}
        step={0.01}
      />
    </Container>
  );
}
