$css = Get-Content -Path styles.css -Raw
$js = Get-Content -Path app.js -Raw
$html = Get-Content -Path index.html -Raw

$out = $html -replace '<link rel="stylesheet" href="styles.css" />', ("<style>`n" + $css + "`n</style>")
$out = $out -replace '<script src="app.js"></script>', ("<script>`n" + $js + "`n</script>")

[System.IO.File]::WriteAllText('index_standalone.html', $out)
Write-Host "Build complete! File size:" (Get-Item index_standalone.html).Length
