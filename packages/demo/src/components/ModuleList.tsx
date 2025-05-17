import { useEngineStore } from "../store/useEngineStore";
import ModuleCard from "./ModuleCard";

const ModuleList = () => {
  const { modules } = useEngineStore();

  if (modules.length === 0) {
    return <p className="text-gray-500 text-sm">No modules added yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
};

export default ModuleList;
