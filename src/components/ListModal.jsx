import React, { useState } from 'react';
import { Modal, Typography, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setVisible, setConfirmLoading } from '../store/reducers/modalSlice';
import { addList, updateList } from '../store/reducers/todosSlice';
import { addTodos, clearCurrent, setDisplayAddTodo, setTitle } from '../store/reducers/currentSlice';
import TodosModal from './TodosModal';
import CompletedModal from './CompletedModal';

const ListModal = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { visible, confirmLoading } = useSelector(state => state.modal);
    const { id, title, displayAddTodo, todos, completed } = useSelector(state => state.current);

    const cancelModal = () => {
        dispatch(setVisible(false));
        dispatch(setConfirmLoading(false));
        dispatch(clearCurrent());
    }

    const addNewTodoBlock = () => {
        dispatch(setDisplayAddTodo(false))
        dispatch(addTodos(''));
    }

    const submitList = () => {
        dispatch(setConfirmLoading(true));

        if (!id) {
            dispatch(addList({
                id: new Date().toISOString(),
                title,
                username: user.username,
                items: todos,
                completed,
            }));
        } else {
            dispatch(updateList({
                id,
                title,
                items: todos,
                completed,
            }));
        }

        cancelModal();
        dispatch(clearCurrent());
    }

    return (
        <Modal
            title={
                <Typography.Paragraph editable={{
                    triggerType: 'text', 
                    onChange: (value) => {
                        dispatch(setTitle(value));
                    }
                }}>
                    {title}
                </Typography.Paragraph>
            }
            visible={visible}
            onOk={submitList}
            confirmLoading={confirmLoading}
            onCancel={cancelModal}
        >
            <TodosModal />
            {displayAddTodo &&
                <Row justify="center" align="middle" className="add-new-todo" onClick={addNewTodoBlock}>
                    <PlusOutlined /> New Todo
                </Row>
            }
            <CompletedModal />
        </Modal>
    );
};

export default ListModal;