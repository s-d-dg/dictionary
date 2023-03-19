import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { allWordsActions } from '../../store/dictionary';
import { loadAllWords } from '../../store/dictionary/service';
import styles from './content.module.css';
import Dictionary from './dictionary/dictionary';

function Content() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allWordsActions.loadWords());
        loadAllWords()(dispatch);
    }, []);

    return <Dictionary />
}

export default Content;