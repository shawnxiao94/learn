import React from 'react';
import { Input, Button, List } from "antd";

// export default (props) => {
//   const { inputValue, list, handleChange, handleClick, handleDelete } = props
//   return (
//     <div className="App">
//        <div>
//          <input value={inputValue} onChange={handleChange}/>
//          <button onClick={handleClick}>提交</button>
//        </div>
//        <ul>
//           {
//             list.map((item, index) => {
//               return <li key={index} onClick={handleDelete.bind(null,index)}>{item}</li>
//             })
//           }
//        </ul>
//     </div>
//   )
// }

const TodoListUI = (props) =>{
  const { inputValue, list, handleChange, handleClick, handleDelete } = props
  return(
    <div className="App">
      <div>
        <Input
          value={inputValue}
          placeholder="todo info"
          onChange={handleChange}
        />
        <Button
          type="primary"
          onClick={handleClick}
        >提交</Button>
      </div>
      <List
        bordered
        dataSource={list}
        renderItem={(item, index) => (<List.Item onClick={() => {handleDelete(index)}}>{item}</List.Item>)}
      />
    </div>
  )
}

export default TodoListUI;