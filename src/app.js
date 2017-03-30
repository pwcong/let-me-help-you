import React from 'react';
import ReactDOM from 'react-dom';

import Index from './view/index';

import { formatQueryParams } from './utils/query-utils';

const params = formatQueryParams(window.location.search);

// console.log(window.location)
let query = params.query ? decodeURI(params.query) : ''

ReactDOM.render(
    <Index query={query}/>,
    document.getElementById('app')
);

