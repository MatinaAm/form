import logo from './logo.svg';
import './App.scss';
import "./styles/main.scss";
import { Button } from 'antd';
import DataTable from "./Table";
import ModalForm from "./Form";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
 <div className="container">
   <ToastContainer
     position="top-left"
     autoClose={3000}
     hideProgressBar={false}
     closeOnClick
   />

   <DataTable/>
   <ModalForm />

 </div>
  );
}

export default App;
