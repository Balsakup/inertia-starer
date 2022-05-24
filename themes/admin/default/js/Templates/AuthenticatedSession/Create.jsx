import React, {useState} from 'react';
import Auth from '../../Layouts/Auth';
import {Button, Card, Form, InputGroup, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Link, useForm} from '@inertiajs/inertia-react';
import {Eye, EyeOff} from 'lucide-react';
import {route} from '../../utils/route';

function Create() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {data, setData, post, processing, errors} = useForm({
        email: '',
        password: '',
        remember: false
    });

    function togglePasswordVisible(event) {
        event.preventDefault();
        setPasswordVisible(! passwordVisible);
    }

    function onSubmit(event) {
        event.preventDefault();

        post(route('admin::authenticated_session.store'), {
            preserveState: true
        });
    }

    return (
        <Form className="card card-md" autoComplete="off" onSubmit={onSubmit}>
            <Card.Body>
                <Card.Title className="text-center mb-4">Login to your account</Card.Title>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                                  value={data.email}
                                  onChange={(event) => setData('email', event.target.value)}
                                  placeholder="Enter email"
                                  isInvalid={errors.email}/>
                    {errors.email && (
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>
                        Password
                        <span className="form-label-description">
                            <Link href="#">I forgot password</Link>
                        </span>
                    </Form.Label>
                    <InputGroup className="input-group-flat">
                        <Form.Control type={passwordVisible ? 'text' : 'password'}
                                      value={data.password}
                                      onChange={(event) => setData('password', event.target.value)}
                                      placeholder="Password"
                                      isInvalid={errors.password}/>
                        <InputGroup.Text className={errors.password ? 'border-danger' : undefined}>
                            <OverlayTrigger overlay={
                                <Tooltip>{passwordVisible ? 'Hide password' : 'Show password'}</Tooltip>
                            }>
                                <Link href="#" className="link-secondary" onClick={togglePasswordVisible}>
                                    {passwordVisible ? <EyeOff className="icon"/> : <Eye className="icon"/>}
                                </Link>
                            </OverlayTrigger>
                        </InputGroup.Text>
                    </InputGroup>
                    {errors.password && (
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errors.password}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="remember">
                    <Form.Check type="checkbox"
                                checked={data.remember}
                                onChange={(event) => setData('remember', event.target.checked)}
                                label="Remember me on this devis"
                                isInvalid={errors.remember}
                                feedbackType="invalid"
                                feedback={errors.remember}/>
                </Form.Group>
                <div className="form-footer">
                    <Button type="submit" variant="primary" className="w-100" disabled={processing}>Sign in</Button>
                </div>
            </Card.Body>
        </Form>
    );
}

Create.layout = (page) => <Auth children={page}/>;

export default Create;
