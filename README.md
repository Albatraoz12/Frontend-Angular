
# Introduction

**Hello**, and welcome to my Recipe app.  
  
My name is **Dimosthenis Emmanouil** and this is my verry first fullstack webb application.
This is my frontend for my school assigment where I use Angular as my frontend framework and laravel 8 as my backend.

To see my backend repository please [Click here](https://github.com/Albatraoz12/Backend-Api)


This is a school assigment and the requirements for this application is, a user should be able to:
Useing my backend for this:
- Register an account
- Login to the account / logout
- Make lists / delete lists
- Save recipes into a lists / deleteting them from list
- **Extra!** Like recipes / deleteting liked recipes. 
- Every user should be able to add the same recipes to their list/lists but only once per list.

And in my frontend iam fetching recipes from Spoonacular.

**NOTE:** Styling was not a part off this assigment and I haven't put so much effort into
making this site look great. Iam using Bootstrap 5 (CSS) for the styling.

I was trying to mimic [Icas recipes app](https://www.ica.se/recept/), but in the end I driffted off and decided to do something similar but a bit simpler.

# Deployments

I used heroku for my backend, url: https://dinorage-api.herokuapp.com/
And for my frontend I used netlify, url: https://vermillion-twilight-e4aac6.netlify.app/


# Further work

This project has met all its requirements but i might come back and change some implementations. And they are,

- Reworking the login/register component where Iam calling http requests directly from the component and not via a service. I know that this is a bad practice but I have kept it for now because there is not enough time until the deadline

- Styling need to be fixed for a better user experience.
  
- Buttons must change color when user likes a recipe and/or add a recipe to a list.

- Naming methods better.

- Console.logs are disabled in live version but not here, this is due to knowing what results i get when a user like or adds a recipie.


# Installation

The requirements you need to have to be able to use my project for is:

- Have the necessary tools and requirements for using Angular.
- An ApiKey from Spoonucluar where you need to sign up [here](https://spoonacular.com/food-api/console#Dashboard)
- Have a folder where you will save the projects.

## How to set up Frontend

1. First  
- cd into the folder where you will be cloneing this respository or if you are useing the same folder you used to cloned my backend then you will want to stand in its root so you only can see docker-template map.
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


