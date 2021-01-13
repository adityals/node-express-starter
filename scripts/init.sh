#!/bin/bash

# wait-for postgres
(./scripts/wait-for-it.sh postgres:5432)
WAIT_STATUS=$?

if [ "$WAIT_STATUS" -ne 0 ]; then 
  echo "So sad, failed waiting postgres ready"
  exit "$WAIT_STATUS"
fi

# sleep 1s

# Run the main container command
exec "$@"