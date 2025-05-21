import { ChangeEvent } from "react";
import { Input, Label } from "@/components/ui";
import { TUpdateProps } from "..";

interface IGlobalProps {
  id: string;
  currentBar: number;
  bars: number;
  steps: number;
  setCurrentBar: (bar: number) => void;
  updateProps: TUpdateProps;
}

export default function GlobalProps(props: IGlobalProps) {
  const { id, currentBar, bars, steps, setCurrentBar, updateProps } = props;

  return (
    <div className="flex p-2">
      <Steps id={id} steps={steps} updateProps={updateProps} />
      <Bars id={id} bars={bars} updateProps={updateProps} />
      <CurrenrBar
        currentBar={currentBar}
        bars={bars}
        setCurrentBar={setCurrentBar}
      />
    </div>
  );
}

function Bars(props: { id: string; bars: number; updateProps: TUpdateProps }) {
  const { id, bars, updateProps } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateProps(id, { bars: +event.target.value });
  };

  return (
    <div>
      <Label htmlFor={`bars-${id}`}>Number of Bars</Label>
      <Input
        id={`bars-${id}`}
        type="number"
        onChange={onChange}
        className="w-[120px] mr-2"
        value={bars.toString()}
      />
    </div>
  );
}

function Steps(props: {
  id: string;
  steps: number;
  updateProps: TUpdateProps;
}) {
  const { id, steps, updateProps } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateProps(id, { steps: +event.target.value });
  };

  return (
    <div>
      <Label htmlFor={`steps-${id}`}>Number of Steps</Label>
      <Input
        id={`steps-${id}`}
        type="number"
        onChange={onChange}
        className="w-[120px] mr-2"
        value={steps}
      />
    </div>
  );
}

function CurrenrBar(props: {
  setCurrentBar: (bar: number) => void;
  currentBar: number;
  bars: number;
}) {
  const { currentBar, bars, setCurrentBar } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newBar = (+event.target.value - 1) % bars;
    setCurrentBar(Math.abs(newBar));
  };

  return (
    <div>
      <Label>Current Bar</Label>
      <Input
        type="number"
        onChange={onChange}
        className="w-[100px]"
        value={currentBar + 1}
      />
    </div>
  );
}
