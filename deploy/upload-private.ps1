# HAGER INVESTMENT: run ON YOUR PC (PowerShell), from the project folder:
#   powershell -ExecutionPolicy Bypass -File deploy\upload-private.ps1
#
# Copies the private PDF documents and the Resend API key straight to the VPS over SSH.
# Nothing goes through GitHub. The key is read from .env.local and sent over the encrypted SSH
# connection's standard input. You will be asked for the VPS password (twice) unless you use an SSH key.
param(
  [string]$Server = "root@2.25.169.72",
  [string]$AppDir = "/opt/hager-investment"
)
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent

$pdfs = Get-ChildItem (Join-Path $root "private\documents") -Filter *.pdf
if ($pdfs.Count -eq 0) { throw "No PDF files found in private\documents." }

$keyLine = Get-Content (Join-Path $root ".env.local") | Where-Object { $_ -match '^RESEND_API_KEY=re_' } | Select-Object -First 1
if (-not $keyLine) { throw "RESEND_API_KEY is not set in .env.local." }
$key = $keyLine -replace '^RESEND_API_KEY=', ''

Write-Host "1/2  Uploading $($pdfs.Count) PDF document(s) to $Server ..."
scp $pdfs.FullName "${Server}:${AppDir}/private/documents/"
if ($LASTEXITCODE -ne 0) { throw "Upload failed. Is the code cloned to $AppDir on the VPS (DEPLOYMENT.md step 1)?" }

Write-Host "2/2  Saving the Resend key and securing the files on the VPS ..."
$key | ssh $Server "bash $AppDir/deploy/install-private.sh"
if ($LASTEXITCODE -ne 0) { throw "Setting up the key on the VPS failed (see the message above)." }

Write-Host ""
Write-Host "Done. Now on the VPS run:  cd $AppDir && ./deploy.sh" -ForegroundColor Green
