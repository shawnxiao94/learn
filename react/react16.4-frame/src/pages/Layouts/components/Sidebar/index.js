import React from 'react';
// import { connect } from 'react-redux';
import { SidebarWrapper } from './style'
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  const { menuList } = props
  return (
    <SidebarWrapper>
      {
        menuList.map((item, index) => (        
          <Link key={index} to={item.get('path')} style={{display:"block",margin:"10px"}}>
            {item.get('title')}
          </Link>          
        ))          
      }
    </SidebarWrapper>
  )
}

export default Sidebar;
