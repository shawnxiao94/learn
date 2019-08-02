/**
 * process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数。
 * argv 为package.json中scripts中执行的shell脚本命令，根据执行命令执行对应的脚本
 * update 为检测插件脚本，是否需要升级
 * see https://blog.csdn.net/DreamFJ/article/details/81635791
 */
const argv = process.argv.slice(2)[0]

switch (argv) {
    case 'start':
        require('./start')
        break
    case 'build':
        require('./build')
        break
    case 'dll':
        require('./dll')
        break
    default:
        break
}
