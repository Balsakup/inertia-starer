import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {Users} from 'lucide-react';
import PageWrapper from '../../Components/PageWrapper';

function Index({users_count}) {
    return (
        <PageWrapper>
            <Row>
                <Col md={6} xl={3}>
                    <Card className="card-sm">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <span className="bg-success text-white avatar">
                                        <Users className="icon"/>
                                    </span>
                                </Col>
                                <Col>
                                    <div className="font-weight-medium">{users_count}</div>
                                    <div className="text-muted">Active users</div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </PageWrapper>
    );
}

export default Index;
