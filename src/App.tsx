import "./App.scss";
import ApplicationForm from "pages/ApplicationForm";
import Layout from "components/layout/Layout";
import { Outlet, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<ApplicationForm />} />
      </Route>
    </Routes>
  );
}

export default App;
