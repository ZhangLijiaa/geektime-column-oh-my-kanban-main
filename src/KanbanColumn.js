/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import KanbanCard from './KanbanCard';
import KanbanNewCard from './KanbanNewCard';

const kanbanColumnStyles = css`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 1rem;

  & > h2 {
    margin: 0.6rem 1rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid gray;

    & > button {
      float: right;
      margin-top: 0.2rem;
      padding: 0.2rem 0.5rem;
      border: 0;
      border-radius: 1rem;
      height: 1.8rem;
      line-height: 1rem;
      font-size: 1rem;
    }
  }

  & > ul {
    flex: 1;
    flex-basis: 0;
    margin: 1rem;
    padding: 0;
    overflow: auto;
  }
`;

export default function KanbanColumn({bgColor, canAddNew = false, cardList = [], onAdd, onDrop, onRemove, setDraggedItem, setIsDragSource = () => {}, setIsDragTarget = () => {}, title}) {
  //通过useState将showAdd的初始值设置为false，并设置setShowAdd函数以便后续改变showAdd的值
  const [showAdd, setShowAdd] = useState(false);

  //点击"添加新卡片"按钮触发的点击事件
  const handleAdd = (evt) => {
    setShowAdd(true); //将showAdd的初始值设置为true
  };

  //按下"回车键"会触发的事件
  const handleSubmit = (newCard) => {
    onAdd && onAdd(newCard); //如果onAdd不为空时，执行onAdd函数
    setShowAdd(false);//将showAdd的值设置为false，添加新卡片按钮不被禁用，新卡片不显示
  };

  return (
    <section
      onDragStart={() => setIsDragSource(true)} //用户开始拖动元素时触发
      onDragOver={(evt) => { //拖动元素在目标元素上移动的时候触发
        evt.preventDefault(); //阻止元素发生默认的行为
        evt.dataTransfer.dropEffect = 'move'; //设置本次拖拽中允许的效果为移动被拖拉的节点
        setIsDragTarget(true); //通过setIsDragTarget函数将isDragTarget的值设置为true
      } }
      onDragLeave={(evt) => { //在可拖动的元素移出放置目标时执触发
        evt.preventDefault(); //阻止元素发生默认的行为
        evt.dataTransfer.dropEffect = 'none';  //设置本次拖拽中允许的效果为无法放下被拖拉的节点
        setIsDragTarget(false); //通过setIsDragTarget函数将isDragTarget的值设置为false
      } }
      onDrop={(evt) => { //可拖动元素在目标区域时触发
        evt.preventDefault(); //阻止元素发生默认的行为
        onDrop && onDrop(evt); //当可拖动元素在目标区域时，执行onDrop函数
      } }
      onDragEnd={(evt) => { //当用户完成拖动元素时触发
        evt.preventDefault(); //阻止元素发生默认的行为
        setIsDragSource(false); //通过setIsDragSource函数将isDragSource的值设置为false
        setIsDragTarget(false); //通过setIsDragTarget函数将isDragTarget的值设置为false
      } }
      css={css`
        ${kanbanColumnStyles}
        background-color: ${bgColor};
      `}
    >
      <h2>
        {title}
        {/* 如果canAddNew为true则渲染加载按钮 */}
        {canAddNew && (
          //通过showAdd变量控制此按钮是否为可点击状态，当showAdd为false时按钮可点，当showAdd为true时按钮不可点
          <button onClick={handleAdd} disabled={showAdd}>
            &#8853; 添加新卡片
          </button>
        )}
      </h2>
      <ul>
        {/* 如果canAddNew为true并且showAdd也为true时，渲染加载KanbanNewCard子组件，显示添加新卡片 */}
        {canAddNew && showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
        {/* 使用map对cardList进行遍历 */}
        {cardList.map((props) => (
          <KanbanCard
            key={props.title} //key为遍历出的每一项的标题
            //当setDraggedItem不为空时，执行setDraggedItem函数
            onDragStart={() => setDraggedItem && setDraggedItem(props)}
            onRemove={onRemove} //删除操作
            {...props} //使用扩展运算符加载所有的数据项
          />
        ))}
      </ul>
    </section>
  );
}
