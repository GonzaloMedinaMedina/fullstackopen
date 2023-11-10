
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
    const parts = props.parts;

    return (
    <>
        <Part name={parts[0].name} exercises={parts[0].exercises} />
        <Part name={parts[1].name} exercises={parts[1].exercises} />
        <Part name={parts[2].name} exercises={parts[2].exercises} />
    </>
    )
}

export default Content;