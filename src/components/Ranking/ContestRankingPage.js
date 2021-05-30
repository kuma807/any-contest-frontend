import React, { useState, useEffect } from 'react';
import ContestHeader from "../Header/ContestHeader";
import {getRanking} from "../../services/contests";
import Ranking from "./Ranking";

const compare = (a, b) => {
  if (a.point === b.point) {
    if (a.submissionTime === b.submissionTime) {
      return 0;
    }
    if (a.submissionTime > b.submissionTime) {
      return 1;
    }
    else {
      return -1;
    }
  }
  return b.point - a.point;
}

const ContestRanking = ({ contestName }) => {
  const [ranking, setRanking] = useState(null);

  useEffect(
    () => {
      getRanking(contestName).then((res) => {
        res.sort(compare);
        setRanking(res);
      });
    },
    []
  )

  if (ranking === null) {
    return (
      <>
      <ContestHeader contestName={contestName} />
      <div>Loading contests...</div>
      </>
    )
  }
  if (ranking.length === 0) {
    return (
      <>
      <ContestHeader contestName={contestName} />
      <div>参加者は居ません</div>
      </>
    )
  }
  return (
    <>
    <ContestHeader contestName={contestName} active="ranking"/>
    <Ranking ranking={ranking} />
    </>
  )
}

export default ContestRanking;