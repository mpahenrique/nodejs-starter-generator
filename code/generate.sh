# Templates
controllersDelete='templates/controllers/${entity}/delete.js'
controllersGet='templates/controllers/${entity}/get.js'
controllers='templates/controllers/${entity}/index.js'
controllersPatch='templates/controllers/${entity}/patch.js'
controllersPost='templates/controllers/${entity}/post.js'
controllersPut='templates/controllers/${entity}/put.js'
routes='templates/routes/${entity}/index.js'
modelsEntities='templates/models/entities/${entity}.js'
modelsDao='templates/models/dao/${entity}.js'
modelsCommon='templates/models/entities/Common.js'
modelsDaoCommon='templates/models/dao/Common.js'
envFile='templates/.env'
packageJson='templates/package.json'
Dockerfile='templates/Dockerfile'
Makefile='templates/Makefile'
core='src/'

# Dist
# dist=../dist/code
function createDistPaths {
    distControllersDelete="$dist/controllers/$1/delete.js"
    distControllersGet="$dist/controllers/$1/get.js"
    distControllers="$dist/controllers/$1/index.js"
    distControllersPatch="$dist/controllers/$1/patch.js"
    distControllersPost="$dist/controllers/$1/post.js"
    distControllersPut="$dist/controllers/$1/put.js"
    distRoutes="$dist/routes/$1.js"
    distModelsEntities="$dist/models/entities/$2.js"
    distModelsEntity="$dist/models/entities/"
    distModelsDao="$dist/models/dao/"
    distModelsDaoFile="$dist/models/dao/$1.js"
}

## Reading new entity information

echo 'Welcome to the NodeJs Starter Generator! \nWhy be noob when you can be intelligent?'

# read -p "Type destination directory: " dist

read -p "Step 1/13: Type project name (nodejs-starter-generator) " projectName
if [ -z "$projectName" ]; then
    projectName='nodejs-starter-generator';
fi

read -p "Step 2/13: Type destination path (../dist/code) " dist
if [ -z "$dist" ]; then
    dist='../dist/code';
fi

read -p "Step 3/13: Type database url (localhost): " dbHost
if [ -z $dbHost ]; then
    dbHost='localhost';
fi

read -p "Step 4/13: Type database user (root): " dbUsername
if [ -z $dbUsername ]; then
    dbUsername='root';
fi

read -p "Step 5/13: Type database password (root): " dbPassword
if [ -z $dbPassword ]; then
    dbPassword='root';
fi

read -p "Step 6/13: Type database name (nodejs-starter-database): " dbName
if [ -z $dbName ]; then
    dbName='nodejs-starter-database';
fi

patternDatabaseHostName=s/\$\{dbHost\}/"$dbHost"/g
patternDatabaseName=s/\$\{dbName\}/"$dbName"/g
patternProjectName=s/\$\{projectName\}/"$projectName"/g
patternDatabaseUsername=s/\$\{dbUsername\}/"$projectName"/g
patternDatabasePassword=s/\$\{dbPassword\}/"$dbPassword"/g

echo "Step 7/13: Creating core files"
mkdir -p "$dist"
mkdir -p "$dist/routes/"
cp -r "$core" "$dist"

echo "Step 8/13: Creating Dockerfile"
sed -e "$patternProjectName" $Dockerfile > "$dist/../Dockerfile"

echo "Step 9/13: Creating Makefile"
sed -e "$patternProjectName" $Makefile > "$dist/../Makefile"

echo "Step 10/13: Creating package.json"
sed -e "$patternProjectName" $packageJson > "$dist/package.json"

echo "Step 11/13: Creating database configuration file"
sed -e "$patternDatabaseHostName" -e "$patternDatabaseName" -e "$patternDatabaseUsername" -e "$patternDatabasePassword" $envFile > "$dist/.env"

echo "Step 12/13: Create system entities"
while read -p "Type new entity or press enter to exit: " entity; do
    if [ -z $entity ]; then
        break
    fi
    first=`echo $entity|cut -c1|tr [a-z] [A-Z]`
    second=`echo $entity|cut -c2-`
    Uentity=$first$second
    pattern1=s/\$\{Uentity\}/"$Uentity"/g
    pattern2=s/\$\{entity\}/"$entity"/g

    echo "-> $Uentity:"
    echo "   |__ Creating new entity $entity..."
    createDistPaths $entity $Uentity

    echo "   |__ Creating $entity routes"
    sed -e "$pattern1" -e "$pattern2" $routes > "$distRoutes"

    echo "   |__ Creating $Uentity class"
    mkdir -p "$dist/models/entities"
    sed -e "$pattern1" -e "$pattern2" $modelsEntities > "$distModelsEntities"

    echo "   |__ Creating $entity controller files"
    mkdir -p "$dist/controllers/$entity"
    sed -e "$pattern1" -e "$pattern2" $controllersDelete > "$distControllersDelete"
    sed -e "$pattern1" -e "$pattern2" $controllersGet > "$distControllersGet"
    sed -e "$pattern1" -e "$pattern2" $controllers > "$distControllers"
    sed -e "$pattern1" -e "$pattern2" $controllersPatch > "$distControllersPatch"
    sed -e "$pattern1" -e "$pattern2" $controllersPost > "$distControllersPost"
    sed -e "$pattern1" -e "$pattern2" $controllersPut > "$distControllersPut"

    echo "   |__ Creating $entity model"
    mkdir -p "$dist/models/dao"
    cp -r "$modelsCommon" "$distModelsEntity"
    cp -r "$modelsDaoCommon" "$distModelsDao"
    sed -e "$pattern1" -e "$pattern2" $modelsDao > "$distModelsDaoFile"
done

echo "Step 13/13: Installing project dependencies"
cd "$dist" && npm install