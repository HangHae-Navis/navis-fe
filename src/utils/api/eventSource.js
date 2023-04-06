const setEventSource = (token) => {
  const url = process.env.REACT_APP_BASEURL + "subscribe";
  const headers = {
    Authorization: token,
  };
  const eventSource = new EventSource(url, { headers });
  return eventSource;
};

export default setEventSource;
