import styles from './search-input.module.css';
import magnifyingGlass from '../../../../assets/img/m_g.png';

interface SearchInputPropTypes {
    onChange: (input: string) => void
}

function SearchInput({ onChange }: SearchInputPropTypes) {
    return <div className={styles['search-input']}>
        <img src={magnifyingGlass} className={styles['magnifying-glass']} alt='magnifying glass' />
        <input className={styles['main-input']} onChange={(input) => onChange(input.target.value)} />
    </div>
}

export default SearchInput;