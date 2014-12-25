import "./App.css";
import Dashboard from "./Components/Dashboard.";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "./Components/Loader";
import { openRouter } from "./Router/OpenRouterData";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense fallback={<Loader />}>
        <Switch>
          {/* open route */}
          {openRouter.map((route, index) => {
            return (
              <Route
                path={route.path}
                component={route.component}
                exact={route.exact}
                key={index}
              />
            );
          })}
          {/* protected route */}
          <Route
            path="/"
            name="protected pages"
            render={(props) => <Dashboard {...props} />}
          />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
