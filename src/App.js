/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import KanbanBoard, {
  COLUMN_KEY_DONE, //'todo'
  COLUMN_KEY_ONGOING, //'ongoing'
  COLUMN_KEY_TODO, //'done'
} from './KanbanBoard';
import AdminContext from './context/AdminContext';

const DATA_STORE_KEY = 'kanban-data-store';

function App() {
  //通过useState初始化todoList数据，并设置setTodoList函数以便后续改变todoList数据
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '2022-05-22 18:15' },
    { title: '开发任务-3', status: '2022-06-22 18:15' },
    { title: '开发任务-5', status: '2022-07-22 18:15' },
    { title: '测试任务-3', status: '2022-07-23 18:15' }
  ]);
  //通过useState初始化ongoingList数据，并设置setOngoingList函数以便后续改变ongoingList数据
  const [ongoingList, setOngoingList ] = useState([
    { title: '开发任务-4', status: '2022-05-22 18:15' },
    { title: '开发任务-6', status: '2022-06-22 18:15' },
    { title: '测试任务-2', status: '2022-07-22 18:15' }
  ]);
  //通过useState初始化doneList数据，并设置setDoneList函数以便后续改变doneList数据
  const [doneList, setDoneList ] = useState([
    { title: '开发任务-2', status: '2022-06-24 18:15' },
    { title: '测试任务-1', status: '2022-07-03 18:15' }
  ]);
  //通过useState将isLoading初始值设置为true，并设置setIsLoading函数以便后续改变isLoading状态
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => { //useEffect可以执行任何带副作用操作
    //通过本地存储localStorage的getItem方法找到key为DATA_STORE_KEY的数据赋值给data
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => { //为了模拟远程服务的耗时，设置定时器
      if (data) { //如果data不为空
        const kanbanColumnData = JSON.parse(data); //通过parse方法将data转成js对象并定义为kanbanColumnData
        setTodoList(kanbanColumnData.todoList); //通过setTodoList方法更新todoList的数据
        setOngoingList(kanbanColumnData.ongoingList); //通过setOngoingList方法更新ongoingList的数据
        setDoneList(kanbanColumnData.doneList); //通过setDoneList方法更新doneList的数据
      }
      setIsLoading(false); //通过setIsLoading方法将isLoading的值设置为false
    }, 1000); //定时器时间为1秒
  },[]); //回调函数只会在第一次render()后执行

  //点击"保存所有卡片"按钮执行的事件
  const handleSaveAll = () => {
    //将{todoList,ongoingList,doneList}对象通过stringify方法转成JSON字符串并定义为data
    const data = JSON.stringify({
      todoList,
      ongoingList,
      doneList
    });
    //通过本地存储localStorage的setItem方法存储data，key为DATA_STORE_KEY
    window.localStorage.setItem(DATA_STORE_KEY, data);
  };
  
  //将列表和setXxxList函数一一对应，放在updaters对象中
  const updaters = {
    [COLUMN_KEY_TODO]: setTodoList,
    [COLUMN_KEY_ONGOING]: setOngoingList,
    [COLUMN_KEY_DONE]: setDoneList
  };

  //将目标数据项添加到目的tab栏中
  const handleAdd = (column, newCard) => { //column指哪个tab栏，newCard指新添加的卡片
    //使用setXxxList函数改变xxxList里的数据，运用扩展运算符将newCard添加到其中
    updaters[column]((currentStat) => [newCard, ...currentStat]);
  };

  //将目的数据项从源tab栏中删除
  const handleRemove = (column, cardToRemove) => { //column指哪个tab栏，cardToRemove指要删除的卡片
    //使用setXxxList函数改变xxxList里的数据
    updaters[column]((currentStat) =>
      //通过filter方法过滤出列表项的title属性不等于传进来的currentStat的title属性的数据
      currentStat.filter((item) => item.title !== cardToRemove.title)
    );
  };

  //通过useState将isAdmin的初始值设置为false，并设置setIsAdmin函数以便后续改变isAdmin的值
  const [isAdmin, setIsAdmin] = useState(false);

  //定义handleToggleAdmin函数在点击删除按钮时调用
  const handleToggleAdmin = (evt) => {
    setIsAdmin(!isAdmin); //使用setIsAdmin函数将isAdmin的值取反以得到删除的目的
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          我的看板 
          <button onClick={handleSaveAll}>保存所有卡片</button>
          <label>
            <input type="checkbox" value={isAdmin} onChange={handleToggleAdmin} />
            管理员模式
          </label>
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AdminContext.Provider value={isAdmin}>
        <KanbanBoard
          isLoading={isLoading}
          todoList={todoList}
          ongoingList={ongoingList}
          doneList={doneList}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </AdminContext.Provider>
    </div>
  );
}

export default App;
