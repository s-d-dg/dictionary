
interface WordListPropTypes {
    words: string[],
    loading: boolean
}

const WordList = ({ words, loading }: WordListPropTypes) => {

    

    return <>
        {loading ? 'Loading....' :
            (<ul>
                {words.map((word: string) => (<li key={word}>{word}</li>))}
            </ul>)
        }
    </>
}

export default WordList;