import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastOptions = {
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  containerId?: string;
  progress?: undefined;
  theme?: "light" | "dark" | "colored";
  type?: "error" | "warning" | "success" | "info" | "default";
};

const showToast = (text: string, id: string, options: ToastOptions = {}) => {
  const {
    position = "top-right",
    autoClose = 4000,
    hideProgressBar = true,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    theme = "light",
    type = "default",
  } = options;

  toast(text || "",
     {
    type,
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    toastId: id,
    progress: undefined,
    theme,
  }
);
};

export default showToast;
