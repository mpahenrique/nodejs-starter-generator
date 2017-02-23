FROM ubuntu
ARG workspace

# Installation
## Debian packages dependencies
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

## Verify dependencies versions
RUN node -v

RUN npm install nodemon -g

## Workdir
WORKDIR /opt/${projectName}
RUN ls -la

## Run scripts

CMD ["nodemon", "/opt/${projectName}/index.js"]