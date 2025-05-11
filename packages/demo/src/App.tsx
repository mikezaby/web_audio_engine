import {
  JSX,
  LazyExoticComponent,
  Suspense,
  lazy,
  useEffect,
  useState,
} from "react";
import ModuleList from "./components/ModuleList";
import { useEngineStore } from "./store/useEngineStore";

const Example1 = lazy(() => import("./examples/Example1"));

enum PageName {
  example1 = "example1",
}

const pages: Record<PageName, LazyExoticComponent<() => JSX.Element>> = {
  [PageName.example1]: Example1,
};

const Page = (props: { currentPage: PageName | null }) => {
  const Comp = props.currentPage ? pages[props.currentPage] : null;
  return Comp ? <Comp /> : null;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageName | null>(null);
  const { init, start, stop, isStarted, dispose } = useEngineStore();

  useEffect(() => {
    init();
  }, [init]);

  const handleClick = (page: PageName) => {
    if (page !== currentPage) {
      dispose();
    }

    setCurrentPage(page);
  };

  const btnClassName = isStarted
    ? "bg-red-500 hover:bg-red-600"
    : "bg-green-500 hover:bg-green-600";

  return (
    <div className="h-screen flex flex-col font-sans text-sm text-gray-900 bg-gray-50">
      <header className="flex items-center justify-between px-4 py-2 border-b bg-white shadow-sm">
        <div className="text-lg font-semibold w-400">Blibliki examples</div>
        <div className="w-full">
          <button
            onClick={isStarted ? stop : start}
            className={`px-3 py-1 rounded text-white transition ${btnClassName}`}
          >
            {isStarted ? "Stop" : "Start"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 bg-white p-4 border-r border-gray-200 shadow-sm">
          <ul className="space-y-2">
            {Object.keys(pages).map((key) => (
              <li key={key}>
                <button
                  onClick={() => {
                    handleClick(key as PageName);
                  }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                >
                  {key}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-6 overflow-auto bg-white">
          <Suspense
            fallback={<div className="text-gray-500">Loading example...</div>}
          >
            <Page currentPage={currentPage} />
          </Suspense>
          <ModuleList />
        </main>
      </div>
    </div>
  );
}
