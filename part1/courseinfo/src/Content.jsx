
const Part = (props) => 
{
    const part = props.part;
    const exercises = props.exercises;

    return (
        <>
            <p>
                {part} {exercises}
            </p>
        </>
    )
}

const Content = (props) => 
{
    const part1 = props.part1
    const exercises1 = props.exercises1
    const part2 = props.part2
    const exercises2 = props.exercises2
    const part3 = props.part3
    const exercises3 = props.exercises3

    return (
    <>
        <Part part={part1} exercises={exercises1} />
        <Part part={part2} exercises={exercises2} />
        <Part part={part3} exercises={exercises3} />
    </>
    )
}

export default Content;