import styles from './search-input.module.css';
import magnifyingGlass from '../../../../assets/img/m_g.png';
import { ChangeEvent, useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

interface SearchInputPropTypes {
    onChange: (input: string) => void
}

function SearchInput({ onChange }: SearchInputPropTypes) {
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 300)
        , []);


    return <div className={styles['search-input']}>
        <img src={magnifyingGlass} className={styles['magnifying-glass']} alt='magnifying glass' />
        <input
            className={styles['main-input']}
            onChange={debouncedChangeHandler} />
    </div>
}

export default SearchInput;