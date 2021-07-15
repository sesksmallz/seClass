import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/actions/task.action';
import Form from './Form';
import moment from 'moment';

const TaskModal = ({ modalIsOpen, closeModal, customStyles, item, modalContent, setModalContent }) => {
	const dispatch = useDispatch();

	const onDelClick = () => {
		dispatch(deleteTask(item.id));
		closeModal();
	};

	return (
		<>
			<Modal
				overlayClassName="modal-overlay"
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				appElement={document.getElementById('root')}
			>
				{modalContent === 'description' ? (
					<div
						style={{
							margin: '1px auto',
						}}
					>
						<div style={{ marginBottom: '1rem' }} className="timestamps">
							<h3 className="modal-title">{item.title}</h3>
							<h4
								className="del-icon"
								style={{ color: '#f53542', cursor: 'pointer' }}
								onClick={closeModal}
							>
								&#10006;
							</h4>
						</div>
						<div className="timestamps">
							<h5>{`Created at - ${moment(item.created_at).format('LLL')} `}</h5>
							<h5>{`Updated at - ${moment(item.updated_at).format('LLL')}`}</h5>
						</div>
						<div style={{ marginTop: '1rem' }}>
							<p className="description">{item.description}</p>
						</div>
						<div className="timestamps">
							<div style={{ display: 'flex', justifyContent: 'start' }}>
								<div
									className="edit-but"
									onClick={() => setModalContent('edit-form')}
									style={{ marginRight: '6px' }}
								>
									Edit
								</div>
								<div className="close-but" onClick={onDelClick}>
									Delete
								</div>
							</div>
							<div style={{ display: 'flex' }}>
								<h3>Current status {'=>'} </h3>
								<div className="status">{item.status}</div>
							</div>
						</div>
					</div>
				) : (
					<Form formTitle="Edit this task" closeModal={closeModal} formType="edit" item={item} />
				)}
			</Modal>
		</>
	);
};

export default TaskModal;
