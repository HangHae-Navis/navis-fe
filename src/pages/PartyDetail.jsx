import { useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import { getBoardDetailPage, getDetailPage, getPartyBoard, getPartyPage } from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


function PartyDetail(){
    const Pam = useParams()
    const [searchParams, setSearchParams] = useSearchParams();

    const groupId = searchParams.get('groupId')
    const DetailId = searchParams.get('detailId')
    console.log(groupId)
    console.log(DetailId)
    const res = useQuery(['partyDetail'], ()=> getBoardDetailPage({groupId, DetailId}))
    
    console.log(res)
    return(<>
        </>)
}

export default PartyDetail