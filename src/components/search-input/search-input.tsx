import styles from './search-input.module.css';
import magnifyingGlass from '../../assets/img/m_g.png';

function SearchInput() {
    return <div className={styles['search-input']}>
        <img src={magnifyingGlass} className={styles['magnifying-glass']} alt='magnifying glass'/>
        <input className={styles['main-input']}/>
    </div>
}

export default SearchInput;