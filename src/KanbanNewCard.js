/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { kanbanCardStyles, kanbanCardTitleStyles } from './KanbanCard';

export default function KanbanNewCard({ onSubmit, setShowAdd }) {
  //通过useState设置title的初始值为空数据，并设置setTitle函数以便后续改变title数据
  const [title, setTitle] = useState('');

  //监听input输入框
  const handleChange = (evt) => {
    setTitle(evt.target.value); //将input的输入值更新到title中
  };

  //监听回车键
  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {//用户在文本框中敲回车时
      //把新添加的卡片对象（title，status）赋值给newCard变量
      const newCard = { title, status: new Date().toString() };
      onSubmit(newCard); //newCard作为实参传给onSubmit函数
    }
  };

  //定义可变ref对象为inputIElem并将它的current属性的初始值设置为null
  const inputElem = useRef(null);
  useEffect(() => { //useEffect可以执行任何带副作用操作
    inputElem.current.focus(); //将文本输入框设置为页面焦点
  }, []); //回调函数只会在第一次render()后执行

  const handleBlur = ()=> {
    setShowAdd(false)
  }

  return (
    <li css={kanbanCardStyles}> 
      <h3>添加新卡片</h3>
      <div css={css`
        ${kanbanCardTitleStyles}
        & > input[type="text"] {
          width: 80%;
        }
      `}>
        {/* 
          将input框的ref绑定为inputElem
          失去焦点时，输入内容改变，触发onChange事件，执行handleChange函数
          键盘按下触发onKeyDown事件，执行handleKeyDown函数 
        */}
        <input type="text" value={title} ref={inputElem}
          onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur}/>
        {/* <button style={{marginLeft:10}}>取消</button> */}
      </div>
    </li>
  );
}
