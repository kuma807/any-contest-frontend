import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import {Link } from "react-router-dom";

const numShow = 20;

const Ranking = ({ ranking }) => {
  const [page, setPage] = useState(1);
  const [visibleRanking, setVisibleRanking] = useState(ranking.slice(0, Math.min(numShow, ranking.length)));
  const maxPage = Math.ceil(ranking.length / numShow);

  const handlePageMove = (num) => {
    const newPage = page + num;
    setPage(newPage);
    setVisibleRanking(ranking.slice((newPage - 1) * numShow, newPage * numShow));
  }
  if (visibleRanking.length === 0) {
    return (
      <>
      <div>参加者は居ません</div>
      </>
    )
  }
  return (
    <>
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
              <td><Link to={`/rating/${rank["name"]}`}>{rank["name"]}</Link></td>
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