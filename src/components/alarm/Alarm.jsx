import { useQuery } from "react-query";
import styled from "styled-components";
import { getNotification } from "../../utils/api/api";
import { useState } from "react";

const Alarm = () => {
  const [alarm, setAlarm] = useState(null);
  const alarmQuery = useQuery("notification", getNotification, {
    onSuccess: ({ data }) => {
      setAlarm(data.data);
    },
  });
  return (
    <AlarmWrapper>
      {alarm !== null &&
        alarm.map((element, i) => (
          <AlarmList key={i}>{element.content}</AlarmList>
        ))}
    </AlarmWrapper>
  );
};

const AlarmWrapper = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  top: 3.5rem;
  width: 20rem;
  border-radius: 1.6rem;
  background: rgba(246, 246, 246, 0.8);
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 1rem 0 0 0;
`;

const AlarmList = styled.li`
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
  border-bottom: 0.05rem black;
  padding-bottom: 0.8rem;
  border-bottom: 0.05rem solid black;

  &:last-child {
    border-bottom: none;
  }
`;

export default Alarm;
