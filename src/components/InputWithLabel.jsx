import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';


function InputWithLabel({ children, value, onChange}) {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <label htmlFor="todoTitle"> {children} </label>
                <input
                    id="todoTitle"
                    type="text"
                    name="title"
                    value={value}
                    onChange={onChange}
                    ref={inputRef}
                />
        </>
    )
};

InputWithLabel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};



export default InputWithLabel;