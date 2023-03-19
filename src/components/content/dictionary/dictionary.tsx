import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "./searchInput/search-input";
import WordList from "./wordList/wordList";
import { allWordsActions } from '../../../store/dictionary';
import { filterByPhrase } from "../../../store/dictionary/service";

const Dictionary = () => {
    const [phrase, setPhrase] = useState('');
    const dispatch = useDispatch();
    const { dictionary, loading, filteredWords } = useSelector(
        (state: any) => state.dictionary
    );


    useEffect(() => {
        filterByPhrase(phrase, dictionary)(dispatch);
    }, [phrase]);


    const onChangeInput = useCallback((input: string) => {
        dispatch(allWordsActions.filterBy(input));
        setPhrase(input);
    }, []);

    return <>
        <SearchInput onChange={onChangeInput} />
        {loading ? 'Loading...' :
            <WordList words={filteredWords} />}
    </>
}

export default Dictionary;