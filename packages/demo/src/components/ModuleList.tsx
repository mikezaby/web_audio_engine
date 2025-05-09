import { useEngineStore } from "../store/useEngineStore";
import ModuleCard from "./ModuleCard";

const ModuleList = () => {
  const { modules } = useEngineStore();

  if (modules.length === 0) {
    return <p className="text-gray-500 text-sm">No modules added yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
};

export default ModuleList;
