[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ProgressPreference = 'SilentlyContinue'
$out = "C:\Users\28945\Documents\deepseek-harness\default-workspace\kb\_org_raw.txt"
if (Test-Path $out) { Remove-Item $out }
$titles = @(
  '新联邦','先行公约','黑海岸','稷廷','隐海修会','昭明商会','琢钧堂',
  '呜呜物流','愚人剧团','翡萨烈家族','莫塔里家族','悲鸣会','悲鸣','鸣式',
  '罗伊族','隧者','虚质磁暴','秘日','换日庆典','残象','黑潮'
)
$api = "https://wuwa.huijiwiki.com/api.php?action=query&format=json&prop=extracts&explaintext=1&redirects=1&titles="
$all = ""
foreach ($t in $titles) {
  $enc = [System.Uri]::EscapeDataString($t)
  $url = $api + $enc
  try {
    $r = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 40
    $txt = [System.Text.Encoding]::UTF8.GetString($r.RawContentStream.ToArray())
    $all += "`n`n===== $t =====`n" + $txt
  } catch {
    $all += "`n`n===== $t =====`nFETCH_FAIL: $($_.Exception.Message)"
  }
}
Add-Content -Path $out -Value $all -Encoding UTF8
Write-Output "LEN=$($all.Length)"
