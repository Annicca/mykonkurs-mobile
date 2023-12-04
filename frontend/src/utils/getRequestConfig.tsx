export const getRequestConfig = (token: string | null | undefined): object => {
    if(token) return {headers: {Authorization: `Bearer ${token}`}}
    else return {}
}