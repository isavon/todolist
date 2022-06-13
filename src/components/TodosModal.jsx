import React from 'react';
import { Checkbox, List, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addCompleted, removeTodo, setDisplayAddTodo, updateTodoLabel } from '../store/reducers/currentSlice';

const TodosModal = () => {
    const dispatch = useDispatch();
    const { todos } = useSelector(state => state.current);

    if (!todos.length) {
        return;
    }

    const toggle = (todo) => {
        dispatch(addCompleted(todo.label));
        dispatch(removeTodo(todo.id));
    }

    const remove = (id) => {
        dispatch(removeTodo(id));
        dispatch(setDisplayAddTodo(true));
    }

    return (
        <List
            size="small"
            dataSource={todos}
            renderItem={item => 
                <List.Item>
                    <Checkbox checked={false} onChange={() => toggle(item)} />
                    <Typography.Paragraph editable={{
                        triggerType: ['text', 'icon'], 
                        onChange: (value) => { 
                            dispatch(updateTodoLabel({
                                id: item.id,
                                value,
                            }));
                            dispatch(setDisplayAddTodo(true));
                        },
                    }}>
                        {item.label}
                    </Typography.Paragraph>
                    <CloseOutlined onClick={() => remove(item.id)} />
                </List.Item>
            }
        />
    );
};

export default TodosModal;