import styled from "styled-components";
import React from "react";

import "react-loading-skeleton/dist/skeleton.css";
 const SlideChart = (props) => {
    const value = props.voteMax == 0 ? 0 : props.count / props.voteMax;
    return (
      <ChartContainer>
        <BarText>
          <h1 className="votename">{props.option}</h1>
          <h1 className="votename">{props.count}</h1>
        </BarText>
        <Bar width={value * 100}></Bar>
      </ChartContainer>
    );
  };
  
  export default SlideChart;
  const ChartContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    height: 3rem;
    width: 30vw;
    max-width: 100%;
    border: 0.1rem solid #d4d2e3;
    border-radius: 1.7rem;
  
    .votename {
      font-weight: 400;
      font-size: 1.6rem;
      color: black;
      white-space: nowrap;
    }
  `;
  
  const BarText = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
  `;
  
  const Bar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    border-radius: 1.7rem;
    padding-left: 1rem;
    padding-right: 1rem;
    width: ${(props) => props.width}%;
    height: 100%;
    background-color: #d4d2e3;
    ${(props) => props.width == "0" &&`background-color: rgba(212, 210, 227, 0);`}
  `;
