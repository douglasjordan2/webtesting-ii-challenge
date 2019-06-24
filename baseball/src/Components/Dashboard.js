import React from 'react'

export default function Dashboard(props) {
  const { balls, strikes } = props.state;
  let b = balls + 1;
  let s = strikes + 1

  return (
    <>
      <button
        onClick = { () => props.inc('balls', b) }
      >
        Ball
      </button>
      <button
        onClick = { () => props.inc('strikes', s) }
      >
        Strike
      </button>
      <button
        onClick = { () => props.inc('fouls', null) }
      >
        Foul
      </button>
      <button
        onClick = { () => props.inc('hits', null) }
      >
        Hit
      </button>
    </>
  )
}
