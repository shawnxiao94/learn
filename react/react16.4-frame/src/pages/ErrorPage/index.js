    
/**
 * Created by shawn on 2019/08/07.
 */
import React from 'react';
import img from '@assets/images/404.png';
import { ErrorWrapper } from './style'

const ErrorPage = () => (
    <ErrorWrapper>
      <img src={img} alt="404"/>
    </ErrorWrapper>
)

export default ErrorPage;