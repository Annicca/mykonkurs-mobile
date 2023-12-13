import { useState, useEffect } from "react"
import { CityType } from "../types/CityType"
import useFetch from "./useFetch"

export type Cities = {
    id: number,
    label: string,
    value: string
}

export const useFetchCity = (): {loading: boolean, cities: Cities[], error: any} => {
    const citiesData = useFetch<CityType[]>('cities')

    const [loading, setLoading] = useState<boolean>(true)

    const [cities, setCities] = useState<Cities[]>([])

    const generateCities = async() => {
        return citiesData.data?.map(city => {
            return {
                id: city.idCity,
                label: city.city,
                value: city.city,
                color: '#888'
            }
        })
    }

    useEffect(() => {
        generateCities()
        .then(r => {
            if(r) {
                setCities(r)
            }
            setLoading(false)
        })
    },[citiesData.data])

    return {
        loading: loading,
        cities: cities,
        error: citiesData.error
    }
}