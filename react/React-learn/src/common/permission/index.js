import Cookies from 'js-cookie'
import { getQueryString } from '@/common/utils'
/**
 * 检索用户是否登陆，登入了则继续，未登陆拦截跳转至登录页面
 * @param {Object} props 父级传参
 */
const checkLogined = props => {
    // if (props.location.pathname !== '/login') {
    // 检索URL是否有token，如果有的话判断Cookies里是否有，没有的话装载URL上的token到Cookies里
    checkURLHasTokenForStore(props)
    if (!Cookies.get('JSESSIONID')) {
        // 如果URL及Cookies里都没有token则跳转登录页面
        let hash = window.location.hash.includes('?')
            ? window.location.hash
                .split('?')
                .filter(x => x.includes('#'))
                .join()
            : window.location.hash
        let targetUrl = hash.replace('#', 'targetUrl')
        let href = encodeURIComponent(
            window.location.origin + window.location.pathname + targetUrl
        )
        window.location.href =
        process.env.LOGIN_HOST +
        '/oauth2.0/authorize?response_type=token&client_id=100001&redirect_uri=' +
        href
    }
    // }
    // else {
    //     if (Cookies.get('JSESSIONID')) {
    //         props.history.replace('/home')
    //     }
    // }
}

/**
 * 检索URL是否有token，如果有的话判断Cookies里是否有，没有的话装载URL上的token到Cookies里
 * @param {Object} props 父级传参
 */
const checkURLHasTokenForStore = props => {
    let _accessToken = getQueryString('access_token', props.location.search)
    if (_accessToken) {
        Cookies.set('JSESSIONID', _accessToken)
    }
}

/**
 * 权限系统
 * @param {Object} props 父级传参
 */
const permission = props => {
    // 检索用户是否登陆，登入了则继续，未登陆拦截跳转至登录页面
    checkLogined(props)
}

export default permission