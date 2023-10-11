import React, { useState } from "react";
import Info from "./NewMember";
import UseNotification from "../helpers/UseNotification";

export default function NotificationContainer() {
  const notifications = UseNotification();
  console.log("notifications: ", notifications);

  return (
    <>
      {notifications.map((notification: any, key: number) => {
        return notification.room !== undefined ? (
          <Info key={key} id={notification.id} invited={notification.room} />
        ) : (
          <Info key={key} id={notification.id} invited={false} />
        );
      })}
    </>
  );
}
