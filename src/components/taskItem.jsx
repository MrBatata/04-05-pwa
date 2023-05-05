import React from 'react';

const TaskItem = (props) => {

  return (
    <ul>
      {props.items.map((item, key) => <li key={key}>{item}</li>)}
    </ul>
  );
}

export default TaskItem;
