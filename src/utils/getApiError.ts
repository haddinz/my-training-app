import { ApiError } from "../types/apiError";

export const getApiError = (error: ApiError) => {
    return error.response && error.response.data.message 
    ? error.response.data.message
    : error.message
}