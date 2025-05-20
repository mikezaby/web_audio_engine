import Fader from "@/components/Fader";
import { TUpdateProps } from ".";
import Container from "./Container";

interface DelayProps {
  id: string;
  updateProps: TUpdateProps;
  props: { delayTime: number; feedback: number; wet: number };
}

export default function Delay(props: DelayProps) {
  const {
    id,
    updateProps,
    props: { delayTime, feedback, wet },
  } = props;

  const updateProp = (propName: string) => (value: number) => {
    updateProps(id, { [propName]: value });
  };

  return (
    <Container>
      <Fader
        name="delayTime"
        min={0}
        max={1}
        onChange={updateProp("delayTime")}
        value={delayTime}
      />
      <Fader
        name="feedback"
        min={0}
        max={1}
        onChange={updateProp("feedback")}
        value={feedback}
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
