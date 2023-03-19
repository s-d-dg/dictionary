import styles from './search-input.module.css';
import magnifyingGlass from '../../../../assets/img/m_g.png';
import { ChangeEvent, useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { alphabet } from '../../../../store/dictionary/model';

interface SearchInputPropTypes {
    onChange: (input: string) => void
}

const allowedCharacters = [...alphabet, '*'];

function SearchInput({ onChange }: SearchInputPropTypes) {
    const [error, setError] = useState<null | string>(null);

    const isValid = (value: string) => {
        if (value.charAt(0) === '*') {
            // Requirement is not specified in task, however
            // I had to make assumption because of implementation of dictionary obj in the store. 
            setError("Word can not start with wild card");
            return false;
        }
        if (value.split('').every(v => allowedCharacters.includes(v))) {
            setError(null);
            return true;
        }

        setError("Incorrect value, input can only contain alphabetic values and ' * ' ");
        return false;
    }

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();

        if (isValid(value)) {
            onChange(event.target.value);
        }
    };

    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 300)
        , []);


    const withError = error ? styles['input-error'] : '';
    return <>
        <div className={[styles['search-input'], withError].join(' ')}>
            <img src={magnifyingGlass} className={styles['magnifying-glass']} alt='magnifying glass' />
            <input
                className={styles['main-input']}
                onChange={debouncedChangeHandler} />
        </div>
        {error && (<div className={styles['error']}>{error}</div>)}
    </>
}

export default SearchInput;