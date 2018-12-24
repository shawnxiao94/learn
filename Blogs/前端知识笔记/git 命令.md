# git命令
---
>- 删除远程分支: 
>  1. git push origin --delete <branchName  2. git branch -dr [remote/branch]
>- 删除本地分支: git branch -d <branchName>
>- 在当前目录新建一个Git代码库:  git init
>- 删除工作区文件，并且将这次删除放入暂存区: git rm [file1] [file2] ...
>- 改名文件，并且将这个改名放入暂存区: git mv [file-original] [file-renamed]
>- 建立追踪关系，在现有分支与指定的远程分支之间: git branch --set-upstream [branch] [remote-branch]
>- 合并指定分支到当前分支  git merge [branch]
>- 显示当前分支的版本历史: git log
>- 显示所有提交过的用户，按提交次数排序: git shortlog -sn
>- 显示指定文件是什么人在什么时间修改过: git blame [file]
>- 搜索提交历史，根据关键词: git log -S [keyword]
>- 显示今天你写了多少行代码: git diff --shortstat "@{0 day ago}"
>- 下载远程仓库的所有变动: git fetch [remote]
>- 显示所有远程仓库: git remote -v
>- 增加一个新的远程仓库，并命名:  git remote add [shortname] [url]
>- 取回远程仓库的变化，并与本地分支合并: git pull [remote] [branch]
>- 上传本地指定分支到远程仓库:  git push [remote] [branch]
>- 强行推送当前分支到远程仓库，即使有冲突:  git push [remote] --force
>- 推送所有分支到远程仓库: git push [remote] --all
>- 暂时将未提交的变化移除，稍后再移入:  git stash  git stash pop
>- 显示某次提交的元数据和内容变化:  git show [commit]
>- 从本地master拉取代码更新当前分支：branch 一般为master:  git rebase [branch]
>- 显示暂存区和工作区的代码差异:  git diff
>- 显示有变更的文件:  git 
>- 显示当前分支的版本历史:  git log
>- 新建一个分支，并切换到该分支:  git checkout -b [branch]