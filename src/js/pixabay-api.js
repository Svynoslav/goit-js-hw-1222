'use strict';

async function fetchData(url, params) {
    const response = await fetch(`${url}?${params}`)
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export { fetchData };

