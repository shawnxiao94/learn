
<script>
import {get} from './util'
import qcloud from 'wafer2-client-sdk'
import config from './config'
  export default {
    data ( ) {
      return {

      }
    },
    async created ( ) {
      // console.log('小程序启动了')
      qcloud.setLoginUrl(config.loginUrl);
      qcloud.login({
        sucess: function (userInfo) {
          console.log('登录成功', userInfo);
        },
        fail: function(err) {
          console.log('登录失败', err);
        }
      })
    }
  }
</script>

<style >

</style>