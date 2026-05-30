<<<<<<< HEAD
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

=======
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
export default PublicLayout;