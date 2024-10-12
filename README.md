# How to start with ct648_finalproject
### Please run following command

## Step for pull code form gitHub
* git clone https://github.com/OrawanHen/CT648_Final_Project.git
* cd CT648_Final_Project/
> Will able to see 4 files <br>
> 1. ct648_finalproject for webstie.
> 2. db-init-scripts for create database table.
> 3. docker-compose.yml for docker.
> 4. server for connent between webstie and database.

## Step for install docker-compose
* sudo apt update
* sudo apt install docker.io
* sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose 
<br>
> _optional for check  docker-compose version_
> * docker-compose --version


## Step for update IP 
* cd ct648_finalproject/src/environments/
* nano environment.ts
##### after nano environment.ts will see code below :
```
export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000'
  };
```
#### Please change form **localhost** to your IP, Example code below :
```
export const environment = {
    production: false,
    apiUrl: 'http://13.212.13.91:3000'
  };
```

## Step for run docker-compose
* sudo docker-compose up


# SUMMARY ALL STEP
> 1. git clone https://github.com/OrawanHen/CT648_Final_Project.git
> 2. cd CT648_Final_Project/
> 3. sudo apt update
> 4. sudo apt install docker.io
> 5. sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose 
> 6. cd ct648_finalproject/src/environments/
> 7. nano environment.ts
> 8. change form **localhost** to your IP, Example code below :
> ```
> export const environment = {
>     production: false,
>     apiUrl: 'http://13.212.13.91:3000'
>   };
> ```
> 9. sudo docker-compose up


##
Thank you and have a grate day.

BR

Orawan Hensirisak 666130226


