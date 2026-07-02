# Spotify WaveMood Local Automation Script
# Run this script with PowerShell to spin up backend, frontend, and stable connection options.

Clear-Host
Write-Host "=============================================" -ForegroundColor Green
Write-Host "       SPOTIFY WAVEMOOD DEV & LAUNCHER       " -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""

# Get Laptop Local IP Address
$localIp = (Get-NetIPAddress | Where-Object { $_.AddressFamily -eq 'IPv4' -and $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } | Select-Object -First 1).IPAddress
if (-not $localIp) {
    $localIp = "127.0.0.1"
}

# 1. Ask User for Connection Mode
Write-Host "Select Connection Mode:" -ForegroundColor Cyan
Write-Host "  [1] High-Stability Local Wi-Fi (No Tunnels, 100% stable at home)"
Write-Host "  [2] Persistent Serveo Tunnel (Custom Subdomain)"
Write-Host "  [3] Cloudflare Quick Tunnel (No Subdomain, no limits, no landing page)"
Write-Host ""
$choice = Read-Host "Enter option [1-3] (Default: 1)"

if ($choice -ne "2" -and $choice -ne "3") {
    $choice = "1"
}

# 2. Build Frontend Production Bundle
Write-Host ""
Write-Host ">>> Step 1: Building Frontend Production Bundle..." -ForegroundColor Cyan
cd "$PSScriptRoot\phase-7"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Frontend build failed. Please fix errors before starting." -ForegroundColor Red
    Exit
}

# 3. Start Backend server
Write-Host ""
Write-Host ">>> Step 2: Starting Backend Server on port 3001..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\spotify-mood-app\backend'; npm run dev"

# 4. Start Frontend production preview
Write-Host ""
Write-Host ">>> Step 3: Starting Frontend Preview on port 5173..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\phase-7'; npm run preview -- --host 0.0.0.0 --port 5173"

# 5. Handle Network Mode
Write-Host ""
Write-Host ">>> Step 4: Connecting app to the network..." -ForegroundColor Cyan

if ($choice -eq "1") {
    Write-Host "=== LOCAL WI-FI MODE ACTIVE ===" -ForegroundColor Green
    Write-Host "Access the website from any device on your Wi-Fi network using:" -ForegroundColor Yellow
    Write-Host "👉 http://$localIp:5173/" -ForegroundColor Green
    Write-Host ""
    Write-Host "Spotify Developer Dashboard Setup:" -ForegroundColor Cyan
    Write-Host "1. Go to Spotify Developer Dashboard -> WaveMood App -> Edit Settings."
    Write-Host "2. Add the following Redirect URI:"
    Write-Host "   http://$localIp:3001/api/auth/callback" -ForegroundColor Green
    Write-Host "3. Update your backend .env file (spotify-mood-app/backend/.env) to:"
    Write-Host "   SPOTIFY_REDIRECT_URI=http://$localIp:3001/api/auth/callback" -ForegroundColor Green
    Write-Host "4. Save settings and reload the app."
    Write-Host ""
    Write-Host "Press Ctrl+C to close this window."
    # Keep script open
    while ($true) { Start-Sleep 10 }
}
elseif ($choice -eq "2") {
    Write-Host "=== PERSISTENT SERVEO TUNNEL ACTIVE ===" -ForegroundColor Green
    $subdomain = Read-Host "Enter custom subdomain name (e.g. wavemood-kaveer)"
    if (-not $subdomain) {
        $subdomain = "wavemood-kaveer"
    }

    Write-Host ""
    Write-Host "Spotify Developer Dashboard Setup:" -ForegroundColor Cyan
    Write-Host "1. Go to Spotify Developer Dashboard -> WaveMood App -> Edit Settings."
    Write-Host "2. Add the following Redirect URI:"
    Write-Host "   https://$subdomain.serveo.net/api/auth/callback" -ForegroundColor Green
    Write-Host "3. Update your backend .env file (spotify-mood-app/backend/.env) to:"
    Write-Host "   SPOTIFY_REDIRECT_URI=https://$subdomain.serveo.net/api/auth/callback" -ForegroundColor Green
    Write-Host "4. Save settings and load: https://$subdomain.serveo.net/" -ForegroundColor Green
    Write-Host ""

    # Start Serveo Tunnel in auto-reconnecting loop
    while ($true) {
        Write-Host "Connecting tunnel..." -ForegroundColor Yellow
        ssh -o ServerAliveInterval=30 -o ServerAliveCountMax=3 -R "$($subdomain):80:127.0.0.1:5173" serveo.net
        Write-Host "Tunnel disconnected. Reconnecting in 3 seconds..." -ForegroundColor Red
        Start-Sleep -Seconds 3
    }
}
elseif ($choice -eq "3") {
    Write-Host "=== CLOUDFLARE QUICK TUNNEL ACTIVE ===" -ForegroundColor Green
    
    # Check and download cloudflared
    $binDir = "$PSScriptRoot\scripts\bin"
    if (-not (Test-Path $binDir)) {
        New-Item -ItemType Directory -Path $binDir | Out-Null
    }
    $cloudflaredPath = "$binDir\cloudflared.exe"
    if (-not (Test-Path $cloudflaredPath)) {
        Write-Host "cloudflared.exe not found. Downloading latest version from GitHub..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe" -OutFile $cloudflaredPath
    }

    Write-Host "Starting Cloudflare Quick Tunnel..." -ForegroundColor Yellow
    Write-Host "Please look for the 'https://*.trycloudflare.com' link in the output below!" -ForegroundColor Yellow
    Write-Host "Make sure to copy that URL, update your .env (SPOTIFY_REDIRECT_URI) and Spotify dashboard settings, then run the login!" -ForegroundColor Cyan
    Write-Host ""
    
    & $cloudflaredPath tunnel --url http://localhost:5173
}
