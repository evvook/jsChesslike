import './Buttons.css'

function Buttons(props){

    const click = () => {
        props.manager.undo();
        props.onMove(props.manager.getGameContext().boardContext)
    }

    return (
        <div className='container'>
            <div className="undo" onClick={click}>실행취소</div>
        </div>
    )
}

export default Buttons;