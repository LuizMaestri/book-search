# Book Search

## Requisitos
- nodejs 12
- docker
- yarn (opcional)

## Execução do sistema
### Ambiente Dev
```
yarn 
yarn start
```
ou
```
npm install
npm start
```

### Ambiente PRD
```
yarn
yarn build
docker build . -t book-search:latest
docker run -p 5000:5000 book-search:latest
```
ou
```
npm
npm run build
docker build . -t book-search:latest
docker run -p 5000:5000 book-search:latest
```
