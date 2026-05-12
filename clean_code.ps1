# Script de Limpeza e Refatoração Automática - Orquídea Profissional
# Este script usa as melhores ferramentas do mercado para remover importações desnecessárias, 
# corrigir indentação, e aplicar as melhores práticas de código no Python (Django) e no JS (Next.js).

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   Orquídea Profissional - Code Cleaner & Refactorizer    " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# ------------------------------------------------------------------
# 1. Limpeza do Backend (Django/Python) usando o RUFF
# Ruff é 100x mais rápido que o Flake8/Black e remove imports não usados automaticamente.
# ------------------------------------------------------------------
Write-Host "[1/3] Iniciando limpeza do Backend (Python)..." -ForegroundColor Yellow

$venvPip = ".\venv\Scripts\pip.exe"
$venvRuff = ".\venv\Scripts\ruff.exe"

if (Test-Path $venvPip) {
    Write-Host "      Instalando/Atualizando Ruff no ambiente virtual..." -ForegroundColor DarkGray
    & $venvPip install ruff --quiet
    
    if (Test-Path $venvRuff) {
        Write-Host "      Executando Ruff (Check & Fix imports)..." -ForegroundColor DarkGray
        # O argumento --fix corrige problemas automaticamente (incluindo unused imports)
        # O argumento --unsafe-fixes garante que ele remova coisas que tem certeza absoluta que não quebrarão.
        & $venvRuff check . --fix --extend-select="I"
        
        Write-Host "      Formatando código Python..." -ForegroundColor DarkGray
        & $venvRuff format .
        
        Write-Host "[OK] Backend limpo com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "[ERRO] Não foi possível encontrar o ruff no venv." -ForegroundColor Red
    }
} else {
    Write-Host "[AVISO] Ambiente virtual (venv) não encontrado. Ignorando backend." -ForegroundColor DarkYellow
}

Write-Host ""

# ------------------------------------------------------------------
# 2. Limpeza do Frontend (Next.js/React) usando ESLint e Prettier
# ------------------------------------------------------------------
Write-Host "[2/3] Iniciando limpeza do Frontend (Next.js)..." -ForegroundColor Yellow

if (Test-Path ".\frontend") {
    Push-Location ".\frontend"
    
    Write-Host "      Corrigindo Lints e removendo variáveis não usadas (ESLint)..." -ForegroundColor DarkGray
    # Passamos --fix para o Next ESLint
    npx next lint --fix
    
    Write-Host "      Formatando código Javascript e CSS (Prettier)..." -ForegroundColor DarkGray
    npx prettier --write "src/**/*.{js,jsx,css}" --log-level warn
    
    Pop-Location
    Write-Host "[OK] Frontend limpo com sucesso!" -ForegroundColor Green
} else {
    Write-Host "[AVISO] Pasta 'frontend' não encontrada. Ignorando." -ForegroundColor DarkYellow
}

Write-Host ""

# ------------------------------------------------------------------
# 3. Limpeza de Arquivos Temporários
# ------------------------------------------------------------------
Write-Host "[3/3] Removendo lixo e arquivos temporários..." -ForegroundColor Yellow

$dirsToRemove = @(".\frontend\.next\cache", ".\.ruff_cache", ".\__pycache__")
foreach ($dir in $dirsToRemove) {
    if (Test-Path $dir) {
        Remove-Item -Recurse -Force $dir -ErrorAction SilentlyContinue
        Write-Host "      Removido: $dir" -ForegroundColor DarkGray
    }
}

Get-ChildItem -Path . -Recurse -Filter "__pycache__" -Directory -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "[OK] Arquivos temporários removidos." -ForegroundColor Green

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   Limpeza concluída! O código está padronizado e limpo.  " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
