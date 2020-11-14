@echo off
rem ***********
这行算是注释，这里面一整段都可以不需要，步骤：
1、先进入目录
2、每次备份都创建一个以当天日期为名的目录
3、使用mongodb备份的命令
rem ***********

cd BackupDB

md %date:~0,4%-%date:~5,2%-%date:~8,2%

mongodump -h http://127.0.0.1:27017/ -d iTopoEarthSociety -o D:\MongoDB\BackupDB\%date:~0,4%-%date:~5,2%-%date:~8,2%