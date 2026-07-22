const fs = require('fs');
const path = require('path');

const targetTestFile = 'tests/ui/component-ui.spec.ts';
const constantsDir = 'commons/constants';
const routesFile = path.join(constantsDir, 'Routes.ts');

if (!fs.existsSync(constantsDir)) {
    fs.mkdirSync(constantsDir, { recursive: true });
}

let testContent = fs.readFileSync(targetTestFile, 'utf8');

const regex = /launchApplication\(['"`](.*?)['"`]\)/g;
const urls = new Set();
let match;
while ((match = regex.exec(testContent)) !== null) {
    urls.add(match[1]);
}

let routesStr = 'export const Routes = {\n';
const urlMap = {};

urls.forEach(url => {
    let rawKey = url.split('/').pop().toUpperCase();
    let key = rawKey.replace(/[-.]/g, '_').replace(/%[0-9A-F]{2}/g, '').replace(/[^A-Z0-9_]/g, '');
    
    if (!key) key = 'ROOT';
    if (urlMap[key]) {
        const parts = url.split('/');
        key = parts[parts.length - 2].toUpperCase().replace(/[-.]/g, '_') + '_' + key;
    }
    
    urlMap[key] = url;
    routesStr += '    ' + key + ': \'' + url + '\',\n';
});

routesStr += '} as const;\n';

fs.writeFileSync(routesFile, routesStr, 'utf8');

Object.keys(urlMap).forEach(key => {
    const url = urlMap[key];
    const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const urlRegex = new RegExp('launchApplication\\([\'"`]' + escapeRegex(url) + '[\'"`]\\)', 'g');
    testContent = testContent.replace(urlRegex, 'launchApplication(Routes.' + key + ')');
});

if (!testContent.includes('import { Routes }')) {
    const lastImportIndex = testContent.lastIndexOf('import ');
    const nextNewline = testContent.indexOf('\n', lastImportIndex);
    const importStatement = '\nimport { Routes } from \'../../commons/constants/Routes.js\';';
    testContent = testContent.substring(0, nextNewline) + importStatement + testContent.substring(nextNewline);
}

fs.writeFileSync(targetTestFile, testContent, 'utf8');
console.log('Successfully refactored URLs into Routes.ts');
