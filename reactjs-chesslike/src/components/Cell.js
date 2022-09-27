import { useDispatch } from 'react-redux';
import './Cell.css';
import * as boardActions from '../modules/board';
import React from 'react';

function Cell(props){

    const dispatch = useDispatch();

    function click(e){
        dispatch(boardActions.select(e.target.id));        
    }
    return(
        <div className={"cell"+props.append} id={props.id} style={{backgroundColor:props.color}} onClick={click}>{props.children}</div>
    );
}

export default React.memo(Cell);