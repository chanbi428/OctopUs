import {React} from 'react';
import FishAnim from './FishGameStart';
import SharkAnim from './SharkGameStart';

function AnimationRouter(props) {
  console.log('animation router'+props.gameNum);
    return (
        <div>
        {props.gameNum === 1 && (
          <FishAnim/>
        )}
        {props.gameNum === 2 && (
          <SharkAnim/>
        )}
      </div>
    )
}

export default AnimationRouter;