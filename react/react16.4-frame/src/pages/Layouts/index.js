import React from 'react';
import {
  withRouter
} from 'react-router-dom';
import { 
  LayoutWrapper,
  LeftWrapper,
  MainWrapper
} from './style'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Foot from './components/Foot'

const Layout = () => {
  return (
    <LayoutWrapper> 
      <LeftWrapper>
        <Sidebar/>
      </LeftWrapper>
      <MainWrapper>
        <Header/>
        <Main/>
        <Foot/>
      </MainWrapper>  
    </LayoutWrapper>
  )
}

export default withRouter(Layout);