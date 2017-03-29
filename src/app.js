import React from 'react';
import ReactDOM from 'react-dom';

import Index from './view/index';

import { formatQueryParams } from './utils/query-utils';

const params = formatQueryParams(window.location.search);

ReactDOM.render(
    <Index query={params.query}/>,
    document.getElementById('app')
);

