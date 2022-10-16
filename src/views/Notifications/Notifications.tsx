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
  const [notification, setNotification] = React.useState<NotificationProp[]>([
    {
      id: 8,
      message: "Samuel Mothwa has made a payment of ZAR 1500",
      type: "TRANSACTION_IN",
      urgency: 1,
      raw: {
        date: "13/10/2022",
        name: "Samuel Mothwa",
        image:
          "https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4",
        amount: 1500,
        currency: "ZAR",
        displayTitle: "Samuel Mothwa has made a payment of ZAR 1500",
      },
      date_created: "2022-10-13T20:33:58.000Z",
    },
    {
      id: 9,
      message: "Jay Jay has made a payment of ZAR 10000",
      type: "TRANSACTION_IN",
      urgency: 1,
      raw: {
        date: "13/10/2022",
        name: "Jay Jay",
        image:
          "https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4",
        amount: 10000,
        currency: "ZAR",
        displayTitle: "Jay Jay has made a payment of ZAR 10000",
      },
      date_created: "2022-10-13T20:35:35.000Z",
    },
    {
      id: 10,
      message: "Jay Jay has made a payment of ZAR 100000",
      type: "TRANSACTION_IN",
      urgency: 1,
      raw: {
        date: "13/10/2022",
        name: "Jay Jay",
        image:
          "https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4",
        amount: 100000,
        currency: "ZAR",
        displayTitle: "Jay Jay has made a payment of ZAR 100000",
      },
      date_created: "2022-10-13T21:01:59.000Z",
    },
  ]);
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
