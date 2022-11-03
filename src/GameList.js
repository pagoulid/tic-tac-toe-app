import './GameList.css';

/*ArrOfArrs.map(item=><li className='Game-item'>{item}</li>)*/ 
function GameList(props){
    let gameItems = props.games;
    const split = (array, n) => {
        const [...arr] = array;
        const res = [];
        while (arr.length) {
          res.push(arr.splice(0, n));
        }
        return res;
      };
    let ArrOfArrs = split(gameItems,3);
    
    return(
        <div className='Game-List'>
               
                   {ArrOfArrs.map(arr=>{
                       return <ul className='Game-List-Area'>
                            {(arr.length===3&&arr.map(item=><li className='Game-item'>{item}</li>))
                            || (arr.length===1&&arr.map(item=><li className='MonoGame-item'>{item}</li>))
                            ||(arr.length===2&&arr.map(item=><li className='TwoGame-item'>{item}</li>))}
                        </ul>
                   })}
                    
                

        </div>
     
    );
}

export default GameList;