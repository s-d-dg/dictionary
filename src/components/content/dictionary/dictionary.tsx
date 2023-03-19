import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "./searchInput/search-input";
import WordList from "./wordList/wordList";
import { allWordsActions } from '../../../store/dictionary';
import { filterByPhrase } from "../../../store/dictionary/service";
import Loader from "../../../ui/loader/loader";
import styles from "./dictionary.module.css";

const Dictionary = () => {
    const [phrase, setPhrase] = useState<null | string>(null);
    const dispatch = useDispatch();
    const { dictionary, loading, filteredWords } = useSelector(
        (state: any) => state.dictionary
    );

    useEffect(() => {
        if (phrase !== null) {
            filterByPhrase(phrase, dictionary)(dispatch);
        }
    }, [phrase]);


    const onChangeInput = useCallback((input: string) => {
        dispatch(allWordsActions.filterBy(input));
        setPhrase(input);       
    }, []);

    return (<>
        <SearchInput onChange={onChangeInput} />

        {loading ? (
            <div className={styles['loader-container']}>
                <Loader />
            </div>) : (
            <div className={styles['results-container']}>
                <WordList words={filteredWords} />
            </div>)}
    </>)
}

export default Dictionary;