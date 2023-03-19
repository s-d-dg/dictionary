import { useDeferredValue, useEffect } from "react";
import { useSelector } from "react-redux";
import WordList from "../wordList/wordList";

// interface WordListContainerPropTypes {
//     phrase: string
// }


const WordListContainer = () => {
    const { loading, filteredWords } = useSelector(
        (state: any) => state.dictionary
    );

    return <WordList
        loading={loading}
        words={filteredWords} />
}

export default WordListContainer;