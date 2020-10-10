@echo off
title MongoDB-server
start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://127.0.0.1:27017/"
set ENV_HOME="D:\Github\three.js\iTopoStation\iTopoBackend\mongodb"
D:
color 0a
cd %ENV_HOME%
bin\mongod.exe --dbpath=data\db
cmd
