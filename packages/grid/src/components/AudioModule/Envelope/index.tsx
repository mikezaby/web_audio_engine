import Fader from "@/components/Fader";
import { TUpdateProps } from "..";
import Container from "../Container";

interface EnvelopeProps {
  id: string;
  updateProps: TUpdateProps;
  props: { attack: number; decay: number; sustain: number; release: number };
}

export default function Envelope(props: EnvelopeProps) {
  const {
    id,
    updateProps,
    props: { attack, decay, sustain, release },
  } = props;

  const updateProp = (propName: string) => (value: number | string) => {
    updateProps(id, { [propName]: value });
  };

  return (
    <Container>
      <Fader name="A" onChange={updateProp("attack")} value={attack} />
      <Fader name="D" onChange={updateProp("decay")} value={decay} />
      <Fader name="S" onChange={updateProp("sustain")} value={sustain} />
      <Fader name="R" onChange={updateProp("release")} value={release} />
    </Container>
  );
}
