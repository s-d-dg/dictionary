
interface WordListPropTypes {
    words: string[]
}

const WordList = ({ words }: WordListPropTypes) => {
    return <ul>
        {words.map((word: string) => (<li key={word}>{word}</li>))}
    </ul>
}

export default WordList;