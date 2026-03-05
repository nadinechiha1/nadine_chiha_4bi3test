#!/usr/bin/env pwsh

Write-Host "`n🚀 Starting Atelier Backend Server...`n" -ForegroundColor Cyan

$backendPath = "c:\Users\SBS\Desktop\Test_Angular\Omar_Ben_Jannet\src\app\services\node-user-mysql-main"

Write-Host "📁 Backend Path: $backendPath`n" -ForegroundColor Yellow

if (!(Test-Path $backendPath)) {
    Write-Host "❌ ERREUR: Le dossier backend n'existe pas!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dossier trouvé`n" -ForegroundColor Green

# Vérifier les dépendances
Write-Host "📦 Vérification des dépendances..." -ForegroundColor Yellow

if (!(Test-Path "$backendPath\node_modules")) {
    Write-Host "⚠️  node_modules manquants. Installation en cours..." -ForegroundColor Yellow
    Push-Location $backendPath
    npm install
    Pop-Location
}

Write-Host "📋 Vérification du fichier .env..." -ForegroundColor Yellow

if (!(Test-Path "$backendPath\.env")) {
    Write-Host "❌ ERREUR: Le fichier .env n'existe pas!" -ForegroundColor Red
    Write-Host "📝 Création du fichier .env..." -ForegroundColor Yellow
    
    $envContent = @"
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=suggestions_db
DB_PORT=3306
"@
    
    Set-Content -Path "$backendPath\.env" -Value $envContent
    Write-Host "✅ Fichier .env créé`n" -ForegroundColor Green
} else {
    Write-Host "✅ Fichier .env trouvé`n" -ForegroundColor Green
}

Write-Host "═════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🔥 Démarrage du serveur backend..." -ForegroundColor Cyan
Write-Host "📍 Port: 3000" -ForegroundColor Yellow
Write-Host "📍 URL: http://localhost:3000" -ForegroundColor Yellow
Write-Host "═════════════════════════════════════════════`n" -ForegroundColor Cyan

# Démarrer le serveur
Push-Location $backendPath
npm start
Pop-Location
