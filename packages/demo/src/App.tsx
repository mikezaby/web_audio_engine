import { JSX, LazyExoticComponent, Suspense, lazy, useState } from "react";

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

  const handleClick = (page: PageName) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div className="h-full flex font-sans text-sm">
      <aside className="w-48 bg-gray-100 p-4 border-r">
        <ul className="space-y-2">
          {Object.keys(pages).map((key) => (
            <li key={key}>
              <button
                onClick={() => {
                  handleClick(key as PageName);
                }}
                className="w-full text-left px-2 py-1 rounded hover:bg-gray-200"
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4 overflow-auto">
        <Suspense
          fallback={<div className="text-gray-500">Loading example...</div>}
        >
          <Page currentPage={currentPage} />
        </Suspense>
      </main>
    </div>
  );
}
