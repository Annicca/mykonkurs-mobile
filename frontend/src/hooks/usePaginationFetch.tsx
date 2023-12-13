import { useState, useEffect, Dispatch, SetStateAction} from 'react';
import { instance } from '../utils/instance';
import { getRequestConfig } from '../utils/getRequestConfig';

export type FetchTypePagination<T> = {
  data: T[], 
  setData: Dispatch<SetStateAction<T[]>>, 
  loading: any, 
  error: any, 
  isEnd: boolean,
  page: number, 
  setPage: (action: (page:number) => number) => void}

function usePaginationFetch<T>(url: string, token?: string | null, isFocused?: boolean): FetchTypePagination<T>  {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<any>(null);
  const [error, setError] = useState<null | string>(null);
  const [isEnd, setIsEnd] = useState<boolean>(true)

  useEffect(() => {
      setLoading(true)
      setError(null);
      let isPaging = page !== 0;
      url = url.includes('?') ? url : url + '?';
      instance.get(`${url}page=${page}`, getRequestConfig(token))
      .then(res => {
          setIsEnd(res.data.last)
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
      })
  }, [url, page, token, isFocused])

  return { data, setData, loading, error, isEnd, page, setPage }
}

export default usePaginationFetch;