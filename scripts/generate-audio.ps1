# ElevenLabs narration generator — DEWA WalkMe management film
# Voice: George | Model: eleven_multilingual_v2

$API_KEY  = $env:ELEVENLABS_API_KEY
if (-not $API_KEY) { throw "Set the ELEVENLABS_API_KEY environment variable before running this script." }
$VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"  # George
$OUT_DIR  = "$PSScriptRoot\..\public\audio"
$NAR_FILE = "$PSScriptRoot\..\src\narration.json"

$scenes = Get-Content $NAR_FILE -Encoding UTF8 | ConvertFrom-Json

foreach ($s in $scenes) {
  $n    = $s.scene
  $file = "$OUT_DIR\scene$n.mp3"

  Write-Host "[$n/9] $($s.id) ..."

  $body = @{
    text       = $s.text
    model_id   = "eleven_multilingual_v2"
    voice_settings = @{
      stability        = 0.45
      similarity_boost = 0.82
      style            = 0.0
      use_speaker_boost = $true
    }
  } | ConvertTo-Json -Depth 4

  $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)

  try {
    $resp = Invoke-WebRequest `
      -Uri "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID" `
      -Method POST `
      -Headers @{ "xi-api-key" = $API_KEY; "Content-Type" = "application/json" } `
      -Body $bodyBytes `
      -TimeoutSec 60

    [System.IO.File]::WriteAllBytes($file, $resp.Content)
    $kb = [math]::Round($resp.Content.Length / 1024, 1)
    Write-Host "   -> scene$n.mp3  ($kb KB)"
  } catch {
    Write-Host "   ERROR: $($_.Exception.Message)" -ForegroundColor Red
  }
}

Write-Host "`nDone. Files in: $OUT_DIR"
