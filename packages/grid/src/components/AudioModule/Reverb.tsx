import Fader from "@/components/Fader";
import { TUpdateProps } from ".";
import Container from "./Container";

interface ReverbProps {
  id: string;
  updateProps: TUpdateProps;
  props: { decay: number; preDelay: number; wet: number };
}

export default function Reverb(props: ReverbProps) {
  const {
    id,
    updateProps,
    props: { decay, preDelay, wet },
  } = props;

  const updateProp = (propName: string) => (value: number) => {
    updateProps(id, { [propName]: value });
  };

  return (
    <Container>
      <Fader
        name="decay"
        min={0}
        max={60}
        onChange={updateProp("decay")}
        value={decay}
      />
      <Fader
        name="preDelay"
        min={0}
        max={0.25}
        onChange={updateProp("preDelay")}
        value={preDelay}
      />
      <Fader
        name="wet"
        min={0}
        max={1}
        onChange={updateProp("wet")}
        value={wet}
      />
    </Container>
  );
}
