import React from 'react'
import LayoutsCommon from '@/modules/common/pages/Layouts'
import routerConfig from '../../router/config'
import Router from '../../router'
const Layouts = () => {
  return (
    <LayoutsCommon routerConfig={routerConfig} Router={Router} />
  )
}
export default Layouts