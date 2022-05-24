import {useState} from 'react';

function useSearchParamsStateCallback(name, defaultValue, callback) {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has(name)) {
        defaultValue = callback(searchParams.get(name));
    }

    return useState(defaultValue);
}

function useSearchParamsState(name, defaultValue) {
    return useSearchParamsStateCallback(name, defaultValue, (value) => value);
}

function useSortState() {
    return useSearchParamsStateCallback('sort', {}, (value) => value
        .split(',')
        .reduce((sort, column) => ({...sort, [column.replace(/^-/, '')]: column.startsWith('-')}), {}));
}

function useSearchState() {
    return useSearchParamsState('filter[search]', '');
}

function useLimitState() {
    return useSearchParamsState('limit', 10);
}

export {
    useSearchParamsStateCallback,
    useSearchParamsState,
    useSortState,
    useSearchState,
    useLimitState
};
