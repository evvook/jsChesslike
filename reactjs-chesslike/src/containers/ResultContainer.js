import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Result from "../components/Result"
import * as resultActions from '../modules/result'

const ResultContainer = ({matchContext}) => {

    const dispatch = useDispatch()
    useEffect(()=>{
        if(matchContext?.status !== 'ongoing'){
            dispatch(resultActions.set(matchContext))
        }
    },[matchContext])

    const result = useSelector(state=>state.resultData.result);

    return (
        <Result result={result}></Result>
    )
}

export default ResultContainer;