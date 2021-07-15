import { combineReducers } from 'redux';
import authReducer from './reducers/auth.reducer';
import tasksReducer from './reducers/task.reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	tasks: tasksReducer,
});

export default rootReducer;
