import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { AppRoutes } from "./routes";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { Toaster } from "sonner";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
      <Toaster />
    </Provider>
  );
}

export default App;
