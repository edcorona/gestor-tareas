

const BotonTask = ({className,label, handleClick}) => {



    return (
        <button className={className} onClick={handleClick}> 
            {label}
        </button>
    );
}

export default BotonTask