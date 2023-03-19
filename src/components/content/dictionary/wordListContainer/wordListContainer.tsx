import { useDeferredValue, useEffect } from "react";

interface WordListContainerPropTypes {
    phrase: string
}


const WordListContainer = ({ phrase }: WordListContainerPropTypes) => {
    // const deferredValue = useDeferredValue(phrase);

    useEffect(() => {

    }, [phrase]);

    return <>Test</>
}

export default WordListContainer;