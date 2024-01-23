
import './App.css';
import TodayComponent from './components/pages/TodayComponent';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className='relative overflow-x-hidden'><TodayComponent /></div>,
  },
]);



function App() {


  return <RouterProvider router={router} />

}

export default App;
