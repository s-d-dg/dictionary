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

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();

        if (isValid(value)) {
            onChange(event.target.value);
        }
    };

    const isValid = (value: string) => {
        if (value.split('').every(v => allowedCharacters.includes(v))) {
            setError(null);
            return true;
        }

        setError("Incorrect value, input can only contain alphabetic values and ' * ' ");
        return false;
    }

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