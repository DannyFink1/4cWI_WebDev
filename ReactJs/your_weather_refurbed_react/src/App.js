
import './App.css';
import TodayComponent from './components/pages/TodayComponent';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TomorrowComponent from './components/pages/TomorrowComponent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className='relative overflow-x-hidden'><TodayComponent /></div>,
  },
  {
    path: "/tomorrow",
    element: <div className='relative overflow-x-hidden'><TomorrowComponent /></div>,
  },
]);



function App() {


  return <RouterProvider router={router} />

}

export default App;
