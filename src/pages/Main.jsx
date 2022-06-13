import React, { useEffect } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Col, Popconfirm, Row, Typography } from 'antd';
import ListModal from '../components/ListModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrent, setCurrent } from '../store/reducers/currentSlice';
import { setVisible } from '../store/reducers/modalSlice';
import { removeList } from '../store/reducers/todosSlice';

const Main = () => {
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector(state => state.auth);
    let { todos } = useSelector(state => state.todos);

    if (isAuth) {
        todos = todos.filter(item => item.username == user.username);
    }

    const openModal = (id) => {
        const todo = todos.find(item => item.id == id);
        dispatch(setCurrent(todo));
        dispatch(setVisible(true));
    }

    const deleteList = (id, username) => {
        if (user.username == username) {
            dispatch(removeList(id));
        }
    }

    useEffect(() => {
        dispatch(setVisible(false));
        dispatch(clearCurrent());
    }, []);

    return (
        <div className="todo-wrapper">
            <ListModal />
            <Row gutter={[16, 16]}>
                {todos.map(list => (
                    <Col span={6} key={list.id}>
                        <Card 
                            hoverable 
                            title={list.title}
                            actions={isAuth 
                                ?
                                [
                                    <Typography.Paragraph className="author" key="author" ellipsis={true}>{list.username}</Typography.Paragraph>,
                                    <EditOutlined key="edit" onClick={() => openModal(list.id)} />,
                                    <Popconfirm 
                                        title="Are you sure to delete this todo list?"
                                        onConfirm={() => deleteList(list.id, list.username)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined key="delete" />
                                    </Popconfirm>,
                                ]
                                :
                                [
                                    <Typography.Paragraph className="author" key="author" ellipsis={true}>{list.username}</Typography.Paragraph>,
                                ]
                            }
                        >
                            {list.items.map(item => (
                                <p key={item.id}>{item.label}</p>
                            ))}
                            {list.completed.length > 0 &&
                                <p className="completed-count">+{list.completed.length} completed</p>
                            }
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Main;