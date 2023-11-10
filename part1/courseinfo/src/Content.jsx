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
        <p>
            {part1} {exercises1}
        </p>
        <p>
            {part2} {exercises2}
        </p>
        <p>
            {part3} {exercises3}
        </p>
    </>
    )
}

export default Content;