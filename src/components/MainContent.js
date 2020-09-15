/* global chrome */

import React, { useState, useEffect } from 'react';
import { List, Input, Radio, Button } from 'antd';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faList, faWindowClose, faStar, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { addTodoItem, startPomodoro } from 'actions/Todo';
import WarningModal from 'components/modal/WarningModal';

const POMODORO_TIME = 1500;

let MainContent = ({addTodoItem, todoList, selectedTodoCategory, startPomodoro}) => {
  const [selectedTodo, setSelectedTodo] = useState({}),
        [stateTodoList, setStateTodoList] = useState([]),
        [currentPomodoroTodo, setCurrentPomodoroTodo] = useState(null),
        [pomodoroDetails, setPomodoroDetails] = useState({}),
        [secondPomodoroDetails, setSecondPomodoroDetails] = useState({}),
        [showPomodoroInterruptModal, setShowPomodoroInterruptModal] = useState(false);

  useEffect(() => {
    chrome.storage && chrome.storage.local.get(['current_pomodoro'], function(result) {
      if(result.todo_categories){
        let time = result.todo_categories.startTime;
        let remainingTime = POMODORO_TIME - (Date.now()-time)/1000;
        setPomodoroDetails({...result.todo_categories, remainingTime: remainingTime});
        if(remainingTime > 0){
          setCurrentPomodoroTodo(todo_categories)
        }
      }
    });

    let todo_categories = JSON.parse(localStorage.getItem('current_pomodoro'));
    if(todo_categories){
      let time = todo_categories.startTime;
      let remainingTime = POMODORO_TIME - (Date.now()-time)/1000;
      setPomodoroDetails({...todo_categories, remainingTime: remainingTime });
      if(remainingTime > 0){
        setCurrentPomodoroTodo(todo_categories.todo);
      }
    }
  }, []);

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

  const onTodoItemKeyDown = e => {
    if(e.keyCode === 13){
      if(!selectedTodo.value)
        return;
      setSelectedTodo({});
    }
    if(selectedTodo.value && selectedTodo.value.length >=75){
      e.preventDefault();
    }
  }

  const onTodoBlur = () => {
    setSelectedTodo({});
  }

  const onTodoItemSelect = (e, item) => {
    e.stopPropagation();
    setSelectedTodo(item);
  }

  const onTodoItemAdd = (e) => {
    e.stopPropagation();
    if(selectedTodo.id && !selectedTodo.value)
      return;
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
    // var w = 440;
    // var h = 220;
    // var left = 100;
    // var top = 100; 

    // chrome.windows.create({'url': 'popup.html', 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top, 'state':'normal'} , function(window) {
    // });

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
    chrome.alarms && chrome.alarms.getAll(function(alarms) {
      console.log(alarms);
    });
    chrome.alarms && chrome.alarms.create('alarmName', {when: Date.now() + POMODORO_TIME*1000-50});
    e.stopPropagation();
    if(pomodoroDetails && pomodoroDetails.startTime){
      setShowPomodoroInterruptModal(true);
      setSecondPomodoroDetails({startTime: Date.now(), todo: todoItem, remainingTime: POMODORO_TIME})
      return;
    }
    setCurrentPomodoroTodo(todoItem);
    startPomodoro({startTime: Date.now(), todo: todoItem, remainingTime: POMODORO_TIME});
    setPomodoroDetails({startTime: Date.now(), todo: todoItem, remainingTime: POMODORO_TIME});
  }

  const onSecondPomodoroStart = () => {
    setCurrentPomodoroTodo(secondPomodoroDetails.todo);
    startPomodoro(secondPomodoroDetails);
    setPomodoroDetails(secondPomodoroDetails);
    setShowPomodoroInterruptModal(false);
  }

  const onPomodoroEnd = (e,todoItem) => {
    setCurrentPomodoroTodo(null);
    startPomodoro({});
    setPomodoroDetails({});
    chrome.alarms && chrome.alarms.clearAll(alarm =>{
      console.log("Cleared",alarm);
    })
  }

  const onPomodoroStop = () => {
    setCurrentPomodoroTodo(null);
    startPomodoro({});
    setPomodoroDetails({});
  }

  const onOutsideClick = () => {
    setSelectedTodo({});
    removeEmptyTodos()
    
  }

  const removeEmptyTodos = () => {
    let updatedTodoList = todoList.filter(item => item.value);
    addTodoItem(updatedTodoList);
  }


  const getTodoListContent = (todoItem) => {
    return (
      <div className="todo-item-wrapper">
        { selectedTodo.id === todoItem.id ? <Input value={selectedTodo.value} onChange={e => onTodoListItemChange(e)} onKeyDown={onTodoItemKeyDown} onBlur={onTodoBlur}/> :  <div>{todoItem.value}</div> }
        <div className="todo-action-btn">
          <div className="timer-wrapper">
            {
              currentPomodoroTodo && currentPomodoroTodo.id === todoItem.id ? 
              <CountdownCircleTimer
                isPlaying={currentPomodoroTodo.id === todoItem.id}
                duration={POMODORO_TIME}
                initialRemainingTime={pomodoroDetails.remainingTime}
                size={30}
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
                onComplete={onPomodoroEnd}
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
    <div className="main-content-wrapper" onClick={onOutsideClick}>
      <div className="todo-items-list">
        <List
          split={true}
          // bordered={true}
          itemLayout="horizontal"
          dataSource={stateTodoList}
          locale={{emptyText:"No TODOs left"}}
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
      {
        pomodoroDetails.remainingTime ?
        <div className="global-pomodoro">
          <CountdownCircleTimer
            isPlaying={pomodoroDetails.remainingTime}
            duration={POMODORO_TIME}
            initialRemainingTime={pomodoroDetails.remainingTime}
            size={30}
            strokeWidth={2}
            strokeLinecap={2}
            trailColor="white"
            isLinearGradient={true}
            ariaLabel="AGil"
            colors={[
              ['#8abff9', 1]
            ]}
            onComplete={onPomodoroEnd}
          >
            {({ remainingTime }) => parseInt(remainingTime/60)}
          </CountdownCircleTimer>
          <div className="pomodoro-name">{stateTodoList[0] && stateTodoList[0].value}</div>
          <div className="pomodoro-action">
            {
              pomodoroDetails.remainingTime ?
              <FontAwesomeIcon icon={faStop} style={{color:'#427bfb'}} onClick={onPomodoroStop}/>
              : <FontAwesomeIcon icon={faPlay} style={{color:'#427bfb'}} onClick={e => onPomodoroStart(e,{})}/>
            }
          </div>
        </div> : null
      }
      <WarningModal
        show={showPomodoroInterruptModal}
        onConfirm={onSecondPomodoroStart}
        onCancel={() => setShowPomodoroInterruptModal(false)}
        title="Do you want to continue ?"
        message="Creating new pomodoro session will end the running pomodoro."
        successBtnLabel="Ok"
        cancelBtnLabel="Cancel"
      />
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
    addTodoItem,
    startPomodoro
  }
)(MainContent);