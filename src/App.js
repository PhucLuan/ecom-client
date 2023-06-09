import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import CustomerComponent from './components/CustomerComponent';
import ShopComponent from './components/ShopComponent';
import ProductComponent from './components/ProductComponent';
import PurchaseComponent from './components/PurchaseComponent';
import { Nav, Navbar, Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/customers">Customers</Nav.Link>
            <Nav.Link as={NavLink} to="/shops">Shops</Nav.Link>
            <Nav.Link as={NavLink} to="/purchases">Purchases</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<CustomerComponent />} />
        <Route path="/customers" element={<CustomerComponent />} />
        <Route path="/Shop/:shopid/Product" element={<ProductComponent />} />
        <Route path="/shops" element={<ShopComponent />} />
        <Route path="/purchases" element={<PurchaseComponent />} />
      </Routes>
    </div>
  );
}

export default App;
