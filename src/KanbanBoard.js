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

export const COLUMN_KEY_TODO = 'todo'; //将'todo'宏定义为COLUMN_KEY_TODO
export const COLUMN_KEY_ONGOING = 'ongoing'; //将'ongoing'宏定义为COLUMN_KEY_ONGOING
export const COLUMN_KEY_DONE = 'done'; //将'done'宏定义为COLUMN_KEY_DONE

export default function KanbanBoard({
  isLoading = true,
  todoList,
  ongoingList,
  doneList,
  onAdd,
  onRemove
}) {
  //通过useState将draggedItem数据的初始值设置为null，并设置setDraggedItem函数以便后续改变draggedItem的值
  const [draggedItem, setDraggedItem] = useState(null);
  //通过useState将dragSource数据的初始值设置为null，并设置setDragSource函数以便后续改变dragSource的值
  const [dragSource, setDragSource] = useState(null);
  //通过useState将dragTarget数据的初始值设置为null，并设置setDragTarget函数以便后续改变dragTarget的值
  const [dragTarget, setDragTarget] = useState(null);

  const handleDrop = (evt) => {
    if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
      return;
    }
    dragSource && onRemove(dragSource, draggedItem); //当dragSource不为空时，执行onRemove函数
    dragTarget && onAdd(dragTarget, draggedItem); //当dragTarget不为空时，执行onAdd函数
  };

  return (
    <main css={kanbanBoardStyles}>
      {isLoading ? (
        <KanbanColumn title="读取中..." bgColor={COLUMN_BG_COLORS.loading} />
      ) : (<>
        <KanbanColumn
          canAddNew
          bgColor={COLUMN_BG_COLORS.todo}
          title="待处理"
          setDraggedItem={setDraggedItem}
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
          onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
          onDrop={handleDrop}
          cardList={todoList}
        />
        <KanbanColumn
          bgColor={COLUMN_BG_COLORS.ongoing}
          title="进行中"
          setDraggedItem={setDraggedItem}
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
          onDrop={handleDrop}
          cardList={ongoingList}
        />
        <KanbanColumn
          bgColor={COLUMN_BG_COLORS.done}
          title="已完成"
          setDraggedItem={setDraggedItem}
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
          onDrop={handleDrop}
          onRemove={onRemove.bind(null, COLUMN_KEY_DONE)}
          cardList={doneList}
        />
      </>)}
    </main>
  );
}
