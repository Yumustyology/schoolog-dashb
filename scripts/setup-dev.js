#!/usr/bin/env node
/* eslint-disable */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';

// Configure the subdomains you want locally
const entries = [
  '127.0.0.1\tschool1.localhost',
  '127.0.0.1\tschool2.localhost',
  '127.0.0.1\tapp.localhost',
];

function getHostsPath() {
  const platform = os.platform();
  if (platform === 'win32') {
    return path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'drivers', 'etc', 'hosts');
  }
  return '/etc/hosts';
}

function backupHosts(hostsPath) {
  const backupPath = `${hostsPath}.copied.${Date.now()}`;
  fs.copyFileSync(hostsPath, backupPath);
  return backupPath;
}

function appendEntries(hostsPath) {
  const content = fs.readFileSync(hostsPath, { encoding: 'utf8' });
  const markerStart = '# -- multi-tenant local dev entries (start)';
  const markerEnd = '# -- multi-tenant local dev entries (end)';

  if (content.includes(markerStart)) {
    console.log('Hosts already contain entries. Skipping append.');
    return null;
  }

  const toAdd = ['\n', markerStart, ...entries.map((e) => e), markerEnd, '\n'].join('\n');
  fs.appendFileSync(hostsPath, toAdd, { encoding: 'utf8' });
  return true;
}

function flushDns() {
  const platform = os.platform();
  try {
    if (platform === 'win32') {
      execSync('ipconfig /flushdns', { stdio: 'inherit' });
    } else if (platform === 'darwin') {
      execSync('dscacheutil -flushcache', { stdio: 'inherit' });
      execSync('sudo killall -HUP mDNSResponder', { stdio: 'inherit' });
    } else {
      // linux
      try {
        execSync('sudo systemd-resolve --flush-caches', { stdio: 'inherit' });
      } catch {
        // best-effort
      }
    }
  } catch {
    console.warn('Failed to flush DNS cache automatically. You may need to do it manually.');
  }
}

function main() {
  const hostsPath = getHostsPath();
  console.log('Hosts file:', hostsPath);

  if (!fs.existsSync(hostsPath)) {
    console.error('Hosts file not found:', hostsPath);
    process.exit(1);
  }

  try {
    const backup = backupHosts(hostsPath);
    console.log('Backup created at', backup);
  } catch {
    console.error('Failed to backup hosts file. Try running with elevated privileges.');
    process.exit(1);
  }

  try {
    const result = appendEntries(hostsPath);
    if (result) console.log('Hosts updated with local subdomains.');
  } catch {
    console.error('Failed to append entries to hosts file. You might need elevated privileges.');
    process.exit(1);
  }

  flushDns();
  console.log('Done. Visit http://school1.localhost:3000 or http://school2.localhost:3000');
}

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  main();
}
