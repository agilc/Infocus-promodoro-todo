import React, { useState, useEffect } from 'react';
import { List, Input, Radio, Button } from 'antd';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faList, faWindowClose, faStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { DownloadOutlined } from '@ant-design/icons';

import { addTodoItem } from 'actions/Todo';

const POMODORO_TIME = 10;

let MainContent = ({addTodoItem, todoList, selectedTodoCategory}) => {
  const [selectedTodo, setSelectedTodo] = useState({}),
        [stateTodoList, setStateTodoList] = useState([]),
        [currentPomodoroTodo, setCurrentPomodoroTodo] = useState(null);

  useEffect(() => {
    updateTodoList();
  }, [todoList]);

  useEffect(() => {
    updateTodoList();
  }, [selectedTodoCategory]);

  const updateTodoList = () => {
    if(selectedTodoCategory === 0)
      setStateTodoList(todoList.filter(item => item.isFavorite ));
    else
      setStateTodoList(todoList.filter(item => item.category === selectedTodoCategory ));
  }

  const onTodoListItemChange = (e) => {
    debugger;
    let value = e.target.value;
    let updatedTodoList = todoList.map(item => {
      if(item.id === selectedTodo.id)
        return { ...item, 'id': item.id, 'value': value };
      return item;
    })
    addTodoItem(updatedTodoList);
    setSelectedTodo({...selectedTodo, value: value});
    console.log(e);
  }

  const onTodoItemKeyUp = e => {
    if(e.keyCode === 13){
      setSelectedTodo({});
    }
  }

  const onTodoItemSelect = (e, item) => {
    e.stopPropagation();
    setSelectedTodo(item);
  }

  const onTodoItemAdd = (e) => {
    debugger;
    e.stopPropagation();
    let newItem = [];
    if(todoList && todoList.length>0)
      newItem = {id: todoList[todoList.length-1].id + 1, value: "", category: selectedTodoCategory, isDone: false, isFavorite: false };
    else 
      newItem = {id: 1, value: "", category: selectedTodoCategory, isDone: false };
    addTodoItem([...todoList, newItem ]);
    setSelectedTodo(newItem);
  }

  const onTodoItemDelete = (e, todoItem) => {
    e.stopPropagation();
    let updatedTodoList = todoList.filter(item => item.id !== todoItem.id);
    addTodoItem(updatedTodoList);
  }

  const addToFavourites = (e, todoItem) => {
    e.stopPropagation();
    let updatedTodoList = todoList.map(item => {
      if(item.id === todoItem.id)
        return { ...todoItem , 'isFavorite': !todoItem.isFavorite };
      return item;
    })
    addTodoItem(updatedTodoList);
  }

  const onTodoItemComplete = e => {
    debugger;
    e.stopPropagation();
    let value = e.target.value;
    let updatedTodoList = todoList.map(item => {
      if(item.id == value)
        return { ...item , 'isDone': !item.isDone };
      return item;
    })
    addTodoItem(updatedTodoList);
    console.log(e.target.value);
  }

  const onPomodoroStart = (e,todoItem) => {
    e.stopPropagation();
    setCurrentPomodoroTodo(todoItem);
  }

  const getTodoListContent = (todoItem) => {
    return (
      <div className="todo-item-wrapper">
        { selectedTodo.id === todoItem.id ? <Input value={selectedTodo.value} onChange={e => onTodoListItemChange(e)} onKeyUp={onTodoItemKeyUp}/> :  <div>{todoItem.value}</div> }
        <div className="todo-action-btn">
          <div className="timer-wrapper">
            {
              currentPomodoroTodo ? 
              <CountdownCircleTimer
                isPlaying={currentPomodoroTodo}
                duration={POMODORO_TIME}
                size={35}
                strokeWidth={2}
                strokeLinecap={2}
                trailColor="white"
                isLinearGradient={true}
                ariaLabel="AGil"
                colors={[
                  ['#0146ad', 0.33],
                  ['#0147ad', 0.33],
                  ['#438bfc', 0.33]
                ]}
                onComplete={() => setCurrentPomodoroTodo(null)}
              >
                {({ remainingTime }) => parseInt(remainingTime/60)}
              </CountdownCircleTimer>
              : <Button type="primary" shape="circle" onClick={(e) => onPomodoroStart(e,todoItem)} icon={<FontAwesomeIcon icon={faPlay} style={{color:'#427bfb'}}/>} style={{backgroundColor:'white'}}/>
            }
          </div>
        
          <div className="action-item"><FontAwesomeIcon icon={todoItem.isFavorite ? faStar : faStarRegular } onClick={(e) => addToFavourites(e, todoItem)}/></div> 
          <div className="action-item"><FontAwesomeIcon icon={faWindowClose} onClick={(e) => onTodoItemDelete(e, todoItem)}/></div> 
        </div>
      </div>
    )
  }

  return (
    <div className="main-content-wrapper" onClick={() => setSelectedTodo({})}>
      <div className="todo-items-list">
        <List
          split={true}
          // bordered={true}
          itemLayout="horizontal"
          dataSource={stateTodoList}
          renderItem={item => (
            <List.Item className={`list-item ${item.isDone && 'todo-completed'}`}>
              <List.Item.Meta
                avatar={selectedTodo.id !== item.id && <Radio value={item.id} checked={item.isDone} onClick={onTodoItemComplete}></Radio>}
                title={getTodoListContent(item)}
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                onClick={(e) => onTodoItemSelect(e, item)}
              />
            </List.Item>
          )}
        />
      </div>
      {
        selectedTodoCategory !== 0 &&
        <div className="add-more-icon">
          <FontAwesomeIcon className="cursor-pointer" icon={faPlusCircle} onClick={onTodoItemAdd}/>
        </div>
      }
    </div>
  )
}

const mapStateToProps = ({ todo }) => {
  const { todoList, selectedTodoCategory } = todo;

  return {
    todoList,
    selectedTodoCategory
  };
};

export default connect(
  mapStateToProps,
  {
    addTodoItem
  }
)(MainContent);