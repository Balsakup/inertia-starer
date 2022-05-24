import React from 'react';
import {Card, Col, Form, Row} from 'react-bootstrap';
import {useForm} from '@inertiajs/inertia-react';
import PageWrapper from '../../Components/PageWrapper';
import PropTypes from 'prop-types';
import {route} from '../../utils/route';

function Edit({user, roles}) {
    const {data, setData, put, processing, errors} = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role_id: user.roles.length ? user.roles[0].id : ''
    });

    function onSubmit(event) {
        event.preventDefault();

        put(route('admin::users.update', {user}));
    }

    return (
        <PageWrapper onSubmit={onSubmit} processing={processing}>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header>Information</Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3" controlId="first_name">
                                <Form.Label>
                                    First name
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control value={data.first_name}
                                              onChange={(event) => setData('first_name', event.target.value)}
                                              placeholder="First name"
                                              isInvalid={errors.first_name}/>
                                {errors.first_name && (
                                    <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="last_name">
                                <Form.Label>
                                    Last name
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control value={data.last_name}
                                              onChange={(event) => setData('last_name', event.target.value)}
                                              placeholder="Last name"
                                              isInvalid={errors.last_name}/>
                                {errors.last_name && (
                                    <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>
                                    Email
                                    <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control type="email"
                                              value={data.email}
                                              onChange={(event) => setData('email', event.target.value)}
                                              placeholder="Email"
                                              isInvalid={errors.email}/>
                                {errors.email && (
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mt-3 mt-md-0">
                    <Card className="h-100">
                        <Card.Header>Security</Card.Header>
                        <Card.Body>
                            <Form.Group controlId="role_id">
                                <Form.Label>Role</Form.Label>
                                <Form.Select value={data.role_id}
                                             onChange={(event) => setData('role_id', event.target.value)}
                                             isInvalid={errors.role_id}>
                                    <option value="" disabled>Role</option>
                                    {roles.map((role) => (
                                        <option value={role.id} key={`role-${role.id}`}>{role.name}</option>
                                    ))}
                                </Form.Select>
                                {errors.role_id && (
                                    <Form.Control.Feedback type="invalid">{errors.role_id}</Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </PageWrapper>
    );
}

Edit.propTypes = {
    roles: PropTypes.array.isRequired
};

export default Edit;
