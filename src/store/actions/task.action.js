import { toast } from 'react-toastify';
import parseServerErrors from '../../utils/parse-server-errors';
import api from '../../network/api';

export const taskActions = {
	ADD_TASK: 'ADD_TASK',
	EDIT_TASK: 'EDIT_TASK',
	DEL_TASK: 'DEL_TASK',
	FETCH_TASKS: 'FETCH_TASKS',
	REORDER: 'REORDER',
};

export const add = (task) => async (dispatch) => {
	try {
		const response = await api.post('/tasks', task);
		toast.success('Task added!!');
		dispatch({ type: taskActions.ADD_TASK, payload: response.data });
	} catch (err) {
		const errmes = parseServerErrors(err);
		toast.error(errmes);
	}
};

export const edit = (id, editedTask) => async (dispatch) => {
	try {
		const response = await api.patch(`/tasks/${id}`, editedTask);
		toast.success('Task Edited!!');
		dispatch({ type: taskActions.EDIT_TASK, payload: response.data });
	} catch (error) {
		const errmes = parseServerErrors(error);
		toast.error(errmes);
	}
};

export const deleteTask = (id) => async (dispatch) => {
	try {
		await api.delete(`/tasks/${id}`);
		toast.error('Task Deleted!!');
		dispatch({ type: taskActions.DEL_TASK, payload: id });
	} catch (error) {
		const errmes = parseServerErrors(error);
		toast.error(errmes);
	}
};

export const getTasks = (setLoading) => async (dispatch) => {
	try {
		const response = await api.get('/tasks');
		setLoading(false);
		dispatch({ type: taskActions.FETCH_TASKS, payload: response.data });
	} catch (error) {
		const errmes = parseServerErrors(error);
		toast.error(errmes);
	}
};

export const reorderTask = (tasks, startIndex, endIndex) => (dispatch) => {
	try {
		const results = Array.from(tasks);
		const [removed] = results.splice(startIndex, 1);
		results.splice(endIndex, 0, removed);
		dispatch({ type: taskActions.REORDER, payload: results });
	} catch (error) {
		const errmes = parseServerErrors(error);
		toast.error(errmes);
	}
};
