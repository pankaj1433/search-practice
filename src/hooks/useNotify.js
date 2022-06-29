import { useNotifyContext } from "../context/notify.context";

const useNotify = () => {
  const notifyContext = useNotifyContext();

  if (notifyContext === undefined) {
    throw new Error("useNotify must be used within a NotifyContextProvider");
  }

  return notifyContext.setNotification;
};

export default useNotify;
