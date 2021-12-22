
import React from 'react';

export default function App() {
  const title = "My Collector App";
  const enhancedTitle = title + ' - PecCode App!';

  const sendNotification = () => {
    electron
      .notificationApi
      .sendNotification('Data Collect!');
  }

  const sendHelloWorld = () => {
    electron
      .notificationApi
      .sendNotification('Update Connection...')
  }

  return (
    <>
      <h1>{enhancedTitle}</h1>
      <button onClick={sendNotification}>Send Notification</button>
      {/* <button onClick={sendHelloWorld}>Send 2 Notification</button> */}
    </>
  )
}