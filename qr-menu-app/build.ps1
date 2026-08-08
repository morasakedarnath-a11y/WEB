$css = Get-Content -Path styles.css -Raw -Encoding utf8
$js = Get-Content -Path app.js -Raw -Encoding utf8
$html = Get-Content -Path index.html -Raw -Encoding utf8

$out = $html -replace '<link rel="stylesheet" href="styles.css" />', ("<style>`n" + $css + "`n</style>")
$out = $out -replace '<script src="app.js"></script>', ("<script>`n" + $js + "`n</script>")

[System.IO.File]::WriteAllText('index_standalone.html', $out, [System.Text.Encoding]::UTF8)
Write-Host "Build complete with UTF-8 encoding! Size:" (Get-Item index_standalone.html).Length
