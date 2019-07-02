import styled from 'styled-components'
import logoPic from '../../statics/logo.png'

export const HeaderWrapper = styled.div`
  height:56px;
  border-bottom:1px solid #f0f0f0;
  position:relatvie;
`;
export const Logo = styled.a.attrs({
  href:'/'
})`
  height:56px;
  width:100px;
  display:block;
  position:absolute;
  left:0;
  top:0;
  background-image:url(${logoPic});
  background-size:contain;
`;
export const Nav = styled.div`
  width:960px;
  height:100%;
  padding-right:70px;
  box-sizing:border-box;
  margin:0 auto;
`
export const NavItem = styled.div`
  line-height:56px;
  padding: 0 15px;
  font-size: 17px;
  color: #333;
  &.left{
    float: left;
  }
  &.right{
    float: right;
    color: #969696;
  }
  &.active{
    color: #ea6f5a;
  }
`

export const NavSearch = styled.input.attrs({
  placeholder:'搜索'
})`
  width:160px;
  height:38px;
  border:none;
  outline:none;
  border-radius:19px;
  margin-top:9px;
  marign-left:20px;
  padding:0 20px;
  box-sizing:boreder-box;
  font-szie:14px;
  background-color:#eee;
  &::placeholder{
    color:#999;
  }
`
export const Addition = styled.div`
  position:absolute;
  right:0;
  top:0;
  height:56px;
`
export const Button = styled.div`
  float:right;
  border-radius:19px;
  line-height:38px;
  margin-top:9px;
  border:1px solid #ec6149;
  padding:0 20px;
  margin-right:20px;
  font-size:14px;
  &.reg{
    color:#ec6149;
  }
  &.writting{
    color:#fff;
    background-color:#ec6149;
  }

`