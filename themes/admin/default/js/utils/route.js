import ziggyRoute from 'ziggy-js';
import {Ziggy} from '../ziggy';

function route(name, params = {}, absolute = false) {
    return ziggyRoute(name, params, absolute, Ziggy);
}

function routeIs(name) {
    return ziggyRoute(undefined, undefined, undefined, Ziggy).current(name);
}

export {route, routeIs};
