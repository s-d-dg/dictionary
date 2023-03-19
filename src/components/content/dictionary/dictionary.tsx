import { useCallback, useDeferredValue, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchInput from "./searchInput/search-input";
import WordList from "./wordListContainer/wordList/wordList";
import WordListContainer from "./wordListContainer/wordListContainer";

const Dictionary = () => {
    const [phrase, setPhrase] = useState('');


    const { words, loading, error } = useSelector(
        (state: any) => state.dictionary
    );


    const onChangeInput = useCallback((input: string) => {
        // TODO validation input
        setPhrase(input);
    }, []);

    return <>
        <SearchInput onChange={onChangeInput} />
        <WordListContainer phrase={phrase} />
    </>
}

export default Dictionary;