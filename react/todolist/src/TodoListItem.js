import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'

class TodoListItem extends Component {
// 子组件要和父组件通信，
// 子向父传：需要调用父组件传来的方法进行传值
// 父向子传：直接组件赋值子组件通过props接收传值
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    const { handleDelete, index } = this.props
    handleDelete(index)
  }

  // 性能优化
  shouldComponentUpdate (nextProps, nextState) {
    if(nextProps.content !== this.props.content) {
      return true;
    } else {
      return false;
    }
  }

  render(){
    let { content } = this.props
    return (
      <Fragment>
        {/* 要这样写注释 
          通过dangerouslySetInnerHTML不使HTML内容转义
        */}
        {
          <li
           onClick={this.handleDelete}
           dangerouslySetInnerHTML={{__html: content}}>
          </li>
        }
      </Fragment>
    )
  }
}

TodoListItem.propTypes = {
  content: PropTypes.string,
  handleDelete: PropTypes.func,
  index: PropTypes.number,
  test: PropTypes.string.isRequired
}

TodoListItem.defaultProps = {
  test: 'hello world'
}

export default TodoListItem