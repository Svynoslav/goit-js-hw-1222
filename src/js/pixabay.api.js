'use strict';

import axios from 'axios';

async function fetchData(url, params) {
    const { data } = await axios(url, { params });
    return data;
}

export { fetchData };


