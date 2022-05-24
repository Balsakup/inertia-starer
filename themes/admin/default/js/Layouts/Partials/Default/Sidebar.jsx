import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {LayoutDashboard, Users} from 'lucide-react';
import {Link} from '@inertiajs/inertia-react';
import {route, routeIs} from '../../../utils/route';
import PropTypes from 'prop-types';

function NavLink({children, className, href}) {
    return <Link href={href} className={className}>{children}</Link>;
}

function Sidebar() {
    return (
        <Navbar expand="lg" variant="dark" className="navbar-vertical">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbar-menu"/>
                <Navbar.Brand>Toto</Navbar.Brand>
                <Navbar.Collapse id="navbar-menu">
                    <Nav className="pt-lg-3">
                        <Nav.Item className={routeIs('admin::dashboard') ? 'active' : undefined}>
                            <Nav.Link as={NavLink} href={route('admin::dashboard')}>
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <LayoutDashboard className="icon"/>
                                </span>
                                <span className="nav-link-title">Dashboard</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className={routeIs('admin::users.*') ? 'active' : undefined}>
                            <Nav.Link as={NavLink} href={route('admin::users.index')}>
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <Users className="icon"/>
                                </span>
                                <span className="nav-link-title">Users</span>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

NavLink.propTypes = {
    children: PropTypes.array.isRequired,
    className: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};

export default Sidebar;
