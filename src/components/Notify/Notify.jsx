import { useEffect } from "react";
import { NotifyWrapper } from "./Notify.styles";

import { useNotifyContext } from "../../context/notify.context";

const Notify = () => {
  const { notification, setNotification } = useNotifyContext();

  useEffect(() => {
    let timer = setTimeout(() => setNotification(""), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [notification, setNotification]);

  return notification ? (
    <NotifyWrapper data-testid="notification">{notification}</NotifyWrapper>
  ) : null;
};

export default Notify;
