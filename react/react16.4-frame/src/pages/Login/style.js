import styled from 'styled-components';

export const LoginWrapper = styled.div`
	width:100%;
  height:100vh;
  background-color:#eee;
  position:relative;
`;

export const LoginBox = styled.div`
	width: 400px;
	height: 180px;
	background: #fff;
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
	box-shadow: 0 0 8px rgba(0,0,0,.1);
`;

export const Input = styled.input`
	display: block;
	width: 200px;
	height: 30px;
	line-height: 30px;
	padding: 0 10px;
	margin: 10px auto;
	color: #777;
`;

export const Button = styled.div`
	width: 220px;
	height: 30px;
	line-height: 30px;
	color: #fff;
	background: #3194d0;
	border-radius: 15px;
	margin: 30px auto 10px auto;
	text-align: center;
`;