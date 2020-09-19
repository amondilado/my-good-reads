import fetchUrl from '../../shared/fetchUrl/fetchUrl';

export async function getBooksByType(type: string) {
    try {
        // return await fetchUrl(`https://www.googleapis.com/books/v1/volumes?q=${type}`, {
        return await fetchUrl(`data_dev.json`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        });
    } catch(exception) {
        return [];
    }
}