import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useTable } from 'react-table';
import { useParams } from 'react-router-dom';
//import Pagination from 'react-js-pagination';

const ProductComponent = () => {
    const params = useParams();
    const shopId = params.shopid;
    const [data, setData] = useState([]);
    const [shopName, setShopName] = useState("");
    const [productName, setProductName] = useState("");
    const [formData, setFormData] = useState({
        productId: 0,
        name: '',
        price: 0,
        shopId: shopId
    });
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetchData();
        fetchShopName();
    }, []);
    const handleSearch = () => {
        fetchData();
    };
    const fetchShopName = () => {
        axios.get(`https://localhost:7277/api/Shops/GetShopName/${shopId}`).then((response) => {

            setShopName(response.data);

        });
    };
    const fetchData = () => {
        axios.get(`https://localhost:7277/api/Products?shopid=${shopId}&productname=${productName}`).then((response) => {
            setData(response.data);
        });
    };

    const columns = React.useMemo(
        () => [
            { Header: 'shopId ID', accessor: 'shopId' },
            { Header: 'product ID', accessor: 'productId' },
            { Header: 'Name', accessor: 'name' },
            { Header: 'Price', accessor: 'price' }
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
            await axios.post('https://localhost:7277/api/Products', formData)
            setFormData({
                    productId: 0,
                    name: '',
                    price: 0,
                    shopId: shopId
                });
                setProductName("");
                fetchData(); // Refresh the data after successful creation
        } catch (error) {
            console.error('Error creating Product:', error);
        }
    };

    // const handlePageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    //   };
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <Container className='mt-3'>
            <h1 className='text-start'>{shopName}</h1>
            <Row>
                <Col lg='5'>
                    <Card>
                        <Card.Header as="h5">Add Product</Card.Header>
                        <Card.Body className='text-start'>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Product Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLocation">
                                    <Form.Label>Product Price:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={formData.price}
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
                    <Card>
                        <Card.Header as="h5">Products</Card.Header>
                        <Card.Body className='text-start'>
                            {data.length === 0 ? <div>The shop has no products yet...</div> :
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
                                {/* <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={itemsPerPage}
                                totalItemsCount={100}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                                /> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductComponent
