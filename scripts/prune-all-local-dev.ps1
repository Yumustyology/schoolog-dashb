<#
prune-all-local-dev.ps1

Safe PowerShell helper to remove local dev modifications made by the schoolog helper scripts.
Usage (elevated PowerShell):
  # Dry run (default) - prints what it would remove
  .\prune-all-local-dev.ps1

  # Execute removals (hosts edits + certs)
  .\prune-all-local-dev.ps1 -Execute

  # Execute and also uninstall mkcert CA (requires mkcert on PATH)
  .\prune-all-local-dev.ps1 -Execute -UninstallMkcert

Notes:
- This script is conservative: it backs up the live hosts file first.
- It only removes blocks marked with the marker lines:
    # -- multi-tenant local dev entries (start)
    # -- multi-tenant local dev entries (end)
  and removes stray lines that match PowerShell-array helpers added by older helper scripts.
- Cert files under the project path './scripts/.certs' are deleted only with -Execute and -RemoveCerts.
#>
[CmdletBinding()]
param(
  [switch]$Execute,
  [switch]$RemoveCerts,
  [switch]$UninstallMkcert
)

$ErrorActionPreference = 'Stop'
$hostsPath = 'C:\Windows\System32\drivers\etc\hosts'
$projectCertDir = Join-Path -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition) -ChildPath '.certs'

function Backup-Hosts {
  $now = Get-Date -Format yyyyMMddHHmmss
  $dest = "$hostsPath.prune-backup.$now"
  Copy-Item -Path $hostsPath -Destination $dest -Force
  return $dest
}

Write-Output "Running prune-all-local-dev.ps1 (Execute=$Execute, RemoveCerts=$RemoveCerts, UninstallMkcert=$UninstallMkcert)"

if (-not (Test-Path $hostsPath)) {
  Write-Warning "Hosts file not found at $hostsPath"
  exit 1
}

$backup = Backup-Hosts
Write-Output "Created hosts backup: $backup"

$hosts = Get-Content -Path $hostsPath -Encoding ASCII
$originalCount = $hosts.Length

# Remove PowerShell-array malformed line(s) and preceding "# added by schoolog helper" comment
$cleaned = @()
for ($i=0; $i -lt $hosts.Length; $i++) {
  $line = $hosts[$i]
  if ($line -match "@\('\s*" ) {
    Write-Output "Would remove malformed PowerShell-style line: $line"
    if ($i -gt 0 -and $hosts[$i-1] -match '^\s*#\s*added by schoolog helper') {
      Write-Output "Would also remove previous helper comment: $($hosts[$i-1])"
      # drop last pushed line from cleaned (the comment) if present
      if ($cleaned.Count -gt 0) { $null = $cleaned.RemoveAt($cleaned.Count - 1) }
    }
    continue
  }
  $cleaned += $line
}

# Remove block between markers
$startMarker = '# -- multi-tenant local dev entries (start)'
$endMarker = '# -- multi-tenant local dev entries (end)'
$inBlock = $false
$final = @()
for ($i=0; $i -lt $cleaned.Length; $i++) {
  $l = $cleaned[$i]
  if ($l -eq $startMarker) { $inBlock = $true; Write-Output "Would remove multi-tenant block starting at line $i"; continue }
  if ($l -eq $endMarker) { $inBlock = $false; continue }
  if (-not $inBlock) { $final += $l }
}

# Summary of changes
$removed = $originalCount - $final.Length
Write-Output "Summary: original lines=$originalCount, final lines=$($final.Length), lines removed=$removed"

if ($Execute) {
  Write-Output "Writing cleaned hosts file back to $hostsPath"
  $final | Set-Content -Path $hostsPath -Encoding ASCII -Force
  Write-Output "Hosts updated. (Backup: $backup)"

  if ($RemoveCerts -and (Test-Path $projectCertDir)) {
    Write-Output "Removing project certs directory: $projectCertDir"
    Remove-Item -LiteralPath $projectCertDir -Recurse -Force
    Write-Output "Project certs removed."
  }

  if ($UninstallMkcert) {
    if (Get-Command mkcert -ErrorAction SilentlyContinue) {
      Write-Output "Running 'mkcert -uninstall'"
      & mkcert -uninstall
      Write-Output "mkcert CA uninstalled."
    } else {
      Write-Warning "mkcert not found on PATH; cannot run mkcert -uninstall"
    }
  }
} else {
  Write-Output "Dry-run only. To apply changes run with -Execute. To also delete certs use -RemoveCerts."
}

Write-Output "Done."
