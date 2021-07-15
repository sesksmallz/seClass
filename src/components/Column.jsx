import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

function Column({ title, items, getItemStyle }) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [activeTask, setActiveTask] = useState({});
	const [modalContent, setModalContent] = useState('description');

	const Column = styled.div`
		width: 350px;
		background: ${({ isDraggingOver }) => (isDraggingOver ? '#1569d8' : '#0386e6')};
		border-radius: 4px;
		height: 400px;
		margin-right: 1rem;
		color: #fff;
		margin-top: 0.7rem;
		padding: 1rem 0.7rem 1rem 0.7rem;
		overflow-y: auto;
	`;

	const openModal = (activeTask) => {
		setModalContent('description');
		setActiveTask(activeTask);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			backgroundColor: 'white',
			width: '80%',
		},
	};

	return (
		<div>
			<strong className="column-title">{title}</strong>
			<Droppable droppableId={title}>
				{(provided, snapshot) => (
					<Column
						isDraggingOver={snapshot.isDraggingOver}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{items.length === 0 ? (
							<h5>No tasks available yet.</h5>
						) : (
							items.map((item, index) => (
								<TaskCard openModal={openModal} key={item.id} item={item} index={index} />
							))
						)}
						{provided.placeholder}
					</Column>
				)}
			</Droppable>

			<TaskModal
				closeModal={closeModal}
				customStyles={customStyles}
				item={activeTask}
				modalIsOpen={modalIsOpen}
				openModal={openModal}
				modalContent={modalContent}
				setModalContent={setModalContent}
			/>
		</div>
	);
}

export default Column;
