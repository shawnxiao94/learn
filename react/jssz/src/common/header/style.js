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

export const SearchWrapper = styled.div`
  float:left;
  position:relative;
  .iconfont {
    position:absolute;
    right:5px;
    bottom:5px;
    width:30px;
    height:30px;
    border-radius:15px;
    line-height:30px;
    text-align:center;
    &.focused {
      background:#777;
      color:#fff;
    }
  }
`;
export const NavSearch = styled.input.attrs({
  placeholder:'搜索'
})`
  width:160px;
  height:38px;
  margin-top:9px;
  margin-left:20px;
  outline:none;
  border-radius:19px;
  background:#eee;
  padding:0 30px 0 20px;
  color:#666;
  box-sizing:border-box;
  font-size:14px;
  border:none;
  &::placeholder{
    color:#999;
  }
  &.focused {
    width:240px;
  }
  &.slide-enter {
    transition:all .2s ease-out;
  }
  &.slide-enter-active {
    width: 240px
  }
  &.slide-exit {
    transition: all .2s ease-out;
  }
  &.slide-exit-active {
    width:160px;
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