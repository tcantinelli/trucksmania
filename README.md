# ESlint FaceBook

##install si besoin
npm install --save-dev \
  eslint-config-fbjs \
  eslint-plugin-babel \
  eslint-plugin-flowtype \
  eslint-plugin-jsx-a11y \
  eslint-plugin-react \
  eslint \
  babel-eslint

## Fichier .eslintrc
  touch .eslintrc 

puis y ajouter:

{
    "extends": "fbjs/strict",
    "rules": {
        "max-len": [1, 120, 4],
        "indent": ["error", "tab"]
    }
}