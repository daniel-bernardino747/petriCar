# Simulação de Teste de qualidade usando Redes de Petri

## Getting Started

Para começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### 🎲 Rodando o servidor

Clone este repositório

```bash
git clone <https://github.com/daniel-bernardino747/poc-ket>
```

Acesse a pasta do projeto no terminal/cmd

```bash
cd poc-ket
```

Instale as dependências

```bash
npm install
```

---

### Atenção :heavy_exclamation_mark:

Antes de iniciar sua aplicação, crie o arquivo `.env`:

```bash
touch .env
```

e configure as variáveis de ambiente descritas em `.env.example`.

```properties
DATABASE_URL = # URL que o Prisma utiliza para fazer a conexão com o banco de dados, em caso de dúvidas: <https://www.prisma.io/docs/concepts/database-connectors/postgresql>
PORT = # Coloque a porta que deseja para rodar seu servidor. Recomenda-se: 4000
```

Para fazer isso rapidamente, acesse a pasta com seu editor de código.

```bash
code .
```

---

Execute a aplicação em modo de desenvolvimento

```bash
npm run start:dev
```

Em caso de sucesso, está mensagem aparecerá:

```
🌀 started server in door: 4000
```

## Manipulando o produto

Na rota descrita você pode alterar os valores do body e ver os resultados diferentes que a rota HTTP pode trazer

### O produto

Abaixo está descrito a respectiva propriedade os valores aceitos para que seja um produto de qualidae:

- **Peso** _(weight)_ : entre os valores **7000 e 10000 mililitros**
- **Altura** _(height)_: entre os valores **210 e 218 milimetros**
- **Comprimento** _(length)_ : entre os valores **119 e 128 milimetros**

```javascript
src / app / controllers / testQualityController.ts / 'linha 27-34'

const body: RequestBody = {
  product: {
    name: 'abc',
    weight: 9000,
    height: 212,
    length: 122,
  },
}

// return {is: true}

const body: RequestBody = {
  product: {
    name: 'abc',
    weight: 19000,
    height: 300,
    length: 100,
  },
}

// return {is: false}
```

### Observação:

Mesmo retornando o valor **false**, ainda sim significa que houve uma tentativa de refazer o produto descrito em:

```javascript
src / app / usecases / testQualityUseCase.ts / 'linha 30-37'

this.petriNet.fireTransition(tFail)

if (product.name.includes('.')) return false
product.name = product.name + ' .'

// Retestar o produto
this.petriNet.fireTransition(tRedo)
return this.checkProductQuality(product)
```
