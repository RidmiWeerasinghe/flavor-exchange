import { useEffect, useState } from "react"

export default function useFetch<T>(apiFunction: (_: any) => Promise<T>, ...args: any) {

    const [data, setData] = useState<T | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | undefined>(undefined)

    useEffect(() => {
        const asyncBootstrap = async () => {
            setIsLoading(true)
            try {
                const result = await apiFunction(args)
                setData(result)
            } catch (error: any) {
                setError(error)
            }
            setIsLoading(false)
        }
        asyncBootstrap()
    }, [])

    return {
        data,
        isLoading,
        error
    }
}
