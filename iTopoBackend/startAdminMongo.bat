@echo off
title adminMongo
start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://127.0.0.1:1234/"
set ENV_HOME="D:\Github\iTopoStation\adminMongo"
D:
color 0a
cd %ENV_HOME%
npm start

cmd

