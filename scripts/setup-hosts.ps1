If (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)) {
  Write-Error "Please run this script as Administrator"
  Exit 1
}

$hostsPath = "$env:SystemRoot\System32\drivers\etc\hosts"
$backup = "$hostsPath.bak.$((Get-Date).ToString('yyyyMMddHHmmss'))"
Copy-Item -Path $hostsPath -Destination $backup -Force

$entries = @"
# -- multi-tenant local dev entries (added by setup-hosts.ps1)
127.0.0.1   school1.localhost
127.0.0.1   school2.localhost
127.0.0.1   app.localhost
# -- end
"@
Add-Content -Path $hostsPath -Value $entries
ipconfig /flushdns
Write-Host "Hosts updated. Backup saved to $backup"
