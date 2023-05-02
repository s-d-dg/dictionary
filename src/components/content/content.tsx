import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { allWordsActions, fetchAllWords } from '../../store/dictionary';
import styles from './content.module.css';
import Dictionary from './dictionary/dictionary';
import {ThunkDispatch} from "@reduxjs/toolkit";

function Content() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => {
        dispatch(fetchAllWords());
    }, []);

    return <Dictionary />
}

export default Content;