# Projeto Realidade Aumentada

## Requisitos
Node.js >= v10.15.x

## Executando v2
Instale todas dependências

```
yarn install
```

Builde os bundlers
```
yarn webpack
# ou yarn webpack:dev para modo watch
```

Levante o servidor de arquivos estáticos
```
yarn serve
```

## Problemas comuns
**devices.js A error occurred! Permission denied**: script está sem acesso à sua câmera

**error in getUserMedia()**: navegador não reconhece sua câmera

**cache de arquivos .js**: mude a versão do import no arquivo .html
