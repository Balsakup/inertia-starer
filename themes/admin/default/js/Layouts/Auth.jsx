import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import {Head, usePage} from '@inertiajs/inertia-react';
import {toast as notify, ToastContainer} from 'react-toastify';

function Auth({children}) {
    const [initialized, setInitialized] = useState(false);
    const {toast, app, title} = usePage().props;

    useEffect(() => {
        if (! initialized) {
            setInitialized(true);

            return;
        }

        for (const [type, message] of Object.entries(toast)) {
            notify(message, {type});
        }
    }, [initialized]);

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
