import React from 'react';
import PropTypes from 'prop-types';
import {Container} from 'react-bootstrap';

function Auth({children}) {
    return (
        <div className="page page-center">
            <Container fluid="tight" className="py-4">
                {children}
            </Container>
        </div>
    );
}

Auth.propTypes = {
    children: PropTypes.element.isRequired
};

export default Auth;
