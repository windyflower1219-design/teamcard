@echo off
cd /d "%~dp0"
echo Team Card Manager 서버와 클라이언트를 시작합니다...
echo.

:: Start Backend in background
start /b cmd /c "node server.js"

echo 로그인이 가능하도록 Network 주소가 설정되었습니다.
echo 휴대폰에서 접속하려면 아래 Network 주소를 휴대폰 브라우저에 입력하세요.
echo.
echo 잠시 후 브라우저가 자동으로 열립니다...
timeout /t 5 >nul
start http://localhost:5173
cmd /c npm run dev
pause
