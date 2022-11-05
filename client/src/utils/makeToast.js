import { toast } from "react-toastify"

const makeToast = (promise, pendingText, successText, errorText) => {
  return toast.promise(promise, {
    pending: pendingText,
    success: successText,
    error: errorText,
  })
}

export default makeToast
