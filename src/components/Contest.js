const Contest = ({ contest }) => {
  return (
    <div>
      <h2>{contest.name}</h2>
      <div>{contest.description}</div>
    </div>
  )
}
export default Contest