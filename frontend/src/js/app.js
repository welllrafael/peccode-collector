
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
      .sendNotification('AutoUpdate Connection...')
  }

  const sendHelloWorld2 = () => {
    electron
      .notificationApi
      .sendNotification('Show to Customer...')
  }

  return (
    <>
      <h1>{enhancedTitle}</h1>
      <button onClick={sendNotification}>Send Notification</button>
      <button onClick={sendHelloWorld}>Send 2 Notification</button>
      <button onClick={sendHelloWorld2}>Send 3 Notification</button>
    </>
  )
}