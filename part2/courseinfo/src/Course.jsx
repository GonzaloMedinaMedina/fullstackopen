
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

const Total = (props) => 
{
    const total = props.parts.reduce((total, currentPart) => total + currentPart.exercises, 0);
    
    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}


const Course = (props) => 
{
    const course = props.course;

    return (<div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>)
}

export default Course;