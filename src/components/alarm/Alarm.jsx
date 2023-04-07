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
  gap: 0.8rem;
  top: 3.5rem;
  width: 20rem;
  height: 22rem;
  border-radius: 1.6rem;
  background-color: ${(props) => props.theme.color.zeroTwo};
`;

const AlarmList = styled.li`
  font-size: 1.3rem;
`;

export default Alarm;
