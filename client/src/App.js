
import {  Route, Routes } from "react-router-dom";
import TaskPage from "./page/Task/task";



export default function App() {
  return (
    <Routes>
   <Route path="/" element={<TaskPage />} />
   
</Routes>
  )
}