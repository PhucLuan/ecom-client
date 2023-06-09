import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useTable } from 'react-table';

const CustomerComponent = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    customerId: 0,
    fullName: '',
    dob: '',
    email: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://localhost:7277/api/Customers').then((response) => {

      setData(response.data);

    });
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Customer ID', accessor: 'customerId' },
      { Header: 'Date of Birth', accessor: 'dob' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Full Name', accessor: 'fullName' },
    ],
    []
  );
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://localhost:7277/api/Customers', formData);
      setFormData({
        customerId: 0,
        fullName: '',
        dob: '',
        email: '',
      });
      fetchData(); // Refresh the data after successful creation
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Container className='mt-3'>
      <Row>
        <Col lg='5'>
          <Card>
            <Card.Header as="h5">Add Customer</Card.Header>
            <Card.Body className='text-start'>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFullName">
                  <Form.Label>Full Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDOB">
                  <Form.Label>Date of Birth:</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-2 float-end'>
                  Create
                </Button>
              </Form>


            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header as="h5">Customers</Card.Header>
            <Card.Body className='text-start'>
              {data.length == 0 ? <div>Loading...</div> :
                <table {...getTableProps()} className="table">
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(data.length / pageSize)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        /> */}
    </Container>
  );
}

export default CustomerComponent
