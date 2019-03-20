import React from 'react';

export default (props) => {
  const { inputValue, list, handleChange, handleClick, handleDelete } = props
  return (
    <div className="App">
       <div>
         <input value={inputValue} onChange={handleChange}/>
         <button onClick={handleClick}>提交</button>

       </div>
       <ul>
          {
            list.map((item, index) => {
              return <li key={index} onClick={handleDelete.bind(null,index)}>{item}</li>
            })
          }
       </ul>
    </div>
  )
}