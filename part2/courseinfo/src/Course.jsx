
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

const Header = (props) =>
{
    const course = props.course;
    return (
        <>
            <h1>{course}</h1>
        </>
    )
}

const Content = (props) => 
{
    const parts = props.parts;

    return (
    <>
        {parts.map(part => <Part name={part.name} exercises={part.exercises}/>)}
    </>
    )
}


const Course = (props) => 
{
    const course = props.course;

    return (<div>
        <Header course={course.name} />
        <Content parts={course.parts} />
      </div>)
}

export default Course;