import { taskActions } from '../actions/task.action';

const initialState = {
	tasks: [],
};

export default function taskReducer(state = initialState, action) {
	switch (action.type) {
		case taskActions.ADD_TASK:
			return { ...state, tasks: [...state.tasks, action.payload] };
		case taskActions.EDIT_TASK:
			console.log('edited payload ----> ', action.payload);
			const newUsers = state.tasks.filter((obj) => obj.id !== action.payload.id);
			newUsers.push(action.payload);
			return { ...state, tasks: [...newUsers] };
		case taskActions.DEL_TASK:
			const tasks = state.tasks.filter((obj) => obj.id !== action.payload);
			return { ...state, tasks };
		case taskActions.FETCH_TASKS:
			return { ...state, tasks: [...action.payload] };
		case taskActions.REORDER:
			return { ...state, tasks: [...action.payload] };
		default:
			return state;
	}
}
