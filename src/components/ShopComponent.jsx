import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';

const ShopComponent = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        shopId: 0,
        name: '',
        location: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('https://localhost:7277/api/Shops').then((response) => {

            setData(response.data);

        });
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Shop ID', accessor: 'shopId' },
            { Header: 'Name', accessor: 'name' },
            { Header: 'Location', accessor: 'location' },
            {
                Header: 'Action',
                Cell: ({ row }) => (
                    <Button as={Link} to={`/Shop/${row.original.shopId}/Product`} variant="primary">
                        Go to Products
                    </Button>
                ),
            }
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
            await axios.post('https://localhost:7277/api/Shops', formData);
            setFormData({
                ShopId: 0,
                fullName: '',
                dob: '',
                email: '',
            });
            fetchData(); // Refresh the data after successful creation
        } catch (error) {
            console.error('Error creating Shop:', error);
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
            <Row>
                <Col lg='5'>
                    <Card>
                        <Card.Header as="h5">Add Shop</Card.Header>
                        <Card.Body className='text-start'>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Shop Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLocation">
                                    <Form.Label>Shop Location:</Form.Label>
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
                        <Card.Header as="h5">Shops</Card.Header>
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
        </Container>
    );
}

export default ShopComponent
