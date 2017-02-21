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
core='src/*'
coreD='src/.*'

# Dist
function createDistPaths {
    dist=../dist
    distControllersDelete=$dist/controllers/$1/delete.js
    distControllersGet=$dist/controllers/$1/get.js
    distControllers=$dist/controllers/$1/index.js
    distControllersPatch=$dist/controllers/$1/patch.js
    distControllersPost=$dist/controllers/$1/post.js
    distControllersPut=$dist/controllers/$1/put.js
    distRoutes=$dist/routes/$1/index.js
    distModelsEntities=$dist/models/entities/$2.js
    distModelsDao=$dist/models/dao/$1.js
}

## Reading new entity information

echo 'Welcome to the NodeJs Starter Generator! \nWhy be noob when you can be intelligent?'

# read -p "Type destination directory: " dist

read -p "Type new entity: " entity
first=`echo $entity|cut -c1|tr [a-z] [A-Z]`
second=`echo $entity|cut -c2-`
Uentity=$first$second
pattern1=s/\$\{Uentity\}/"$Uentity"/
pattern2=s/\$\{entity\}/"$entity"/

echo "Creating new $entity entity..."
createDistPaths $entity $Uentity

echo "Step 1/4: Creating $entity controller files"
mkdir -p $dist/controllers/$entity
sed -e "$pattern1" -e "$pattern2" $controllersDelete > $distControllersDelete
sed -e "$pattern1" -e "$pattern2" $controllersGet > $distControllersGet
sed -e "$pattern1" -e "$pattern2" $controllers > $distControllers
sed -e "$pattern1" -e "$pattern2" $controllersPatch > $distControllersPatch
sed -e "$pattern1" -e "$pattern2" $controllersPost > $distControllersPost
sed -e "$pattern1" -e "$pattern2" $controllersPut > $distControllersPut

echo "Step 2/4: Creating $entity model"
mkdir -p $dist/models/dao
sed -e "$pattern1" -e "$pattern2" $modelsDao > $distModelsDao

echo "Step 3/4: Creating $Uentity class"
mkdir -p $dist/models/entities
sed -e "$pattern1" -e "$pattern2" $modelsEntities > $distModelsEntities

echo "Step 4/4: Creating core files"
cp -r $core $dist
cp -r $coreD $dist
sed -e "$pattern1" -e "$pattern2" $modelsEntities > $distModelsEntities