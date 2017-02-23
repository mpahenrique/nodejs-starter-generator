ARGS = $(filter-out $@,$(MAKECMDGOALS))
MAKEFLAGS += --silent

mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir := $(notdir $(patsubst %/,%,$(dir $(mkfile_path))))

list:
	sh -c "echo Project ${projectName} makefile, available methods:; $(MAKE) -p no_targets__ | awk -F':' '/^[a-zA-Z0-9][^\$$#\/\\t=]*:([^=]|$$)/ {split(\$$1,A,/ /);for(i in A)print \"-> \"A[i]}' | grep -v '__\$$' | grep -v 'Makefile'| sort"

start:
	docker run -p 4000:4000 -v $(current_dir)code:/opt/${projectName} ${projectName}

stop:
	docker stop $(docker ps -q --filter ancestor=${projectName})

state:
	docker ps --filter ancestor=${projectName}

build:
	docker build -t ${projectName} .
	docker run -p 4000:4000 -v $(current_dir)code:/opt/${projectName} ${projectName}

%:
	@:
