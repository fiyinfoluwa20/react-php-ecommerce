import React,{ Suspense, lazy } from 'react';
// import App from './App';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Loader from "./components/includes/loader";
const App = React.lazy(() => import('./App'));

ReactDOM.render(
    <Suspense fallback={<Loader/>}>
      <Router>
        <App />
      </Router>
    </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
