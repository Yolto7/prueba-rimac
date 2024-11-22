if [ -z "$1" ]; then
  echo "Enter the package to debug!"
  exit
fi

PACKAGE=$1
STAGE="dev"
shift

# Build shared
if npm run build:shared; then
  echo "$(date '+%d/%m/%Y %H:%M:%S') The API in stage $STAGE built shared was successfully."
else
  echo "$(date '+%d/%m/%Y %H:%M:%S') The API in stage $STAGE built shared was failed."
  exit 1
fi

# Prepare
cd packages/$PACKAGE
rm -rf logs

# Build
if npm run build; then
  echo "$(date '+%d/%m/%Y %H:%M:%S') The API in stage $STAGE built was successfully."
else
  echo "$(date '+%d/%m/%Y %H:%M:%S') The API in stage $STAGE built was failed."
  exit 1
fi

# DEBUG
export SLS_DEBUG=*
node --inspect /home/joaquin/.nvm/versions/node/v21.7.1/bin/serverless offline start --stage $STAGE