# start-frontend.ps1 - runs npm install then npm run dev in a new window
Set-Location -Path ""
Start-Process powershell -ArgumentList '-NoExit','-Command','cd \"' +  + '\"; Write-Host \"Running npm install...\"; npm install; Write-Host \"Starting dev server...\"; npm run dev'
