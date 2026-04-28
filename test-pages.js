const fs = require('fs');
const path = require('path');

const pages = ['Donaciones.tsx', 'Alianzas.tsx'];
const pagesDir = path.join(__dirname, 'src/pages');

console.log('Verificando archivos de páginas...\n');

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`✓ ${page} existe`);
    
    if (page === 'Donaciones.tsx') {
      if (content.includes('Próximamente encontrarás')) {
        console.log('  ✓ Contiene mensaje "Próximamente encontrarás"');
      } else {
        console.log('  ✗ NO contiene mensaje "Próximamente encontrarás"');
      }
    } else if (page === 'Alianzas.tsx') {
      if (content.includes('Próximamente compartiremos')) {
        console.log('  ✓ Contiene mensaje "Próximamente compartiremos"');
      } else {
        console.log('  ✗ NO contiene mensaje "Próximamente compartiremos"');
      }
    }
  } else {
    console.log(`✗ ${page} NO existe`);
  }
  console.log('');
});

// Verificar que están importados en App.tsx
const appPath = path.join(pagesDir, '../App.tsx');
const appContent = fs.readFileSync(appPath, 'utf8');

console.log('Verificando importaciones en App.tsx...\n');
if (appContent.includes('Donaciones')) {
  console.log('✓ Donaciones importado en App.tsx');
} else {
  console.log('✗ Donaciones NO importado en App.tsx');
}

if (appContent.includes('Alianzas')) {
  console.log('✓ Alianzas importado en App.tsx');
} else {
  console.log('✗ Alianzas NO importado en App.tsx');
}

if (appContent.includes('"/donaciones"')) {
  console.log('✓ Ruta /donaciones existe en App.tsx');
} else {
  console.log('✗ Ruta /donaciones NO existe en App.tsx');
}

if (appContent.includes('"/alianzas"')) {
  console.log('✓ Ruta /alianzas existe en App.tsx');
} else {
  console.log('✗ Ruta /alianzas NO existe en App.tsx');
}
