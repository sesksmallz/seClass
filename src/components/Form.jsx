import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { add, edit } from '../store/actions/task.action';
import { BeatLoader } from 'react-spinners';

const Form = ({ formType, formTitle, closeModal, item }) => {
	const dispatch = useDispatch();

	const taskForm = {
		add: useFormik({
			initialValues: {
				title: '',
				description: '',
			},
			onSubmit: (values) => {
				dispatch(add(values));
				closeModal();
			},
			validationSchema: Yup.object({
				title: Yup.string().required('Task title is required'),
			}),
		}),
		edit: useFormik({
			initialValues: {
				title: item?.title,
				description: item?.description,
				status: item?.status,
			},
			onSubmit: (values) => {
				dispatch(edit(item.id, values));
				closeModal();
			},
			validationSchema: Yup.object({
				title: Yup.string().required('Task title is required'),
			}),
		}),
	};

	const renderSubmit = (formType, loading) => {
		console.log('Loadding ----> ', loading);
		if (formType === 'add') {
			return 'Add';
		} else if (formType === 'edit') {
			return 'Edit';
		} else if (loading) {
			return <BeatLoader size={12} color="#fff" />;
		} else {
			return formType === 'add' ? 'Add' : 'Edit';
		}
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div style={{ marginBottom: '1rem' }} className="timestamps">
					<h3 className="modal-title">{formTitle}</h3>
					<h4
						style={{ color: '#f53542', cursor: 'pointer', marginLeft: '3rem' }}
						onClick={closeModal}
					>
						&#10006;
					</h4>
				</div>
				<form className="form-wrapper" onSubmit={taskForm[formType].handleSubmit}>
					<input
						className="form-input"
						type="text"
						name="title"
						placeholder="Title"
						value={taskForm[formType].values.title}
						onChange={taskForm[formType].handleChange}
					/>
					{taskForm[formType].errors.title ? <p>{taskForm[formType].errors.title}</p> : null}
					<textarea
						className="text-area"
						name="description"
						placeholder="Description"
						value={taskForm[formType].values.description}
						onChange={taskForm[formType].handleChange}
					/>
					{formType === 'edit' && (
						<select
							className="form-select"
							name="status"
							value={taskForm[formType].values.status}
							onChange={taskForm[formType].handleChange}
						>
							{['open', 'todo', 'doing', 'testing', 'completed'].map((item) => (
								<option key={item} value={item}>
									{item.toUpperCase()}
								</option>
							))}
						</select>
					)}
					<button type="submit" className="edit-but">
						{renderSubmit(formType, taskForm[formType].isSubmitting)}
					</button>
				</form>
			</div>
		</>
	);
};

export default Form;
