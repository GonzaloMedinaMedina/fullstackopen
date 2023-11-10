const Total = (props) => 
{
    const total = props.parts.reduce((total, currentPart) => total + currentPart.exercises, 0);
    
    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}

export default Total;