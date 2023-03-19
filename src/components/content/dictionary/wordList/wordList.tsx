import styles from './wordList.module.css';

interface WordListPropTypes {
    words: string[]
}

const WordList = ({ words }: WordListPropTypes) => {
    return <div className={styles['words-container']}>
        {words.length === 0 && <div>No results found</div>}
        {words.map((word: string) => (<div className={styles['single-word']} key={word}>{word}</div>))}
    </div>
}

export default WordList;