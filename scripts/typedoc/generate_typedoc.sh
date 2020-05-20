
# For each service belonging to your project, add a reference to its
# generated source file to the command below.
./node_modules/.bin/typedoc --mode file --theme ./scripts/typedoc/theme --excludeExternals --excludePrivate --excludeProtected \
    --out ./doc \
    ./case-management/v1.ts \
    ./global-catalog/v1.ts \
    ./global-search/v2.ts \
    ./global-tagging/v1.ts \
    ./iam-access-groups/v2.ts \
    ./resource-manager/v2 \
    --target "ES5"
