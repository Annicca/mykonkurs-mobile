import { useState, useEffect } from 'react';
import { instance } from '../utils/instance';

function usePaginationFetch<T>(url: string): {data: T[], loading: any, error: any, page: number, setPage: (action: (page:number) => number) => void} {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<any>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
      setLoading(true)
      setError(null);
      instance.get(`${url}?page=${page}`)
      .then(res => {
          setLoading(false);
          res.data.content &&
            setData([...data, ...res.data.content])
      })
      .catch(err => {
          setLoading(false)
          setError(err.message)
          console.log(err)
      })
  }, [url, page])

  return { data, loading, error, page, setPage }
}

export default usePaginationFetch;