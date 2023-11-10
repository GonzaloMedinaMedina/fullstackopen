import { useState } from 'react'

const Button = (props) =>
{
  const text = props.text;
  const func = props.func;

  return <button onClick={func}>{text}</button>
}

const StatisticLine = (props) => 
{
  const text = props.text;
  const value = props.value;

  if (text === "positive")
  {
    return <p>{text} {value} %</p>
  }

  return <>
    <p>{text} {value}</p>
  </>
}

const Statistics = (props) => 
{
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const all = good + neutral + bad;

  if (good === 0 && neutral == 0 && bad === 0)
  {
    return <>
      <p>No feedback given</p>
    </>
  }

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={(good - bad) / all}/>
      <StatisticLine text="positive" value={(good / all) * 100}/>
      </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={"good"} func= {() => {setGood(good+1)}}/>
      <Button text={"neutral"} func= {() => {setNeutral(neutral+1)}}/>
      <Button text={"bad"} func= {() => {setBad(bad+1)}}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App