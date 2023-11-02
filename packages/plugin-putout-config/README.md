# @putout/plugin-putout-config [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout-config.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout-config"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with 🐊[**Putout Config**](https://github.com/coderaiser/putout#-configuration).

## Install

```
npm i @putout/plugin-putout-config -D
```

## Rules

```json
{
    "rules": {
        "putout-config/convert-boolean-to-string": "on",
        "putout-config/move-formatter-up": "on",
        "putout-config/remove-empty": "on"
    }
}
```

## convert-boolean-to-string

### ❌ Example of incorrect code

```json
{
    "rules": {
        "remove-unused-variables": true,
        "remove-debugger": false
    }
}
```

### ✅ Example of correct code

```json
{
    "rules": {
        "remove-unused-variables": "on",
        "remove-debugger": "off"
    }
}
```

## move-formatter-up

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/48ce05b358a9118250acdc0b35df0fc8/50aeb680193ab4cd5d247e098ff90be8d4092111).

### ❌ Example of incorrect code

```json
{
    "parser": "babel",
    "rules": {
        "remove-unused-variables": "off"
    },
    "formatter": "progress-bar"
}
```

### ✅ Example of correct code

```json
{
    "parser": "babel",
    "formatter": "progress-bar",
    "rules": {
        "remove-unused-variables": "off"
    }
}
```

## remove-empty

### ❌ Example of incorrect code

```json
{
    "rules": {},
    "plugins": [],
    "match": {
        "*.js": {
            "remove-unused-variables": "off"
        }
    }
}
```

### ✅ Example of correct code

```json
{
    "match": {
        "*.js": {
            "remove-unused-variables": "off"
        }
    }
}
```

## License

MIT
