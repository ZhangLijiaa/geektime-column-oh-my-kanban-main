/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import KanbanColumn from './KanbanColumn';

const kanbanBoardStyles = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`;

const COLUMN_BG_COLORS = {
  loading: '#E3E3E3',
  todo: '#C9AF97',
  ongoing: '#FFE799',
  done: '#C0E8BA'
};

export const COLUMN_KEY_TODO = 'todo'; //将'todo'赋值给COLUMN_KEY_TODO
export const COLUMN_KEY_ONGOING = 'ongoing'; //将'ongoing'赋值给COLUMN_KEY_ONGOING
export const COLUMN_KEY_DONE = 'done'; //将'done'赋值给COLUMN_KEY_DONE

export default function KanbanBoard({isLoading = true, todoList, ongoingList, doneList, onAdd, onRemove}) {
  //通过useState将draggedItem数据的初始值设置为null，并设置setDraggedItem函数以便后续改变draggedItem的值
  const [draggedItem, setDraggedItem] = useState(null);
  //通过useState将dragSource数据的初始值设置为null，并设置setDragSource函数以便后续改变dragSource的值
  const [dragSource, setDragSource] = useState(null);
  //通过useState将dragTarget数据的初始值设置为null，并设置setDragTarget函数以便后续改变dragTarget的值
  const [dragTarget, setDragTarget] = useState(null);

  //当可拖动元素在目标区域时，要执行的函数
  const handleDrop = (evt) => {
    //如果没有可拖拽项或者没有拖拽的源头或者没有拖拽的目的地或者拖拽的源头和拖拽的目的地是同一个
    if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
      //不继续向下执行函数
      return;
    }
    dragSource && onRemove(dragSource, draggedItem); //当拖拽的源头dragSource不为空时，执行删除操作onRemove函数
    dragTarget && onAdd(dragTarget, draggedItem); //当拖拽的目的地dragTarget不为空时，执行添加操作onAdd函数
  };

  return (
    <main css={kanbanBoardStyles}>
      {/* 如果isLoading为ture时，显示"读取中..."*/}
      {isLoading ? (
        <KanbanColumn title="读取中..." bgColor={COLUMN_BG_COLORS.loading} />
      ) : (<>
        <KanbanColumn
          canAddNew //控制是否可以添加新卡片
          bgColor={COLUMN_BG_COLORS.todo} //背景颜色
          title="待处理" //标题为"待处理"
          setDraggedItem={setDraggedItem} //改变draggedItem的值的函数
          //如果isSrc为true，设置拖拽源为"todo"，否则设置为null
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
          //如果isTgt为true，设置拖拽目的地为"todo"，否则设置为null
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
          onAdd={onAdd.bind(null, COLUMN_KEY_TODO)} //???添加操作null.onAdd(COLUMN_KEY_TODO)
          onDrop={handleDrop} //拖拽操作
          cardList={todoList} //当前卡片为todoList
        />
        <KanbanColumn
          bgColor={COLUMN_BG_COLORS.ongoing} //背景颜色
          title="进行中" //标题为"进行中"
          setDraggedItem={setDraggedItem} //改变draggedItem的值的函数
          //如果isSrc为true，设置拖拽源为"ongoing"，否则设置为null
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
          //如果isTgt为true，设置拖拽目的地为"ongoing"，否则设置为null
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
          onDrop={handleDrop} //拖拽操作
          cardList={ongoingList} //当前卡片为goingList
        />
        <KanbanColumn
          bgColor={COLUMN_BG_COLORS.done} //背景颜色
          title="已完成" //标题为"已完成"
          setDraggedItem={setDraggedItem} //改变draggedItem的值的函数
          //如果isSrc为true，设置拖拽源为"done"，否则设置为null
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
          //如果isTgt为true，设置拖拽目的地为"done"，否则设置为null
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
          onDrop={handleDrop} //拖拽操作
          onRemove={onRemove.bind(null, COLUMN_KEY_DONE)} //???删除操作null.onRemove(COLUMN_KEY_DONE)
          cardList={doneList} //当前卡片为doneList
        />
      </>)}
    </main>
  );
}
