import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DraggableSquere from './draggable_squere'
import reportWebVitals from './reportWebVitals';
import WindowPage from './WindowPage'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FilterableCustomTable from './TablePage'
import InputTest from './InputDudaev'
import NewTable from './NewTable';

const root_dom = document.getElementById('root')!;
const root = ReactDOM.createRoot(root_dom);

root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>        
        </Route>
        <Route path="/table" element={<FilterableCustomTable />}></Route>
        <Route path="/drag" element={<DraggableSquere />}> </Route>
        <Route path="/window" element={<WindowPage />}> </Route>
        <Route path="/input" element={<InputTest />}> </Route>
        <Route path="/new_table" element={<NewTable />}> </Route>


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
