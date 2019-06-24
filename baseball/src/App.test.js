import React from 'react';
import ReactDOM from 'react-dom';
import * as rtl from '@testing-library/react';
import 'jest-dom/extend-expect';

afterEach(rtl.cleanup);

import App from './App';
import Display from './Components/Display';
import Dashboard from './Components/Dashboard';
import { fireEvent } from '@testing-library/react';

describe('App', () => {
  it('renders without crashing', () => {
    const app = rtl.render(<App />);
    console.log(app.debug());
  })

  it('displays the amount of balls, strikes, and outs', () => {
    const { queryByText } = rtl.render(<Display 
      state = {{
        balls: 0,      
        strikes: 0,
        outs: 0
      }}
    />);

    expect(queryByText(/Balls: 0/)).toBeVisible();
    expect(queryByText(/Strikes: 0/)).toBeVisible();
    expect(queryByText(/Outs: 0/)).toBeVisible();
  })

  it('displays buttons to count stats', () => {
    const { queryByText } = rtl.render(<Dashboard 
      state = {{
        balls: 0,
        strikes: 0
      }}
    />)

    expect(queryByText(/^Ball$/)).toBeVisible();
    expect(queryByText(/^Strike$/)).toBeVisible();
    expect(queryByText(/^Foul$/)).toBeVisible();
    expect(queryByText(/^Hit$/)).toBeVisible();
  })
})

describe('The Ball Button', () => {
  it('increments the balls value when pressed', () => {
    const { queryByText } = rtl.render(<App />)
    const btn = queryByText(/^Ball$/)

    fireEvent.click(btn)
    expect(queryByText(/Balls: 1/)).toBeVisible();
  })

  it('resets balls to 0 when it reaches 4 and adds and out', () => {
    const { queryByText } = rtl.render(<App />)
    const btn = queryByText(/^Ball$/);

    for(let i = 0; i < 4; i++) {
      fireEvent.click(btn)
    }

    expect(queryByText(/Balls: 0/)).toBeVisible();
    expect(queryByText(/Outs: 1/)).toBeVisible();
  })
})

describe('The Strike Button', () => {
  it('increments the strikes value when pressed', () => {
    const { queryByText } = rtl.render(<App />)
    const btn = queryByText(/^Strike$/);

    fireEvent.click(btn)
    expect(queryByText(/Strikes: 1/)).toBeVisible();
  })

  it('resets strikes to 0 when it reaches 3 and adds an out', () => {
    const { queryByText } = rtl.render(<App />)
    const btn = queryByText(/^Strike$/);

    for(let i = 0; i < 3; i++) {
      fireEvent.click(btn)
    }

    expect(queryByText(/Strikes: 0/)).toBeVisible();
    expect(queryByText(/Outs: 1/)).toBeVisible();
  })
})

describe('The Foul Button', () => {
  it('increments the strikes', () => {
    const { queryByText } = rtl.render(<App />);
    const btn = queryByText(/^Foul$/);

    fireEvent.click(btn);
    expect(queryByText(/Strikes: 1/)).toBeVisible();
  })

  it('doesn\'t increment if strikes are at 2', () => {
    const { queryByText } = rtl.render(<App />)
    const btn = queryByText(/^Foul$/);

    for(let i = 0; i < 3; i++) {
      fireEvent.click(btn)
    }

    expect(queryByText(/Strikes: 2/)).toBeVisible();
  })
})

describe('The Hit Button', () => {
  it('resets all values', () => {
    const { queryByText } = rtl.render(<App />);
    const ball = queryByText(/^Ball$/);
    const strike = queryByText(/^Strike$/);
    const foul = queryByText(/^Foul$/);
    const hit = queryByText(/^Hit$/);

    fireEvent.click(ball);
    fireEvent.click(strike);
    fireEvent.click(foul);

    expect(queryByText(/Balls: 1/)).toBeVisible();
    expect(queryByText(/Strikes: 2/)).toBeVisible();

    fireEvent.click(hit)

    expect(queryByText(/Balls: 0/)).toBeVisible();
    expect(queryByText(/Strikes: 0/)).toBeVisible();
  })
})

describe('One full inning', () => {
  it('should increment outs until 3, then reset for next batter', () => {
    const { queryByText } = rtl.render(<App />);
    const ball = queryByText(/^Ball$/);

    for(let i = 0; i < 4; i++) {
      fireEvent.click(ball)
    }

    expect(queryByText(/Outs: 1/)).toBeVisible();

    for(let i = 0; i < 4; i++) {
      fireEvent.click(ball)
    }

    expect(queryByText(/Outs: 2/)).toBeVisible();

    for(let i = 0; i < 4; i++) {
      fireEvent.click(ball)
    }

    expect(queryByText(/Outs: 0/)).toBeVisible();
  })
})