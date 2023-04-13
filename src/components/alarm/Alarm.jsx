import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { deleteNotification, getNotification } from "../../utils/api/api";
import { useState } from "react";
import Button from "../../element/Button";
import { toast } from "react-toastify";

const Alarm = () => {
  const [alarm, setAlarm] = useState(null);

  const alarmQuery = useQuery("notification", getNotification, {
    onSuccess: ({ data }) => {
      setAlarm(data.data);
    },
  });

  const deleteAllNotifi = useMutation(deleteNotification, {
    onSuccess: ({ data }) => {
      alarmQuery.refetch();
    },
  });

  const onDelete = async () => {
    const res = await deleteAllNotifi.mutateAsync();
  };

  return alarmQuery?.data?.data?.data?.length != 0 ? (
    <AlarmWrapper>
      <Button
        width={"18rem"}
        height={"3rem"}
        transparent={true}
        color={"rgb(88, 85, 133)"}
        onClick={onDelete}
      >
        알림삭제
      </Button>
      {alarm !== null &&
        alarm.map((element, i) => (
          <AlarmList key={i} read={element.read.toString()}>
            {element.content}
          </AlarmList>
        ))}
    </AlarmWrapper>
  ) : (
    <AlarmWrapper>
      <AlarmList read={"false"} className="nonetitle">
        알림이 없습니다
      </AlarmList>
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
  padding: 1rem;

  .nonetitle {
    font-size: 1.3rem;
    text-align: center;
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const AlarmList = styled.li`
  width: 100%;
  text-align: flex-start;
  font-size: 1.3rem;
  border-bottom: 0.05rem black;
  padding-bottom: 0.8rem;
  border-bottom: 0.05rem solid black;
  color: ${({ read }) => (read === "true" ? "gray" : "black")};
  &:last-child {
    border-bottom: none;
  }
`;

export default Alarm;
