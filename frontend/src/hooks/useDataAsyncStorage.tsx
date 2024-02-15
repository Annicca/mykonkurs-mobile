import {useEffect, useState} from 'react'
import { getData } from '../utils/asyncStorage/getData'

export const useDataAsyncStorage = (dataKey: string): string | null => {

    const [data, setData] = useState<string | null>(null)

    useEffect(() => {
        getData(dataKey)
            .then((r) => {
                setData(r)
            });
    })

    return data;
}