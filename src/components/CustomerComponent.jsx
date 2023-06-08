import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';

const CustomerComponent = () => {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
  
    useEffect(() => {
      fetchCustomers();
    }, []);
  
    const fetchCustomers = () => {
      axios.get('/api/customers').then((response) => {
        setCustomers(response.data);
      });
    };
  
    const handleCustomerSubmit = (e) => {
      e.preventDefault();
  
      axios.post('/api/customers', { name, email }).then(() => {
        fetchCustomers();
        setName('');
        setEmail('');
      });
    };
  
    const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected);
    };
  
    const offset = currentPage * pageSize;
    const paginatedCustomers = customers.slice(offset, offset + pageSize);
  
    return (
      <div>
        <h2>Customers</h2>
        <form onSubmit={handleCustomerSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit">Add Customer</button>
        </form>
        <ReactTable
          data={paginatedCustomers}
          columns={[
            { Header: 'ID', accessor: 'id' },
            { Header: 'Name', accessor: 'name' },
            { Header: 'Email', accessor: 'email' },
          ]}
          defaultPageSize={pageSize}
          className="-striped -highlight"
        />
        {/* <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(customers.length / pageSize)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        /> */}
      </div>
    );
}

export default CustomerComponent
