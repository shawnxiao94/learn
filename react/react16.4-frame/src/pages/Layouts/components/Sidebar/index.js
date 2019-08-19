import React from 'react';
// import { connect } from 'react-redux';
import { SidebarWrapper } from './style'
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

const { SubMenu } = Menu;

const getMenuItems = (menuTree) => {
  return menuTree.map(item => {
    if(item.get('children')) {
      return (
        <SubMenu
          key={`sub_${item.get('index')}`}>
          getMenuItems(item.get('children'))
        </SubMenu>
      )
    }
    return (
      <Menu.Item key={item.get('path')}>
        <Link key={`${item.get('path')}_${item.get('index')}`} to={item.get('path')} style={{display:"block",margin:"10px"}}>
          {item.get('title')}
        </Link>         
      </Menu.Item>
    )
  })
}

const Sidebar = (props) => {
  const { menuList } = props
  return (
    <SidebarWrapper>
      <Menu>
        {getMenuItems(menuList)}
      </Menu>
    </SidebarWrapper>
  )
}

export default Sidebar;
