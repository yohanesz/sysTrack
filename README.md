# Projeto SysTrack

**SysTrack** é um sistema de monitoramento de processos e informações do sistema em tempo real, feito com **Node.js**. Ele fornece uma API para gerenciar processos, visualizar informações de sistema (memória, CPU) e até mesmo alterar permissões de arquivos.

---

## 📋 **Pré-requisitos**

Antes de rodar o projeto, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)

---

## 🔧 **Instalação**

1. **Clone o repositório** para sua máquina:

```bash
   git clone https://github.com/yohanesz/sysTrack.git
   cd sysTrack
```

2. **Instale as dependências** do projeto:

```bash
  npm install
  ```

3. **Rodar o script de instalação**:

```bash
   ./setup.sh
   ```
4. **Configurar variáveis de ambiente** no arquivo .env:

```bash
  PORTA: porta para inicialização da api
  HOME: seu diretório home padrão
  ```

