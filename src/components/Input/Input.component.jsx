const Input = ({placeholder,value, onChangeValue}) => {
    return (
        <input 
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
        />
    );
}

export default Input;