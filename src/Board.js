import Square from './Square.js'
import Winner from './winner.js';
import ScoreBoard  from './ScoreBoard.js';
import './Board.css';
import { useEffect, useState } from 'react';



function renderSquare(element,i,handler){
    return <Square value={element} onClick ={()=>{handler(i)}}/>
}
function renderWinner(player){

    return <Winner player={player} />;
}

function renderScore(sc1,sc2){

    return <ScoreBoard score1={sc1} score2={sc2}/>
}


function Board(){
    const [boardState,setBoardState] = useState(Array(9).fill(''));
    
    const [phase,setPhase] = useState('O');

    const [winner,setWinner] = useState(false);

    let [score1,setScore1] = useState(0);
    let [score2,setScore2] = useState(0);

    const newGame = ()=>{

        if(phase==='X'){
            setPhase('O');
        }

        setBoardState(Array(9).fill(''));
        setWinner(false);
    }
    
    const handleClick = (i)=>{
        if(!winner){// If winner end game do not re-render on click

            if(boardState[i]===''){
                const newBoardState = boardState.slice(); // copy previous state to change it and set it 
                newBoardState[i]=phase;
                setBoardState(newBoardState);
                if(phase==='O'){
                    setPhase('X');
                }
                else{
                    setPhase('O');
                    
    
                }
    
                const diagCondition = newBoardState[0]!==''&&newBoardState[0]===newBoardState[4] && newBoardState[0]===newBoardState[8];
                const r_diagCondition = newBoardState[2]!==''&&newBoardState[2]===newBoardState[4] && newBoardState[2]===newBoardState[6];
    
                const row1Condition = newBoardState[0]!==''&&newBoardState[0]===newBoardState[1] && newBoardState[0]===newBoardState[2];
                const row2Condition = newBoardState[3]!==''&&newBoardState[3]===newBoardState[4] && newBoardState[3]===newBoardState[5];
                const row3Condition = newBoardState[6]!==''&&newBoardState[6]===newBoardState[7] && newBoardState[6]===newBoardState[8];
    
                const col1Condition = newBoardState[0]!==''&&newBoardState[0]===newBoardState[3] && newBoardState[0]===newBoardState[6];
                const col2Condition = newBoardState[1]!==''&&newBoardState[1]===newBoardState[4] && newBoardState[1]===newBoardState[7];
                const col3Condition = newBoardState[2]!==''&&newBoardState[2]===newBoardState[5] && newBoardState[2]===newBoardState[8];
    
                const colCondition = col1Condition||col2Condition||col3Condition;
                const rowCondition = row1Condition||row2Condition||row3Condition;
                
                const winExpr = diagCondition||r_diagCondition||rowCondition||colCondition;
    
                if(winExpr){
                    setWinner(true);
                }
    
                
    
    
    
            }

        }
       
        
    }
    useEffect(()=>{
        let condition = phase==='O'?'X':'O';

        if(winner){
            if(condition==='X'){
                setScore2(s=>s+1);
            }else{
                setScore1(s=>s+1);
            }
        }
    },[winner]);
    
    return(
        <div className='board'>
            <div className='Score'>{renderScore(score1,score2)}</div>
            <div className='row'>
                {renderSquare(boardState[0],0,handleClick)}
                {renderSquare(boardState[1],1,handleClick)}
                {renderSquare(boardState[2],2,handleClick)}
            </div>
            <div className='row'>
            {renderSquare(boardState[3],3,handleClick)}
            {renderSquare(boardState[4],4,handleClick)}
            {renderSquare(boardState[5],5,handleClick)}
            </div>
            <div className='row'>
            {renderSquare(boardState[6],6,handleClick)}
            {renderSquare(boardState[7],7,handleClick)}
            {renderSquare(boardState[8],8,handleClick)}
            </div>
            {winner&&renderWinner(phase==='O'?'X':'O')}
            <button onClick={()=>{newGame()}}>Clear</button>
        </div>
       
        
    ) ;
}

export default Board;