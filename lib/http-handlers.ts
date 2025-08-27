import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: error.message || error.detail,
      })
    }
    if (error.response.status === 401) {
      return Promise.reject({
        message: error.response.data.detail || error.response.data.message,
      })
    }
    return Promise.reject(error)
  },
)

const errorHandler = (error: any) => {
  if (error.response) {
    if (error.response.data.detail[0].msg) {
      return Promise.reject(error.response.data.detail[0].msg)
    }
    return Promise.reject(error.response.data.detail)
  }

  return Promise.reject(error.message)
}

const removeNullData = (data: any) => {
  Object.keys(data).forEach((key) => {
    if (!data[key]) {
      delete data[key]
    }
  })
  return data
}

const configAuthHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(import.meta.env.VITE_SESSION_KEY)}`
}

// get request handler
export const getRequestHandler = async (url: string, useToken = false) => {
  if (useToken) configAuthHeader()

  return await axiosInstance
    .get(url)
    .then((res: any) => res.data)
    .catch(errorHandler)
}

// post request handler
export const postRequestHandler = async (url: string, data: any, useToken = false) => {
  if (useToken) configAuthHeader()
  data = removeNullData(data)

  return await axiosInstance
    .post(url, data)
    .then((res: any) => res.data)
    .catch(errorHandler)
}

// put request handler
export const putRequestHandler = async (url: string, data: any, useToken = false) => {
  if (useToken) configAuthHeader()
  data = removeNullData(data)

  return await axiosInstance
    .put(url, data)
    .then((res: any) => res.data)
    .catch(errorHandler)
}

// delete request handler
export const deleteRequestHandler = async (url: string, useToken = false) => {
  if (useToken) configAuthHeader()

  return await axiosInstance
    .delete(url)
    .then((res: any) => res.data)
    .catch(errorHandler)
}

// upload file handler
export const postFileHandler = async (url: string, Data: FormData, useToken = false) => {
  if (useToken) configAuthHeader()

  return await axiosInstance
    .post(url, Data, { headers: { content_type: "multipart/form-data" } })
    .then((res: any) => res.data)
    .catch(errorHandler)
}

export const putFileHandler = async (url: string, Data: FormData, useToken = false) => {
  if (useToken) configAuthHeader()

  return await axiosInstance
    .put(url, Data, { headers: { content_type: "multipart/form-data" } })
    .then((res: any) => res.data)
    .catch(errorHandler)
}
