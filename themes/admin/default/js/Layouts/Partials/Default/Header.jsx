import React from 'react';
import {Container, Dropdown, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link, usePage} from '@inertiajs/inertia-react';
import {LogOut} from 'lucide-react';
import {route} from '../../../utils/route';
import PropTypes from 'prop-types';

function HeaderUserNav() {
    const {auth} = usePage().props;

    return (
        <>
            <img src={auth.thumb_avatar_url}
                 alt={`${auth.full_name}'s avatar`}
                 className="avatar avatar-sm"/>
            <div className="d-none d-xl-block ps-2">
                <div>{auth.full_name}</div>
            </div>
        </>
    );
}

function HeaderUserDropdownLogout({children}) {
    return (
        <Link href={route('admin::authenticated_session.destroy')}
              method="delete"
              as="button"
              className="dropdown-item">
            {children}
        </Link>
    );
}

function Header() {
    return (
        <Navbar variant="light" expand="md" className="d-none d-lg-flex d-print-none">
            <Container fluid="xl">
                <Navbar.Toggle aria-controls="navbar-menu"/>
                <Nav className="flex-row order-md-last">
                    <NavDropdown title={<HeaderUserNav/>} align="end">
                        <Dropdown.Divider/>
                        <NavDropdown.Item as={HeaderUserDropdownLogout}>
                            <LogOut className="icon dropdown-item-icon text-danger"/>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Navbar.Collapse id="navbar-menu">

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

HeaderUserDropdownLogout.propTypes = {
    children: PropTypes.array.isRequired
};

export default Header;
