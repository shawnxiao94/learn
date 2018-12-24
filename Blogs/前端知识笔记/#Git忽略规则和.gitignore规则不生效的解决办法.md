## Git忽略规则和.gitignore规则不生效的解决办法

### git 配置对大小写敏感：
```
> 最近为了规范项目的目录，把项目的文件名称全都改成了小写。本地修改是没什么问题的，可提交到远程仓库后，问题就出来了：

出现了文件重复的情况，也就是远程仓库的文件并没有被修改

主要思想就是先移除版本控制，然后重新add

解决方案如下：

1.用git执行下列命令：
$ git config core.ignorecase false
解释：设置本地git环境识别大小写

我的处理办法(命令行)：


git rm -r --cached Folder1 //移除对Folder1的版本控制，不加--cached会直接把文件一起删除

git add folder1 // 添加文件

git commit -m "rename folder" //commit

git push origin master //push到远程仓库

```
### 使用Git添加Tag的方法
```
/// 查看标签
// 打印所有标签
git tag
// 打印符合检索条件的标签
git tag -l 1.*.*
// 查看对应标签状态
git checkout 1.0.0

/// 创建标签(本地)
// 创建轻量标签
git tag 1.0.0-light
// 创建带备注标签(推荐)
git tag -a 1.0.0 -m "这是备注信息"
// 针对特定commit版本SHA创建标签
git tag -a 1.0.0 0c3b62d -m "这是备注信息"

/// 删除标签(本地)
git tag -d 1.0.0

/// 将本地标签发布到远程仓库
// 发送所有
git push origin --tags
// 指定版本发送
git push origin 1.0.0

/// 删除远程仓库对应标签
// Git版本 > V1.7.0
git push origin --delete 1.0.0
// 旧版本Git
git push origin :refs/tags/1.0.0
```

### Git忽略规则：
```

在git中如果想忽略掉某个文件，
不让这个文件提交到版本库中，可以使用修改根目录中 .gitignore
文件的方法（如果没有这个文件，则需自己手工建立此文件）。
这个文件每一行保存了一个匹配的规则例如：
```

### 此为注释 – 将被 Git 忽略
```

*.sample 　　 # 忽略所有 .sample 结尾的文件
!lib.sample 　　 # 但 lib.sample 除外
/TODO 　　 # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/ 　　 # 忽略 build/ 目录下的所有文件
doc/*.txt 　　# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
```

### .gitignore规则不生效的解决办法
```

把某些目录或文件加入忽略规则，
按照上述方法定义后发现并未生效，
原因是.gitignore只能忽略那些原来没有被追踪的文件，
如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。
那么解决方法就是先把本地缓存删除（改变成未被追踪状态），然后再提交：

git rm -r --cached .

git add .

git commit -m 'update .gitignore'
```