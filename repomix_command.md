# Repomix Command

Comando `repomix` utilizado para generar el archivo `repomix-output.xml`, excluyendo archivos markdown y SQL.

```bash
npx repomix@latest --include "**/*.tsx,**/*.ts,**/*.mjs,**/*.js,**/*.css,**/*.json,.env.example" --ignore "node_modules/**,public/**,.next/**,.git/**,data/**,test/**,coverage/**,dist/**,build/**,.serena/**,.claude/**,.playwright-mcp/**,backup_*.sql,repomix-output.*,pnpm-lock.yaml,*.log,**/*.xlsx,**/*.csv,**/.DS_Store,**/*.tmp,**/*.lock,package-lock.json,**/*.svg,**/*.jpg,**/*.jpeg,**/*.png,**/*.gif,**/*.bmp,**/*.tiff,**/*.tif,**/*.webp,**/*.ico,**/*.avif,**/*.heic,**/*.heif,**/*.mp4,**/*.avi,**/*.mov,**/*.wmv,**/*.flv,**/*.webm,**/*.mkv,**/*.m4v,**/*.3gp,**/*.mpeg,**/*.mpg,**/*.ogv,**/*.m3u8,**/*.mp3,**/*.wav,**/*.flac,**/*.aac,**/*.ogg,**/*.wma,**/*.m4a,**/*.md,**/*.sql" --output-show-line-numbers --remove-comments --style xml --compress
```
