#!/bin/bash

echo "🚀 Iniciando a configuração do projeto..."

if ! command -v node &> /dev/null
then
    echo "❌ Node.js não encontrado! Instale o Node.js antes de continuar."
    exit 1
fi

if ! command -v npm &> /dev/null
then
    echo "❌ NPM não encontrado! Instale o Node.js que o NPM vem junto."
    exit 1
fi

echo "📦 Instalando dependências..."
npm install

if [ -f ".env.example" ]; then
    echo "📄 Criando arquivo .env..."
    cp .env.example .env
fi

chmod +x setup.sh

echo "✅ Configuração concluída! Para iniciar o projeto, execute: npm start e npm run dev"
