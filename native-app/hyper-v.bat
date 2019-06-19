@echo off 
echo Choose: 
echo [1] Disable Hyper-V
echo [2] Enable Hyper-V
:choice 
SET /P C=[1,2]? 
for %%? in (1) do if /I "%C%"=="%%?" goto 1 
for %%? in (2) do if /I "%C%"=="%%?" goto 2 
goto choice
:1
@echo off
dism.exe /Online /Disable-Feature:Microsoft-Hyper-V
pause 
goto end
:2
@echo off
dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All
pause 
goto end
:end
