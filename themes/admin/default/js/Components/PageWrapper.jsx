import React from 'react';
import {Link, usePage} from '@inertiajs/inertia-react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {route} from '../utils/route';
import {Plus, Save, Slash} from 'lucide-react';
import PropTypes from 'prop-types';

function ActionIcon({action}) {
    if (action.type === 'create') {
        return <Plus className="icon"/>;
    }

    if (action.type === 'save') {
        return <Save className="icon"/>;
    }

    if (action.type === 'cancel') {
        return <Slash className="icon"/>;
    }

    return '';
}

function Action({action, processing}) {
    if (action.type === 'save') {
        return (
            <Button type="submit" variant={action.variant} disabled={processing}>
                <ActionIcon action={action}/>
                {action.label}
            </Button>
        );
    }

    return (
        <Link href={route(action.route)} className={`btn btn-${action.variant}`}>
            <ActionIcon action={action}/>
            {action.label}
        </Link>
    );
}

function Wrapper({children, onSubmit}) {
    if (onSubmit) {
        return (
            <Form className="page-wrapper" onSubmit={onSubmit}>
                {children}
            </Form>
        );
    }

    return <div className="page-wrapper">{children}</div>;
}

function PageWrapper({children, onSubmit, processing}) {
    const {title, actions} = usePage().props;

    return (
        <Wrapper children={children} onSubmit={onSubmit}>
            <Container fluid="xl">
                <div className="page-header d-print-none">
                    <Row className="g-2 align-items-center">
                        <Col>
                            <h1 className="page-title">{title}</h1>
                        </Col>
                        <Col md="auto" className="ms-auto">
                            <div className="btn-list">
                                {(actions ?? []).map((action, index) => (
                                    <Action action={action} processing={processing} key={`action-${index}`}/>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <div className="page-body">
                <Container fluid="xl">
                    {children}
                </Container>
            </div>
        </Wrapper>
    );
}

ActionIcon.propTypes = {
    action: PropTypes.object.isRequired
};

Action.propTypes = {
    action: PropTypes.object.isRequired,
    processing: PropTypes.bool
};

Wrapper.propTypes = {
    children: PropTypes.array.isRequired,
    onSubmit: PropTypes.func
};

PageWrapper.propTypes = {
    children: PropTypes.element.isRequired,
    onSubmit: PropTypes.func,
    processing: PropTypes.bool
};

export default PageWrapper;
