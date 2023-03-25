import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import {deletePage,deletePageMembers,getBoardDetailPage,getDetailPage,getDetailPageForAdmin,getPartyBoard,getPartyPage,PutMemberRole,undoDeletePagemembers,
} from "../utils/api/api";
import { partyRegistModalState, partyInfoState } from "../store/atom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FullDateCheck,DayCheck } from "../element/DateCheck";
import { useSetRecoilState } from "recoil";
import PartyInfo from "../components/party/PartyInfo";

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;
