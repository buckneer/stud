export const newError = (status: number, message: string, options?: any) => {
    return  options ? {
        status,
        message,
        ...options
    } 
    :
    {
        status,
        message,
        ...options
    }
}