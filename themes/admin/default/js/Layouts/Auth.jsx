import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import {Head, usePage} from '@inertiajs/inertia-react';
import {toast as notify, ToastContainer} from 'react-toastify';

function Auth({children}) {
    const {toast, app, title} = usePage().props;

    useEffect(() => {
        for (const [type, message] of Object.entries(toast)) {
            notify(message, {type});
        }
    }, [toast]);

    return (
        <>
            <Head title={app.name + (title ? ` | ${title}` : '')}/>
            <div className="page page-center">
                <Container fluid="tight" className="py-4">
                    {children}
                </Container>
            </div>
            {toast && <ToastContainer/>}
        </>
    );
}

Auth.propTypes = {
    children: PropTypes.element.isRequired
};

export default Auth;
