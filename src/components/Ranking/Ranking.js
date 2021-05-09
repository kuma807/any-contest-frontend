import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import ContestHeader from "../Header/ContestHeader";


const tempranking = [
  {
    rank: 1,
    user: "user1",
    score: 2000
  },
  {
    rank: 2,
    user: "user2",
    score: 1900
  },
  {
    rank: 3,
    user: "user3",
    score: 1000
  },
  {
    rank: 4,
    user: "user4",
    score: 200
  },
]


let ranking = [];
let numParticipant;
let maxPage;
let keys = [];

const Ranking = ({ contestName, numShow }) => {
  const [page, setPage] = useState(1);

  const handlePageMove = (num) => {
    const newPage = page + num;
    setPage(newPage);
  }

  useEffect(
    () => {
      ranking = tempranking;
    },
    [page]
  )

  useEffect(
    () => {
      numParticipant = tempranking.length;
      maxPage = Math.ceil(numParticipant / numShow);
      keys = ranking ? Object.keys(ranking[0]) : [];
    }
  )

  return (
    <>
    <ContestHeader contestName={contestName} />
    {page !== 1 && 
      <input type="button" onClick={() => handlePageMove(-1)} value="previous page" />
    }
    {page !== maxPage && 
      <input type="button" onClick={() => handlePageMove(1)} value="next page" />
    }
    <Table bordered hover>
      <thead>
        <tr>
          {
            keys.map((key) => <th>{key}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          ranking.map((rank) => 
            <tr>
              {keys.map((key) => <td>{rank[key]}</td>)}
            </tr>
          )
        }
      </tbody>
    </Table>
    </>
  )
}

export default Ranking;