import {createInertiaApp} from '@inertiajs/inertia-react';
import {createRoot} from 'react-dom/client';
import DefaultLayout from './Layouts/Default';
import {InertiaProgress} from '@inertiajs/progress';

createInertiaApp({
    resolve: (name) => new Promise((resolve, reject) => import(`./Templates/${name}`)
        .then(({default: page}) => {
            if (typeof page.layout === 'undefined') {
                page.layout = (page) => <DefaultLayout children={page}/>;
            }

            resolve(page);
        })
        .catch(reject)),
    setup: ({el, App, props}) => createRoot(el).render(<App {...props}/>)
});

InertiaProgress.init();
