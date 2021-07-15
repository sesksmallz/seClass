import React from 'react';
import Modal from 'react-modal';
import Form from './Form';

const TaskModalForm = ({ modalIsOpen, closeModal, customStyles }) => {
	return (
		<>
			<Modal
				isOpen={modalIsOpen}
				style={customStyles}
				onRequestClose={closeModal}
				overlayClassName="modal-overlay"
				appElement={document.getElementById('root')}
				closeTimeoutMS={500}
			>
				<div>
					<Form formType="add" closeModal={closeModal} formTitle="Add a new task" />
				</div>
			</Modal>
		</>
	);
};

export default TaskModalForm;
