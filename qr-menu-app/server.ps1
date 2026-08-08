$port = 3000
$listener = New-Object System.Net.HttpListener
try {
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
} catch {
    $port = 3001
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

Write-Host "🚀 Server running at http://localhost:$port/"
Start-Process "http://localhost:$port/"

$baseDir = Get-Location

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response

        $urlPath = $req.Url.LocalPath
        if ($urlPath -eq '/') { $urlPath = '/index.html' }
        
        $filePath = Join-Path $baseDir $urlPath.Replace('/', '\')

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $res.ContentLength64 = $bytes.Length
            
            if ($filePath.EndsWith('.html')) { $res.ContentType = 'text/html; charset=utf-8' }
            elseif ($filePath.EndsWith('.css')) { $res.ContentType = 'text/css' }
            elseif ($filePath.EndsWith('.js')) { $res.ContentType = 'application/javascript' }
            
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
        }
        $res.Close()
    } catch {
        # continue loop on connection abort
    }
}
