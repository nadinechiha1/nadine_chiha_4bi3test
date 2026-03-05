#!/usr/bin/env pwsh

# Diagnostic Script for Atelier CRUD Application
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Atelier CRUD Diagnostic Tool" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Error tracking
$diagnosticErrors = @()
$diagnosticWarnings = @()
$diagnosticSuccess = @()

# 1. Check Node.js and npm
Write-Host "1️⃣  Checking Node.js and npm..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "   ✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "   ✅ npm: $npmVersion" -ForegroundColor Green
    $diagnosticSuccess += "Node.js and npm are installed"
} catch {
    Write-Host "   ❌ Node.js or npm not found" -ForegroundColor Red
    $diagnosticErrors += "Node.js or npm is not installed"
}

# 2. Check project files
Write-Host "`n2️⃣  Checking project structure..." -ForegroundColor Yellow
$requiredFiles = @(
    "package.json",
    "angular.json",
    "src/app/app.ts",
    "src/app/models/atelier.model.ts",
    "src/app/services/atelier.service.ts",
    "src/app/components/atelier-omar-ben-jannet-add/atelier-omar-ben-jannet-add.component.ts",
    "src/app/validators/atelier.validators.ts"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
        $diagnosticSuccess += "File exists: $file"
    } else {
        Write-Host "   ❌ Missing: $file" -ForegroundColor Red
        $diagnosticErrors += "Missing file: $file"
    }
}

# 3. Check Backend
Write-Host "`n3️⃣  Checking backend..." -ForegroundColor Yellow
$backendPath = "src/app/services/node-user-mysql-main"
if (Test-Path $backendPath) {
    Write-Host "   ✅ Backend folder exists" -ForegroundColor Green
    $diagnosticSuccess += "Backend folder found"
    
    # Check if port 3000 is in use
    $port3000 = netstat -ano 2>$null | Select-String ":3000"
    if ($port3000) {
        Write-Host "   ✅ Backend is running on port 3000" -ForegroundColor Green
        $diagnosticSuccess += "Backend responding on port 3000"
    } else {
        Write-Host "   ⚠️  Backend not detected on port 3000" -ForegroundColor Yellow
        $diagnosticWarnings += "Backend not running on port 3000 - you need to start it"
    }
} else {
    Write-Host "   ❌ Backend folder not found" -ForegroundColor Red
    $diagnosticErrors += "Backend folder missing"
}

# 4. Check if ng command works
Write-Host "`n4️⃣  Checking Angular CLI..." -ForegroundColor Yellow
try {
    $ngVersion = ng version 2>&1
    if ($ngVersion -like "*Angular*") {
        Write-Host "   ✅ Angular CLI is available" -ForegroundColor Green
        $diagnosticSuccess += "Angular CLI working"
    }
} catch {
    Write-Host "   ⚠️  Angular CLI might not be globally installed" -ForegroundColor Yellow
    Write-Host "      But it can be run via: npx ng instead" -ForegroundColor Gray
}

# 5. Check Browser dev tools setup
Write-Host "`n5️⃣  Checking browser setup..." -ForegroundColor Yellow
Write-Host "   📝 Next steps:" -ForegroundColor Cyan
Write-Host "      1. Open http://localhost:4200 in your browser" -ForegroundColor Gray
Write-Host "      2. Press F12 to open Developer Tools" -ForegroundColor Gray
Write-Host "      3. Go to Console tab" -ForegroundColor Gray
Write-Host "      4. Try creating an atelier" -ForegroundColor Gray
Write-Host "      5. Check console logs for detailed error messages" -ForegroundColor Gray

# 6. Display Summary
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Diagnostic Summary" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

if ($diagnosticErrors.Count -gt 0) {
    Write-Host "`n❌ Errors Found ($($diagnosticErrors.Count)):" -ForegroundColor Red
    foreach ($error in $diagnosticErrors) {
        Write-Host "   • $error" -ForegroundColor Red
    }
}

if ($diagnosticWarnings.Count -gt 0) {
    Write-Host "`n⚠️  Warnings ($($diagnosticWarnings.Count)):" -ForegroundColor Yellow
    foreach ($warning in $diagnosticWarnings) {
        Write-Host "   • $warning" -ForegroundColor Yellow
    }
}

if ($diagnosticSuccess.Count -gt 0) {
    Write-Host "`n✅ All Checks Passed ($($diagnosticSuccess.Count)):" -ForegroundColor Green
    foreach ($success in $diagnosticSuccess) {
        Write-Host "   • $success" -ForegroundColor Green
    }
}

# Final recommendations
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Recommended Actions" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

if ($diagnosticErrors.Count -eq 0 -and $diagnosticWarnings.Count -eq 0) {
    Write-Host "`n✅ Everything looks good! Run:" -ForegroundColor Green
    Write-Host "   npm start" -ForegroundColor Cyan
    Write-Host "`nThen:" -ForegroundColor Green
    Write-Host "   1. In another terminal, cd to backend folder:" -ForegroundColor Gray
    Write-Host "      cd src/app/services/node-user-mysql-main" -ForegroundColor Gray
    Write-Host "   2. Start the backend:" -ForegroundColor Gray
    Write-Host "      npm start" -ForegroundColor Gray
} else {
    Write-Host "`n⚠️  Please fix the errors above before running the application" -ForegroundColor Yellow
}

Write-Host "`n"
Write-Host "Done!`n"
