export const generateFilterUrl = (url : string, city : string | undefined, filter : object | undefined, sort: boolean | undefined) =>{
    if(!city && !filter && !sort) {
        return url
    }
    
    url += `?`
    if(!!city) {
        url += `city=${city}&`;
    }

    let keysFilter = filter && Object.keys(filter);

    if(!!keysFilter && keysFilter.length !== 0 ) {

        for(let key of keysFilter){
            if(filter[key]){
                url += `${key}=${filter[key]}&`
            }
        }
    }

    if(sort !== undefined) {
        sort ? url += `typeSort=ASC&` : url += `typeSort=DESC&`
    }
    
    return url;
}