import { useRef, useEffect } from 'react';


function InputWithLabel({ children, value, onChange}) {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <label htmlFor="todoTitle">{children}Title </label>
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
}



export default InputWithLabel;