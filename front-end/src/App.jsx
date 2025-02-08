import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;
