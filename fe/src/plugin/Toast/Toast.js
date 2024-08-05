import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Successtoast(message) {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000, 
    hideProgressBar: false,
    closeOnClick: true, 
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
}

export function Errortoast(message) {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true, 
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
}
