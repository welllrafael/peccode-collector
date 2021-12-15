
import React from 'react';

export default function App() {
  const title = "My Collector App";
  const enhancedTitle = title + ' - PecCode App!';

  const sendNotification = () => {
    electron
      .notificationApi
      .sendNotification('Data Collect!');
  }

  return (
    <>
      <h1>{enhancedTitle}</h1>
      <button onClick={sendNotification}>Send Notification</button>
    </>
  )
}