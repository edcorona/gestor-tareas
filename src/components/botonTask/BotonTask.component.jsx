

const BotonTask = ({label, handleClick}) => {



    return (
        <button onClick={handleClick}> 
            {label}
        </button>
    );
}

export default BotonTask