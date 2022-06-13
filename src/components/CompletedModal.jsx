import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Divider, List, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { addTodos, removeCompleted, setDisplayAddTodo, updateCompletedLabel } from '../store/reducers/currentSlice';

const CompletedModal = () => {
    const dispatch = useDispatch();
    const { completed } = useSelector(state => state.current);

    if (!completed.length) {
        return;
    }

    const toggle = (todo) => {
        dispatch(addTodos(todo.label));
        dispatch(removeCompleted(todo.id));
    }

    const remove = (id) => {
        dispatch(removeCompleted(id));
        dispatch(setDisplayAddTodo(true));
    }

    return (
        <>
            <Divider plain><Typography.Text type="secondary">{completed.length} completed</Typography.Text></Divider>
            <List
                size="small"
                className="completed-list"
                dataSource={completed}
                renderItem={item => 
                    <List.Item>
                        <Checkbox checked={true} onChange={() => toggle(item)} />
                        <Typography.Paragraph editable={{
                            triggerType: ['text', 'icon'], 
                            onChange: (value) => { 
                                dispatch(updateCompletedLabel({
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
        </>
    );
};

export default CompletedModal;