import * as React from "react";
import Notification from "antd/es/notification";

import TemplateWrapper from "../Template";
import Server from "../../networking/server";
import Loading from "../../components/Loading";
import NotificationView from '../../components/Notification';

type SERVER_STATE = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';

type NotificationProp = {
  id: number,
  message: string,
  type: string,
  urgency: number,
  raw: {
    date: string,
    name: string,
    image: string,
    amount: number,
    currency: string,
    displayTitle: string,
  },
  date_created: string,
}


export default function Notifications() {
  const [severState, setServerState] = React.useState<SERVER_STATE>('IDLE');
  const [notification, setNotification] = React.useState<NotificationProp[]>([]);
  const fetchNotifications = React.useCallback(async () => {
    try {
      setServerState('LOADING');
      const response = await Server.getNotification();
      if (!response.data.success) {
        setServerState('ERROR');
        Notification.error({
          message: response.data.message,
        });
      } else {
        setServerState('SUCCESS');
        setNotification(response.data.data);
        Notification.success({
          message: "Successfully fetched notifications",
        });
      }
    } catch (error) {
      console.log(error);
      setServerState('ERROR');
      Notification.error({
        message: "Something went wrong please try again later",
      });
    }
  }, []);

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <TemplateWrapper defaultIndex="6">
      <div className="notification-container">
        {severState === 'LOADING' && <Loading />}
        {severState === 'SUCCESS' && <NotificationView notifications={notification} />}
        {severState === 'ERROR' && <div className="error">Error</div>}
      </div>
    </TemplateWrapper>
  );
}
