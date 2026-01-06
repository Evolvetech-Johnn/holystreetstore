#!/usr/bin/env node

/**
 * Script para limpeza automática de cache do navegador
 * Executa comandos para limpar cache em diferentes navegadores
 */

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import process from 'process';

console.log('🧹 Iniciando limpeza de cache...\n');

// Função para executar comandos
function executeCommand(command, description) {
  return new Promise((resolve) => {
    console.log(`📋 ${description}...`);
    exec(command, (error) => {
      if (error) {
        console.log(`⚠️  ${description} - Não foi possível executar (normal se o navegador não estiver instalado)`);
        resolve();
      } else {
        console.log(`✅ ${description} - Concluído`);
        resolve();
      }
    });
  });
}

// Função para limpar cache do projeto
function clearProjectCache() {
  const cacheDirs = [
    path.join(process.cwd(), 'node_modules/.vite'),
    path.join(process.cwd(), 'node_modules/.cache'),
    path.join(process.cwd(), 'dist'),
    path.join(process.cwd(), '.vite')
  ];

  console.log('🗂️  Limpando cache do projeto...');
  
  cacheDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`✅ Removido: ${path.basename(dir)}`);
      } catch {
        console.log(`⚠️  Não foi possível remover: ${path.basename(dir)}`);
      }
    }
  });
}

// Função principal
async function clearCache() {
  try {
    // Limpar cache do projeto
    clearProjectCache();
    
    console.log('\n🌐 Tentando limpar cache dos navegadores...');
    
    // Comandos para diferentes sistemas operacionais e navegadores
    const commands = [
      // Chrome (Windows)
      {
        command: 'taskkill /F /IM chrome.exe 2>nul && timeout /t 2 >nul && start chrome --disable-web-security --disable-features=VizDisplayCompositor --disable-extensions --incognito',
        description: 'Reiniciando Chrome com cache limpo'
      },
      // Edge (Windows)
      {
        command: 'taskkill /F /IM msedge.exe 2>nul && timeout /t 2 >nul && start msedge --disable-web-security --disable-features=VizDisplayCompositor --disable-extensions --inprivate',
        description: 'Reiniciando Edge com cache limpo'
      },
      // Firefox (Windows)
      {
        command: 'taskkill /F /IM firefox.exe 2>nul && timeout /t 2 >nul && start firefox -private-window',
        description: 'Reiniciando Firefox em modo privado'
      }
    ];

    // Executar comandos sequencialmente
    for (const cmd of commands) {
      await executeCommand(cmd.command, cmd.description);
    }

    console.log('\n🎉 Limpeza de cache concluída!');
    console.log('💡 Dica: O navegador foi reiniciado em modo privado/incógnito para evitar cache.');
    console.log('🔄 Aguarde alguns segundos e acesse: http://localhost:5173\n');

  } catch (error) {
    console.error('❌ Erro durante a limpeza de cache:', error.message);
    process.exit(1);
  }
}

// Executar o script
clearCache();