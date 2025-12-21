Write-Host "Iniciando despliegue de SGA..." -ForegroundColor Cyan

# Comprobar si git existe
if (!(Get-Command "git" -ErrorAction SilentlyContinue)) {
    Write-Error "Git no se encuentra en este terminal. Asegúrate de tener Git instalado."
    exit 1
}

# Configurar Git si es necesario
$userName = git config user.name
if (-not $userName) {
    Write-Host "Configurando user.name..." -ForegroundColor Yellow
    git config --global user.name "SGA Deployer"
}

$userEmail = git config user.email
if (-not $userEmail) {
    Write-Host "Configurando user.email..." -ForegroundColor Yellow
    git config --global user.email "deploy@sgadata.com"
}

# Añadir cambios
Write-Host "Añadiendo archivos..." -ForegroundColor Green
git add .

# Hacer commit
Write-Host "Guardando cambios (commit)..." -ForegroundColor Green
git commit -m "Auto-despliegue para socios"

# Enviar a GitHub
Write-Host "Subiendo a GitHub..." -ForegroundColor Green
git push origin main

Write-Host "---------------------------------------------------" -ForegroundColor Cyan
Write-Host "¡Proceso finalizado!" -ForegroundColor Cyan
Write-Host "Tu web estará disponible en unos minutos aquí:" -ForegroundColor Cyan
Write-Host "https://mendezarmada1.github.io/sga-data/" -ForegroundColor Yellow
Write-Host "---------------------------------------------------" -ForegroundColor Cyan
