import React from 'react'

export default function Display(props) {
  const { balls, strikes, outs } = props.state
  return (
    <>
      <h1>Scoreboard</h1>
      <span>Balls: { balls }</span><br />
      <span>Strikes: { strikes }</span><br />
      <span>Outs: { outs }</span>
    </>
  )
}
