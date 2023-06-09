import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductComponent = ({ match }) => {
    const params = useParams();
    const shopId = params.shopid;
    const [data, setData] = useState([]);
    const [shopName, setShopName] = useState("");
    const [formData, setFormData] = useState({
        "productId": 0,
        "name": "Product 135",
        "price": 1350,
        "shopId": 1,
    });

    useEffect(() => {
        fetchData();
        fetchShopName();
    }, []);

    const fetchShopName = () => {
        axios.get(`https://localhost:7277/api/Shops/GetShopName/${shopId}`).then((response) => {

        setShopName(response.data);

        });
    };
    const fetchData = () => {
        axios.get(`https://localhost:7277/api/Products?shopid=${shopId}`).then((response) => {

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
            await axios.post('https://localhost:7277/api/Products', formData);
            setFormData({
                ProductId: 0,
                fullName: '',
                dob: '',
                email: '',
            });
            fetchData(); // Refresh the data after successful creation
        } catch (error) {
            console.error('Error creating Product:', error);
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
        <Container className='mt-5'>
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
                                    <Form.Label>Product Location:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={formData.location}
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
                        <Card.Header as="h5">Products</Card.Header>
                        <Card.Body className='text-start'>
                            {data.length == 0 ? <div>The shop has no products yet...</div> :
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
        </Container>
    );
}

export default ProductComponent
