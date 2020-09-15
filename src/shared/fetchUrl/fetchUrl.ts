
/**
 * Fetch call always resolves even with bad requests (except network error)
 * so adding a wrapper over fetch to reject request if response is not ok
 * Rejected promise can be caught with catch at the calling functions and can be handled
 * @param url
 * @param config
 */
const fetchUrl = (url: string, config = {}): Promise<any> =>
    fetch(url, config).then(async response => {
        const data = await response.json();
        return response.ok ? data : Promise.reject(data);
    });
export default fetchUrl;

export function debounce<F extends Function>(func:F, wait:number):F {
    let timeoutID:number;

    // conversion through any necessary as it wont satisfy criteria otherwise
    return <any>function(this:any, ...args: any[]) {
        clearTimeout(timeoutID);
        const context = this;

        timeoutID = window.setTimeout(function() {
            func.apply(context, args);
        }, wait);
    } as F;
}