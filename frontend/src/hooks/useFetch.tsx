import { useState, useEffect } from 'react';
import { instance } from '../utils/instance';

function useFetch<T>(url: string): {data: T|null, loading: any, error: any} {
  const [data, setData] = useState<T|null>(null);
  const [loading, setLoading] = useState<any>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
      setLoading(true)
      setData(null);
      setError(null);
      instance.get(url)
      .then(res => {
          setLoading(false);
          res.data.content ? 
            setData(res.data.content) :
            res.data && setData(res.data);
      })
      .catch(err => {
          setLoading(false)
          setError(err.message)
          console.log(err)
      })
  }, [url])

  return { data, loading, error }
}

export default useFetch;