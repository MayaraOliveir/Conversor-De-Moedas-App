<h1 align= "center"> Conversor-De-Moedas-App </h1>

Um aplicativo mobile desenvolvido em React Native e Expo para converter valores entre diferentes moedas de forma rápida e interativa. Este projeto foi criado como um treinamento prático para aprender conceitos de React Native, componentes reutilizáveis, chamadas de API e manipulação de estados.

## Funcionalidades

Converter valores entre várias moedas (USD, BRL, EUR, etc.)

Seleção de moeda de origem e destino

Atualização automática da taxa de câmbio via API

Interface responsiva e amigável para mobile

Feedback visual de carregamento ao buscar a conversão

## Tecnologias Utilizadas

React Native

Expo

JavaScript / Hooks

ExchangeRate-API

## Estrutura do Projeto
```text
src/
├── components/   # Componentes reutilizáveis (Input, Button, ResultCard)
├── constants/    # Moedas e configurações fixas
├── services/     # API de conversão
├── styles/       # Estilos e utilitários
└── App.js        # Componente principal
```

## Como Rodar Localmente

 ### 1. Clone o repositório:

``` bash
git clone https://github.com/seu-usuario/Conversor-De-Moedas-App.git
cd Conversor-De-Moedas-App
```


### 2. Instale as dependências:

```bash
npm install
```
### ou
```bash
yarn install
```

### 3. Inicie o Expo:

```bash
npx expo start
```

### 4. Abra o app no seu dispositivo ou emulador com o QR Code exibido no terminal.

## Como Contribuir

Faça um fork do projeto

Crie uma branch: git checkout -b minha-feature

Faça suas alterações

Commit: git commit -m "Adicionei nova funcionalidade"

Push para a branch: git push origin minha-feature

Abra um Pull Request

#### Referências

> Este projeto foi desenvolvido com base no curso da [`DevClub`] canal youtube, com adaptações e melhorias próprias para fins de aprendizado.
