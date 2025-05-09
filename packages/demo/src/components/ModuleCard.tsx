import { IModuleSerialize, ModuleType } from "@blibliki/engine";

type ModuleCardProps = {
  module: IModuleSerialize<ModuleType>;
};

const ModuleCard = ({ module }: ModuleCardProps) => {
  const { id, name, moduleType, props, inputs, outputs } = module;

  const handleInputChange = (key: string, value: string | number) => {
    console.log("lala");
  };

  return (
    <div className="border p-4 rounded-xl shadow-md bg-white w-64">
      <h2 className="font-bold text-lg mb-2">
        {name} ({moduleType})
      </h2>

      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Props</h3>
        {Object.entries(props).map(([key, value]) => (
          <div key={key} className="mb-1">
            <label className="block text-xs text-gray-500">{key}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="w-full text-sm p-1 border rounded"
            />
          </div>
        ))}
      </div>

      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Inputs</h3>
        <ul className="text-xs text-gray-600 list-disc list-inside">
          {inputs.map((input) => (
            <li key={input.id}>
              {input.name} ({input.ioType})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700">Outputs</h3>
        <ul className="text-xs text-gray-600 list-disc list-inside">
          {outputs.map((output) => (
            <li key={output.id}>
              {output.name} ({output.ioType})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModuleCard;
