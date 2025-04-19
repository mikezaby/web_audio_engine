import { SequenceProps } from ".";

interface IStep {
  step: number;
  selectedStep: number;
  sequence: SequenceProps;
  updateCallback: (props: Partial<SequenceProps>) => void;
  selectCallback: () => void;
}

const DEFAULT_CLASS = "w-[36px] h-[36px] btn-circle";

const ACTIVE_CLASS = `${DEFAULT_CLASS} primary`;
const INACTIVE_CLASS = `${DEFAULT_CLASS} ring-1 secondary`;

export default function Step(props: IStep) {
  const { step, selectedStep, sequence, updateCallback, selectCallback } =
    props;
  const className = sequence.active ? ACTIVE_CLASS : INACTIVE_CLASS;

  const onClick = () => {
    if (step !== selectedStep) {
      selectCallback();
      return;
    }

    updateCallback({ active: !sequence.active });
  };

  return (
    <li className="flex flex-col items-center gap-[6px] p-[4px] mt-2 ml-2">
      <button onClick={onClick} className={className}>
        {step + 1}
      </button>
    </li>
  );
}
