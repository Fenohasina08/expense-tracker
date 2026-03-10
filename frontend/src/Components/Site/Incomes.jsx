import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentIncomes from "./ContentIncomes";

const Incomes = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden pt-[10vh]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-2 sm:p-4">
          <ContentIncomes />
        </main>
      </div>
    </div>
  );
};

export default Incomes;