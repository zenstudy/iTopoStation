@echo off
title MongoDB-server
set ENV_HOME="D:\Github\three.js\iTopoStation\iTopoBackend\mongodb"
D:
color 0a
cd %ENV_HOME%
bin\mongod.exe --dbpath=data\db
cmd