import React, { Component } from 'react';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button
} from './style';

class Header extends Component {
  render () {
    return (
      <HeaderWrapper>
        <Logo/>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载APP</NavItem>
          <NavItem className='right'>登陆</NavItem>
          <NavItem className='right'>Aa</NavItem>
          <NavSearch></NavSearch>
          <Addition>
            <Button className="reg">注册</Button>
            <Button className="writting">写文章</Button>
          </Addition>
        </Nav>
      </HeaderWrapper>
    )
  }
}

export default Header;