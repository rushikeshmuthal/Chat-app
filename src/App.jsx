import { BrowserRouter, Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import Login from "./pages/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import { AuthContextProvider } from "./utils/AuthContext";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
