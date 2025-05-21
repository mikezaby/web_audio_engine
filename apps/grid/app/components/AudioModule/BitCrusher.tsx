import Fader from "@/components/Fader";
import { TUpdateProps } from ".";
import Container from "./Container";

interface BitCrusherProps {
  id: string;
  updateProps: TUpdateProps;
  props: { bits: number; wet: number };
}

export default function BitCrusher(props: BitCrusherProps) {
  const {
    id,
    updateProps,
    props: { bits, wet },
  } = props;

  const updateProp = (propName: string) => (value: number) => {
    updateProps(id, { [propName]: value });
  };

  return (
    <Container>
      <Fader
        name="bits"
        min={1}
        max={16}
        step={1}
        onChange={updateProp("bits")}
        value={bits}
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
