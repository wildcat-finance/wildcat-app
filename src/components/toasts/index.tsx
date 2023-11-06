import { toast, UpdateOptions, ToastOptions } from "react-toastify"

type ToastifyRequestConfig = {
  pending?: string
  success?: string
  error?: string
}

const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  theme: "dark",
  pauseOnHover: false,
  autoClose: 3000,
}

const DEFAULT_TOAST_CONFIG: UpdateOptions = {
  ...DEFAULT_TOAST_OPTIONS,
}

export const toastifyRequest = async <T,>(
  promiseFn: Promise<T>,
  config?: ToastifyRequestConfig,
) => {
  toast.promise(promiseFn, {
    pending: {
      ...DEFAULT_TOAST_CONFIG,
      render: () => config?.pending || "Request is pending",
    },
    success: {
      ...DEFAULT_TOAST_CONFIG,
      render: () => config?.success || "Request is successful 🎉",
    },
    error: {
      ...DEFAULT_TOAST_CONFIG,
      render: () => config?.error || "Request failed 😢",
    },
  })

  return promiseFn
}

export const toastifySuccess = (message: string) => {
  toast.success(message, DEFAULT_TOAST_OPTIONS)
}

export const toastifyError = (message: string) => {
  toast.error(message, DEFAULT_TOAST_OPTIONS)
}
