// UI组件 =》 无业务逻辑只负责UI渲染  
// 当一个组件里只有render函数的时候叫做无状态组件 
import React from 'react';
import { Input, Button, List } from 'antd';

// 无状态组件  性能更优
const TodoListUI = (props) => {
  const { inputValue, handleInputChange, handleClick, list, handleItemDlete } = props
  return (
    <div style={{ marginTop: '10px', marginLeft: '10px' }}>
      <div>
        <Input
          style={{ width: '300px', marginRight: '10px' }}
          placeholder="todo info"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleClick} type="primary">提交</Button>
      </div>
      <List
        size="small"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={list}
        // 父组件传递过来的index,可以通过外层绑定方法再传参给接受的方法
        renderItem={(item, index) => (<List.Item onClick={() => {handleItemDlete(index)}}>{item}</List.Item>)}
      />
    </div>      
  )
}

export default TodoListUI;

// 普通UI组件
// class TodoListUI extends Component {
//   render () {
//     return (
//       <div style={{ marginTop: '10px', marginLeft: '10px' }}>
//         <div>
//           <Input
//             style={{ width: '300px', marginRight: '10px' }}
//             placeholder="todo info"
//             value={this.props.inputValue}
//             onChange={this.props.handleInputChange}
//           />
//           <Button onClick={this.props.handleClick} type="primary">提交</Button>
//         </div>
//         <List
//           size="small"
//           header={<div>Header</div>}
//           footer={<div>Footer</div>}
//           bordered
//           dataSource={this.props.list}
//           renderItem={(item, index) =>
//            (<List.Item onClick={(index) => {this.props.handleItemDlete(index)}}>{item}</List.Item>)}
//         />
//       </div>      
//     )
//   }
// }

// export default TodoListUI