import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "./searchInput/search-input";
import WordList from "./wordList/wordList";
import WordListContainer from "./wordListContainer/wordListContainer";
import { allWordsActions } from '../../../store/dictionary';

const Dictionary = () => {
    const [phrase, setPhrase] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allWordsActions.filterBy(phrase));
    }, [phrase]);


    const onChangeInput = useCallback((input: string) => {
        setPhrase(input);
    }, []);

    return <>
        <SearchInput onChange={onChangeInput} />
        <WordListContainer />
    </>
}

export default Dictionary;