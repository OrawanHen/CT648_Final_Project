# Qusetion Game
Outsite API : https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple

page for multiple chice game for awswer question that get form Outsite API.

# How to get api from https://opentdb.com
![image](https://github.com/user-attachments/assets/b9dbe6df-631f-4f6e-8471-193fd7f66d44)


## Homepage
![image](https://github.com/user-attachments/assets/74a6474a-c456-4daa-8abc-589e6e26cdb6)



## New Game Page 
- Place API and CHECK will get api to show as question 
- Can "Save Question" then your question will show in all game and can play that game again.
![image](https://github.com/user-attachments/assets/a3c94b6e-9b33-49b7-a1cc-ef1c203071a4)



# All Game Page 
- After "Save Question" 
![image](https://github.com/user-attachments/assets/fe6debfe-bb2e-402f-a123-cbfa77a1cfb8)



# Game play
- If "Save Point" , your point will show in Game History Point Page
![image](https://github.com/user-attachments/assets/ab523fcd-de7c-4905-bd15-2f11d7797496)


![image](https://github.com/user-attachments/assets/3f92c68d-ba8e-45ab-869f-72f3d4d1d5d1)


# Game History Point Page
![image](https://github.com/user-attachments/assets/f85aec2f-f7d1-4208-a4f3-5110118837ff)


# How to start with ct648_finalproject
```
Using port .
- 5432 > SQLPostgase
- 3000 > API
- 80 > Website
```
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

> optional for check  docker-compose version
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
> * sudo docker-compose up
> 
> ... 
> angular-app-1  |   ➜  Local:   http://localhost:4200/
> angular-app-1  |   ➜  Network: http://172.18.0.2:4200/


# docker-compose.yml
```
services:
  angular-app:
    build:
      context: ./ct648_finalproject
    ports:
      - "80:80"  # Map port 80 (Nginx) to port 4200 on the host
    restart: always

  server:
    build:
      context: ./server
    ports:
      - "3000:3000"  # Expose Node.js server on port 3000
    depends_on:
      - db  # Wait for the database service to be ready
    restart: always

  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_USER: your_postgres_user
      POSTGRES_PASSWORD: your_password
      POSTGRES_DB: your_database_name
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./db-init-scripts:/docker-entrypoint-initdb.d
    restart: always

volumes:
  postgres-data:
```

# init.sql for create table
```
CREATE TABLE IF NOT EXISTS public.quiz_history
(
    gamepoint text,
    useremail text,
    gamename text,
    "time" timestamp with time zone  -- Stores time with time zone information
);

CREATE TABLE IF NOT EXISTS public.quiz_login
(
    id SERIAL PRIMARY KEY,           -- Auto-incrementing primary key
    username text NOT NULL,          -- Username is required
    password text NOT NULL,          -- Password is required
    email text                       -- Optional email field
);

CREATE TABLE IF NOT EXISTS public.quiz_questions
(
    id SERIAL PRIMARY KEY,           -- Auto-incrementing primary key
    question text,
    correct_answer text,
    category text,
    difficulty text,
    type text,
    incorrect_answers json,          -- JSON column for storing incorrect answers
    title_id integer                 -- Foreign key to quiz_title (if needed)
);

CREATE TABLE IF NOT EXISTS public.quiz_title
(
    id SERIAL PRIMARY KEY,           -- Auto-incrementing primary key
    title text,
    create_date timestamp without time zone  -- Stores time without time zone information
);
```
new table 
quiz_history > for kepp history point 
quiz_login > for keep user login
quiz_questions > for keep question 
quiz_questions > for keep question title


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
The project is part of coursework for CT648 Web and Cloud Engineering at Dhurakij Pundit University.
Consultant : Assist.Prof.Dr.Chaiyaporn Khemapatpapan,Ph.D
Thank you and have a grate day. <br>
BR <br>
Orawan Hensirisak 666130226


