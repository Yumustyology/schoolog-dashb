#!/usr/bin/env bash
set -e
HOSTS_FILE="/etc/hosts"
BACKUP="/etc/hosts.bak.$(date +%Y%m%d%H%M%S)"
sudo cp $HOSTS_FILE $BACKUP

sudo bash -c "cat >> $HOSTS_FILE <<'EOF'
# -- multi-tenant local dev entries (added by setup-hosts.sh)
127.0.0.1   school1.localhost
127.0.0.1   school2.localhost
127.0.0.1   app.localhost
# -- end
EOF"

if which dscacheutil >/dev/null 2>&1; then
  sudo dscacheutil -flushcache
fi
if which systemd-resolve >/dev/null 2>&1; then
  sudo systemd-resolve --flush-caches
fi

echo "Hosts updated. Backup saved to $BACKUP"
