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
envFile='templates/.env'
core='src/'

# Dist
dist=../dist/code
function createDistPaths {
    distControllersDelete=$dist/controllers/$1/delete.js
    distControllersGet=$dist/controllers/$1/get.js
    distControllers=$dist/controllers/$1/index.js
    distControllersPatch=$dist/controllers/$1/patch.js
    distControllersPost=$dist/controllers/$1/post.js
    distControllersPut=$dist/controllers/$1/put.js
    distRoutes=$dist/routes/$1/index.js
    distModelsEntities=$dist/models/entities/$2.js
    distModelsEntity=$dist/models/entities/
    distModelsDaoFile=$dist/models/dao/$1.js
}

## Reading new entity information

echo 'Welcome to the NodeJs Starter Generator! \nWhy be noob when you can be intelligent?'

# read -p "Type destination directory: " dist

read -p "Type database url (localhost): " dbHost
if [ -z $dbHost ]; then
    dbHost='localhost';
fi
read -p "Type database name (nodejs-starter-database): " dbName
if [ -z $dbName ]; then
    dbName='nodejs-starter-database';
fi
patternHostName=s/\$\{dbHost\}/"$dbHost"/g
patternDatabaseName=s/\$\{dbName\}/"$dbName"/g

echo "Step 1/4: Creating core files"
mkdir -p $dist
cp -r $core $dist

echo "Step 2/4: Creating database configuration file"
sed -e "$patternHostName" -e "$patternDatabaseName" $envFile > $dist/.env

echo "Step 3/4: Create system entities"
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
    mkdir -p $dist/routes/$entity
    sed -e "$pattern1" -e "$pattern2" $routes > $distRoutes

    echo "   |__ Creating $Uentity class"
    mkdir -p $dist/models/entities
    sed -e "$pattern1" -e "$pattern2" $modelsEntities > $distModelsEntities

    echo "   |__ Creating $entity controller files"
    mkdir -p $dist/controllers/$entity
    sed -e "$pattern1" -e "$pattern2" $controllersDelete > $distControllersDelete
    sed -e "$pattern1" -e "$pattern2" $controllersGet > $distControllersGet
    sed -e "$pattern1" -e "$pattern2" $controllers > $distControllers
    sed -e "$pattern1" -e "$pattern2" $controllersPatch > $distControllersPatch
    sed -e "$pattern1" -e "$pattern2" $controllersPost > $distControllersPost
    sed -e "$pattern1" -e "$pattern2" $controllersPut > $distControllersPut

    echo "   |__ Creating $entity model"
    mkdir -p $dist/models/dao
    cp $modelsCommon $distModelsEntity
    sed -e "$pattern1" -e "$pattern2" $modelsDao > $distModelsDaoFile
done

echo "Step 4/4: Installing project dependencies"
cd $dist && npm install