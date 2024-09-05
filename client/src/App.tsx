import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./routes/index";
import useThemeStore from "./app/themeStore";
import Logo from "./components/Logo";
import LoaderSpinner from "./components/LoaderSpinner";
import { userApi } from "./http";
import useApi from "./hooks/useApi";
import useAuthStore from "./app/authStore";

function App() {
  const { theme, setTheme } = useThemeStore();
  const { handler, isLoading } = useApi(userApi.getUserProfile);
  const { login, logout } = useAuthStore();

  useEffect(() => {
    document.body.className = theme;
  }, [theme, setTheme]);

  useEffect(() => {
    (async () => {
      const { responseData, success } = await handler();
      if (success) {
        login(responseData?.data?.user);
      } else {
        logout();
      }
    })();
  }, []);

  return isLoading ? (
    <div className="h-screen w-screen bg-primary-foreground flex flex-col gap-24 justify-center items-center">
      <Logo className="text-4xl" />
      <LoaderSpinner />
    </div>
  ) : (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
