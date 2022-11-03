import Text from './text.js'
import './Square.css';

function Square(props){
    
    
    return(
        <div className='block' onClick={props.onClick}>
            <Text value={props.value}/>
        </div>
    )
}

export default Square;