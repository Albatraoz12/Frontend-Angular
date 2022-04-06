
# Introduction

**Hello**, and welcome to my Recipe app.  
  
My name is **Dimosthenis Emmanouil** and this is my verry first fullstack webb application.
Iam using Angular as my frontEnd and Laravel as my backEnd.

This is a school assigment and in this application a user can:
- Register and account
- Login to the account / logout
- Make lists / delete lists
- Save recipes into a lists / deleteting them from list
- Like recipes / deleteting liked recipes.

**NOTE:** that styling was not a part off this assigment and I haven't put so much effort into
making this site look great. Iam using Bootstrap 5 (CSS) for the styling.


# Installation

The requirements you need to have to be able to use my project for is:

- Have Docker installed and Docker extension in Visual Studio Code.
- Have the necessary tools and requirements for using Angular and Laravel.
- Have a folder where you will save the projects.

## How to set up BackEnd

Follow these steps under!

1. First  
- Open upp your wished terminal and cd into the map where you will download my projects.
- Then you clone this repository [here](https://github.com/Albatraoz12/docker-template) wich will include 1 map containing 2 docker files. After that you need to make a map named project Inside of docker-template map where the 2 docker files are.
- So in otherwords you will haven 1 map containing 2 docker files and 1 map called project.

2. Secound  
- cd into the project file and in here you will need to clone this [repository here](https://github.com/Albatraoz12/Backend-Api)
- After you clone the repository you will have 1 map called Backend-Api inside your project map!

3. Third  
- cd .. out so you stand inside the folder containing the project map and the 2 dockerfiles then type code . . Make sure you have Docker app up and running.
- When you land inside off Visual Studio Code open up your terminal and write this command: `docker compose build`, after that command is finnished loading you need to type this command: `docker compose up`.

4. Fourth  
- Open the docker extension and right click on the Backend-Api_php and click on the Attach Sehll. cd into Backend-Api and type `composer i`.

5. Fifth  
- After compose has finnished its installation you need to make a copy off the .env.example and call the copy .env.
- open .env file and change the DB_HOST:db, DB_DATABSE: "YourDBNameHere", DB_USERNAME:"YourNameHere", DB_PASSWORD="YourPassHere".
- After you have altered the .env file you need to go to localhost:8080 and login into the main db which will have Username as DB_USERNAME and Password will be as DB_PASSWORD.
- When you log in, create a database with the same name as you said in the .env file (DB_DATABSE="Yourname").
- Go back to your Visual Studio Code and in the shell terminal write `php artisan migrate` and after that has finnished loading type `php artisan serve --host 0.0.0.0 --port 8000`.


The BackEnd should now be up and running.

## How to set up FrontEnd

1. First  
- cd into the root folder so you only can see docker-template map.
- Here you would want to clone [this repository](https://github.com/Albatraoz12/Frontend-Angular) You will get a map called Frontend-Angular.
- CD into Fronten-Angular and type code . so you open up the repo with Visual Studio Code.

2. Secound

- Open a terminal inside VSC and tpe this command `npm install`
- After you have done all the installation you need to go into the enviroments folder and into enviroments.prod.ts file and put in your apiKey into the variabel apiKey. Which you get from Spoonaculars website.
- Type this command `ng serve` or `npm start` and now you should have a functionall recipe app where you talk from the frontend to the backend!


# Toughts!

I have not enjoyed this assigment so much due to making a whole fullstack project from ground up in just 2 weeks.
Tho its has been a good journey with many ups and downs and iam glad that I have finnished the project. I have learned alot this past 2 weeks
and iam looking forward to see what more i will learn.

# Follow me!

My [Github](https://github.com/Albatraoz12)  
My [LinkedIn](https://www.linkedin.com/in/dimosthenis-emmanouil-4ba731207/)


