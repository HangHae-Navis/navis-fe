import { useQuery } from "react-query";
import styled from "styled-components";
import { getNotification } from "../../utils/api/api";
import { useState } from "react";

const Alarm = () => {
  const [alarm, setAlarm] = useState([]);
  const alarmQuery = useQuery("notification", getNotification, {
    onSuccess: ({ data }) => {
      console.log(data);
    },
  });
  return <AlarmWrapper>Alarm</AlarmWrapper>;
};

const AlarmWrapper = styled.section`
  position: absolute;
  top: 3.5rem;
  width: 20rem;
  height: 22rem;
  border-radius: 1.6rem;
  background-color: ${(props) => props.theme.color.zeroTwo};
`;

export default Alarm;
