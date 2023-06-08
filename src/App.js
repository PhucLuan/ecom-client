import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import CustomerComponent from './components/CustomerComponent';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <nav>
        <ul>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/shops">Shops</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/customers" element={<CustomerComponent />} />
      </Routes>
    </div>
  );
}

export default App;
