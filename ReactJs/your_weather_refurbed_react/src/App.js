
import './App.css';
import TodayComponent from './components/pages/TodayComponent';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TomorrowComponent from './components/pages/TomorrowComponent';
import ThreeDaysComponent from './components/pages/ThreeDaysComponent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className='relative overflow-x-hidden text-[#023047] h-screen w-screen flex'><TodayComponent /></div>,
  },
  {
    path: "/tomorrow",
    element: <div className='relative overflow-x-hidden text-[#023047]'><TomorrowComponent /></div>,
  },
  {
    path: "/threeDays",
    element: <div className='relative overflow-x-hidden text-[#023047]'><ThreeDaysComponent /></div>,
  },
]);



function App() {


  return <RouterProvider router={router} />

}

export default App;
