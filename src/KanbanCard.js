/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import AdminContext from './context/AdminContext';

export const kanbanCardStyles = css`
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;

  &:hover {
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.3), inset 0 1px #fff;
  }
`;
export const kanbanCardTitleStyles = css`
  min-height: 3rem;
`;

const MINUTE = 60 * 1000; //1分钟
const HOUR = 60 * MINUTE; //1小时
const DAY = 24 * HOUR; //1天
const UPDATE_INTERVAL = MINUTE; //将MINUTE宏定义为UPDATE_INTERVAL

export default function KanbanCard({ title, status, onDragStart, onRemove }) {
  //通过useState将displayTime的初始值设置为看板里每条数据的初始时间，并设置setDisplayTime函数以便后续改变displayTime的值
  const [displayTime, setDisplayTime] = useState(status);
  
  useEffect(() => { //useEffect可以执行任何带副作用操作
    const updateDisplayTime = () => { //在函数体内定义updateDisplayTime函数
      //将现在时间和卡片创建时间的差值保存在timePassed变量中
      const timePassed = new Date() - new Date(status);
      let relativeTime = '刚刚'; //相对时间的初始值为'刚刚'
      if (MINUTE <= timePassed && timePassed < HOUR) { //卡片创建时间距离现在已经过去的时间在1分钟和1小时之间
        relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`; //将相对时间设置为xxx分钟前
      } else if (HOUR <= timePassed && timePassed < DAY) { //卡片创建时间距离现在已经过去的时间在1小时和1天之间
        relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`; //将相对时间设置为xxx小时前
      } else if (DAY <= timePassed) { //卡片创建时间距离现在已经过去的时间大于1天
        relativeTime = `${Math.ceil(timePassed / DAY)} 天前`; //将相对时间设置为xxx天前
      }
      setDisplayTime(relativeTime); //通过setDisplayTime函数将displayTime改变为相对时间的值
    };

    //通过setInterval设置定时器，每分钟一次设置到 displayTime 上，卡片随即更新
    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    updateDisplayTime(); //执行updateDisplayTime函数

    return function cleanup() { //返回值为cleanup函数
      clearInterval(intervalId); //负责在组件被卸载时清除定时器
    };
  }, [status]); //useEffect的第二个参数为依赖值数组，status发生变化时，会执行相应操作

  //在看板卡片上监听拖拽事件
  const handleDragStart = (evt) => {
    evt.dataTransfer.effectAllowed = 'move'; //设置本次拖拽中允许的效果为移动被拖拉的节点
    evt.dataTransfer.setData('text/plain', title); //设置拖拽事件所带有的数据为title
    onDragStart && onDragStart(evt); //当形参中onDragStart返回值不为空时，执行onDragStart函数
  };

  const isAdmin = useContext(AdminContext); //通过useContext使用AdminContext，用isAdmin变量接收

  return (
    //将li设置成可拖拽的，当用户开始拖动元素时执行handleDragStart函数
    <li css={kanbanCardStyles} draggable onDragStart={handleDragStart}>
      <div css={kanbanCardTitleStyles}>{title}</div>
      <div css={css`
        text-align: right;
        font-size: 0.8rem;
        color: #333;
      `} title={status}>{displayTime} {isAdmin && onRemove && (
        <button onClick={() => onRemove({title})}>X</button>
      )}</div>
      {/* 
        条件渲染删除按钮，按钮点击时调用onRemove函数 
        当前是管理员模式的时候，显示X按钮
      */}
    </li>
  );
}
