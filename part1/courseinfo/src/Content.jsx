
const Part = (props) => 
{
    const name = props.name;
    const exercises = props.exercises;

    return (
        <>
            <p>
                {name} {exercises}
            </p>
        </>
    )
}

const Content = (props) => 
{
    const name1 = props.part1.name
    const exercises1 = props.part1.exercises
    const name2 = props.part2.name
    const exercises2 = props.part2.exercises
    const name3 = props.part3.name
    const exercises3 = props.part3.exercises

    return (
    <>
        <Part name={name1} exercises={exercises1} />
        <Part name={name2} exercises={exercises2} />
        <Part name={name3} exercises={exercises3} />
    </>
    )
}

export default Content;