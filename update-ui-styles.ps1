# PowerShell script to update UI styling across multiple files
$files = @(
    "c:\Users\user1\Desktop\GCIT\bhutan-insurance-loan-app\components\CoBorrowerDetail.tsx",
    "c:\Users\user1\Desktop\GCIT\bhutan-insurance-loan-app\components\SecurityDetail.tsx",
    "c:\Users\user1\Desktop\GCIT\bhutan-insurance-loan-app\components\RepaymentSource.tsx"
)

foreach ($file in $files) {
    Write-Host "Processing: $file"
    
    $content = Get-Content $file -Raw
    
    # Update grid gaps from gap-4 to gap-6
    $content = $content -replace 'grid-cols-1 md:grid-cols-(\d+) gap-4', 'grid-cols-1 md:grid-cols-$1 gap-6'
    
    # Update field spacing from space-y-2 to space-y-2.5 (not already .5)
    $content = $content -replace '(\s+)space-y-2"', '$1space-y-2.5"'
    
    # Update Label elements to add styling (basic pattern)
    $content = $content -replace '<Label htmlFor="([^"]+)">(\s+)([^<]+)', '<Label htmlFor="$1" className="text-gray-800 font-semibold text-sm">$2$3'
    
    # Add Input styling
    $content = $content -replace '<Input(\s+id="[^"]+"\s+)', '<Input$1className="h-11 border-gray-300 focus:border-[#FF9800] focus:ring-[#FF9800]" '
    
    # Add SelectTrigger styling  
    $content = $content -replace '<SelectTrigger>', '<SelectTrigger className="h-11 border-gray-300 focus:border-[#FF9800] focus:ring-[#FF9800]">'
    
    # Save updated content
    Set-Content $file -Value $content -NoNewline
    
    Write-Host "Updated: $file" -ForegroundColor Green
}

Write-Host "`nAll files updated successfully!" -ForegroundColor Cyan
