import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useTable } from 'react-table';


const PurchaseComponent = () => {
    const [data, setData] = useState([]);
    const [productName, setProductName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`https://localhost:7277/api/Purchase/GetPurchasesData?productName=${productName}`).then((response) => {
                setData(response.data);
                //setError(null); // Clear any previous errors
            }).catch(
                x => setError(x.response.data)
            );
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Customer', accessor: 'customer' },
            { Header: 'Shop', accessor: 'shop' },
            { Header: 'Product', accessor: 'product' },
        ],
        []
    );

    const handleSearch = () => {
        fetchData();
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
                <Col>
                    <Col lg="6">
                        <Form className="d-flex mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Search by product name"
                                className="me-2"
                                aria-label="Search"
                                value={productName}
                                onChange={(event) => setProductName(event.target.value)}
                            />
                            <Button onClick={handleSearch} variant="outline-success">Search</Button>
                        </Form>
                    </Col>
                    {error &&
                        <div class="alert alert-danger" role="alert">{error}</div>}
                    <Card>
                        <Card.Header as="h5">Purchases</Card.Header>
                        <Card.Body className='text-start'>
                            {data.length === 0 ? <div>Loading...</div> :
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

export default PurchaseComponent
