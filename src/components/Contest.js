const contests = [
  {
    name: "math1",
    minRating: 0,
    maxRating: 1999,
    maxPref: 2400,
    penalty: 300,
    startTime: new Date(2021, 4, 8, 21, 0, 0),
    endTime: new Date(2021, 4, 8, 22, 39, 59, 999),
    problem: [
      {
        id: 0,
        name: "problem1",
        content: "whats 1 + 1",
        writer: "user1"
      },
      {
        id: 1,
        name: "problem2",
        content: "whats 5 / 10",
        writer: "user1"
      }
    ],
    participant: [
      {
        id: "user1"
      },
      {
        id: "user2"
      }
    ],
    submission:[
      {
        id:0
      },
      {
        id:1
      }
    ]
  },
  {
    name: "superMath",
    minRating: 1200,
    maxRating: 99999,
    maxPref: 99999,
    penalty: 300,
    startTime: new Date(2021, 4, 9, 21, 0, 0),
    endTime: new Date(2021, 4, 9, 22, 59, 59, 999),
    problem: [
      {
        id: 0,
        name: "max1",
        content: "whats 1000 + 1000",
        writer: "user1"
      },
      {
        id: 1,
        name: "problem2",
        content: "whats 5 * 1000 / 10",
        writer: "user2"
      }
    ],
    participant: [
      {
        id: "user1"
      },
      {
        id: "user2"
      },
      {
        id: "user3"
      }
    ],
    submission:[
      {
        id:0
      },
      {
        id:1
      }
    ]
  }
]

const Contest = ({ contestName }) => {
  const contest = contests.find((c) => c.name === contestName);
  return (
    <div>
      <h2>{contest.name}</h2>
      <div>{contest.description}</div>
    </div>
  )
}
export default Contest