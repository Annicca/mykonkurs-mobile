import { useState, useEffect, Dispatch, SetStateAction} from 'react';
import { instance } from '../utils/instance';

export type FetchTypePagination<T> = {
  data: T[], 
  setData: Dispatch<SetStateAction<T[]>>, 
  loading: any, 
  error: any, 
  page: number, 
  setPage: (action: (page:number) => number) => void}

function usePaginationFetch<T>(url: string, token?: string | null): FetchTypePagination<T>  {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<any>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
      setLoading(true)
      setError(null);
      let isPaging = page !== 0;
      url = url.includes('?') ? url : url + '?';
      let options = token ? {headers: {Authorization: `Bearer ${token}`}} : {}
      instance.get(`${url}page=${page}`, options)
      .then(res => {
          setLoading(false);
          if (isPaging) {
            res.data.content &&
              setData([...data, ...res.data.content])
          } else {
            setData(res.data.content)
          }
      })
      .catch(err => {
          setLoading(false)
          setError(err.message)
          console.log(err)
      })
  }, [url, page, token])

  return { data, setData, loading, error, page, setPage }
}

export default usePaginationFetch;