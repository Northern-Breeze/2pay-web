import * as React from "react";
import Notification from "antd/es/notification";

import TemplateWrapper from "../Template";
import Server from "../../networking/server";

export default function Notifications() {
  const fetchNotifications = React.useCallback(async () => {
    try {
      const response = await Server.getNotification();
      if (!response.data.success) {
        Notification.error({
          message: response.data.message,
        });
      } else {
        Notification.success({
          message: "Successfully fetched notifications",
        });
      }
    } catch (error) {
      console.log(error);
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
      <div className="notification-container">Notifications</div>
    </TemplateWrapper>
  );
}
