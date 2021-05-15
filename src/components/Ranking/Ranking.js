import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import ContestHeader from "../Header/ContestHeader";
import {getRanking} from "../../services/contests";

const numShow = 20;
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

const Ranking = ({ contestName }) => {
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [ranking, setRanking] = useState(null);
  const [visibleRanking, setVisibleRanking] = useState(null);

  const handlePageMove = (num) => {
    const newPage = page + num;
    setPage(newPage);
    setVisibleRanking(ranking.slice((newPage - 1) * numShow, newPage * numShow));
  }

  useEffect(
    () => {
      getRanking(contestName).then((res) => {
        console.log(res);
        res.sort(compare);
        setRanking(res);
        setMaxPage(Math.ceil(res.length / numShow));
        setVisibleRanking(res.slice(0, Math.min(numShow, res.length)));
      });
    },
    []
  )

  if (visibleRanking === null) {
    return (
      <>
      <ContestHeader contestName={contestName} />
      <div>Loading contests...</div>
      </>
    )
  }
  if (visibleRanking.length === 0) {
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
    {page !== 1 && 
      <input type="button" onClick={() => handlePageMove(-1)} value="previous page" />
    }
    {page !== maxPage && 
      <input type="button" onClick={() => handlePageMove(1)} value="next page" />
    }
    <Table bordered hover>
      <thead>
        <tr>
          <th>rank</th>
          <th>username</th>
          <th>score</th>
          <th>time</th>
        </tr>
      </thead>
      <tbody>
        {
          visibleRanking.map((rank, index) => 
            <tr key={index}>
              <td>{(page - 1) * numShow + index + 1}</td>
              <td>{rank["name"]}</td>
              <td>{rank["point"]}</td>
              <td>{rank["submissionTime"]}</td>
            </tr>
          )
        }
      </tbody>
    </Table>
    </>
  )
}

export default Ranking;