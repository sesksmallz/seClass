import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { deleteTask } from '../store/actions/task.action';
import styled from 'styled-components';

const TaskCardd = styled.div`
	padding: 0.5rem;
	background-color: ${({ isDragging }) => (isDragging ? '#0373c4' : '#098eee')};
	border: 1px solid #0381db;
	border-radius: 5px;
	margin: 1.2rem 0 1.2rem 0;
	cursor: pointer;
	box-shadow: 0px 7px 42px 8px rgba(2, 12, 15, 0.2);
`;

const TaskCard = ({ openModal, item, index }) => {
	const dispatch = useDispatch();

	return (
		<Draggable draggableId={item.id.toString()} index={index}>
			{(provided, snapshot) => (
				<TaskCardd
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
					// className="task-card"
				>
					<div>
						<div className="timestamps">
							<h4 className="card-title" onClick={() => openModal(item)}>
								{item.title}
							</h4>
							<h4
								className="del-icon"
								onClick={() => dispatch(deleteTask(item.id))}
								style={{ color: '#f53542' }}
							>
								&#10006;
							</h4>
						</div>
						<div style={{ marginTop: '1rem' }} className="timestamps">
							<h5>
								Created at - <b> {`${moment(item.created_at).format('LL')} `} </b>
							</h5>
							<h5>
								Updated at - <b> {`${moment(item.updated_at).format('LL')}`} </b>
							</h5>
						</div>
					</div>
				</TaskCardd>
			)}
		</Draggable>
	);
};

export default TaskCard;
