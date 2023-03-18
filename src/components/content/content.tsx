import { useState, useEffect } from 'react';
import { getWords } from '../../store/words-service';
import SearchInput from '../search-input/search-input';
import styles from './content.module.css';

function Content() {
    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        const dictionaryWords = getWords();
        setWords(dictionaryWords);
    }, []);

    return <>
        <SearchInput />
        {!words.length ? 'Loading....' :
            (<ul>
                {words.map(word => (<li key={word}>{word}</li>))}
            </ul>)
        }
    </>
}

export default Content;