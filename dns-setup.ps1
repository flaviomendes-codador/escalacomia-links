# DNS Setup — escalacomia.com.br → GitHub Pages
# Registro.br API v2

$handle   = "FASMF3"
$password = "LkyJL#!@tCFS4rZ"
$domain   = "escalacomia.com.br"
$target   = "flaviomendes-codador.github.io"

$base = "https://api.registro.br/v2"
$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${handle}:${password}"))
$headers = @{ Authorization = "Basic $cred"; "Content-Type" = "application/json" }

Write-Host "`n[1/3] Buscando zona DNS de $domain..." -ForegroundColor Cyan

$zone = Invoke-RestMethod -Uri "$base/zones/$domain" -Headers $headers -Method Get -ErrorAction Stop
Write-Host "Zona encontrada. Registros atuais:" -ForegroundColor Green
$zone.zone | Format-List

# Registros que precisamos ter
$githubIPs = @("185.199.108.153","185.199.109.153","185.199.110.153","185.199.111.153")

$newRecords = @()

# CNAME www → GitHub Pages
$newRecords += @{ type = "CNAME"; name = "www"; value = "$target."; ttl = 3600 }

# A records para o apex (@)
foreach ($ip in $githubIPs) {
    $newRecords += @{ type = "A"; name = "@"; value = $ip; ttl = 3600 }
}

Write-Host "`n[2/3] Aplicando registros DNS..." -ForegroundColor Cyan

$body = @{ zone = $newRecords } | ConvertTo-Json -Depth 5

$result = Invoke-RestMethod -Uri "$base/zones/$domain" `
    -Headers $headers -Method Put -Body $body -ErrorAction Stop

Write-Host "DNS atualizado com sucesso!" -ForegroundColor Green
Write-Host $result | ConvertTo-Json

Write-Host "`n[3/3] URLs que vao funcionar apos propagacao (15-60 min):" -ForegroundColor Cyan
Write-Host "  -> https://www.escalacomia.com.br/links/" -ForegroundColor Yellow
Write-Host "  -> https://www.escalacomia.com.br/prompts/" -ForegroundColor Yellow
Write-Host "  -> https://escalacomia.com.br  (redireciona p/ www)" -ForegroundColor Yellow
