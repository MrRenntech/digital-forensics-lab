# start-backend.ps1 - starts docker-compose for the forensics stack in a new window
Set-Location -Path ""
Start-Process powershell -ArgumentList '-NoExit','-Command','cd \"' +  + '\"; Write-Host \"Starting backend (docker-compose)...\"; docker-compose -f docker-compose.forensics.yml up --build'
