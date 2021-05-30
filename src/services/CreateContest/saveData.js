const fixTime = (time) => {
  if (time.length === 1) {
    return "0" + time;
  }
  return time;
}

const TimeToString = (year, month, day, hour, min, sec) => {
  const time = `${year}-${fixTime(month)}-${fixTime(day)} ${fixTime(hour)}:${fixTime(min)}:${fixTime(sec)}`;
  return time;
}

const saveData = ({event, contest, contests, setContests, setContest}) => {
  const contestName = event.target[0].value;
  const contestDescription = event.target[1].value;
  const startTime = TimeToString(event.target[2].value, event.target[3].value, event.target[4].value, event.target[5].value, event.target[6].value, event.target[7].value);
  const endTime = TimeToString(event.target[8].value, event.target[9].value, event.target[10].value, event.target[11].value, event.target[12].value, event.target[13].value);
  const newContest = {
    name: contestName,
    field: "Debug",
    ranking: [],
    description: contestDescription,
    minRating: 0,
    maxRating: 5000,
    maxperformance: 5000,
    problemNames: contest.problemNames,
    startTime: startTime,
    endTime: endTime,
    writers: contest.writers,
    penalty: 300,
  }

  const already = contests.filter(contest => contest.name === contestName).length !== 0;
  if (already) {
    const newContests = contests.map(contest => {
      if (contest.name === contestName) {
        return newContest;
      }
      return contest;
    });
    window.localStorage.setItem(
      'creatingContests', JSON.stringify(newContests)
    );
    setContests(newContests);
  }
  else {
    const newContests = contests.concat(newContest);
    window.localStorage.setItem(
      'creatingContests', JSON.stringify(newContests)
    );
    setContests(newContests);
  }
  setContest(newContest);
  return newContest;
}

export default saveData;
