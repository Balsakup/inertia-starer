import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Partials/Default/Sidebar';
import Header from './Partials/Default/Header';
import {usePage} from '@inertiajs/inertia-react';
import {toast as notify, ToastContainer} from 'react-toastify';

function Default({children}) {
    const {toast} = usePage().props;

    for (const [type, message] of Object.entries(toast)) {
        notify(message, {
            type
        });
    }

    return (
        <>
            <div className="page">
                <Sidebar/>
                <Header/>
                {children}
            </div>
            {toast && <ToastContainer/>}
        </>
    );
}

Default.propTypes = {
    children: PropTypes.element.isRequired
};

export default Default;
