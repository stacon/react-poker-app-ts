import { combineReducers } from 'redux';
import allReducers from 'src/reducers';

console.log('>>>> All_Reducers', allReducers)

const rootReducer = combineReducers(allReducers);

export default rootReducer;