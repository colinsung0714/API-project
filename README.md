# Airbrb
Airbrb is a project aimed at creating a partial clone of the popular vacation rental website 'Airbnb.' Airbrb allows users to discover and book accommodations for their travels. Its user-friendly interface, extensive property listings, and seamless booking process make it easy to use.
# Live Link
[https://airbrb-rqip.onrender.com](https://airbrb-rqip.onrender.com)
# Tech Stack

### Frameworks and Libraries
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" /><img src="https://img.shields.io/badge/Render-46E3B7.svg?style=for-the-badge&logo=Render&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white" /><img src="https://img.shields.io/badge/Google%20Maps-4285F4?logo=googlemaps&logoColor=fff&style=for-the-badge" />

### Database
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge"/>

### Hosting:
<img src="https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=000&style=for-the-badge" />


## Index
[Redux Store](https://github.com/colinsung0714/API-project/wiki/Redux-Store) |
[Feature List](https://github.com/colinsung0714/API-project/wiki/Features) |
[Database Scheme](https://github.com/colinsung0714/API-project/wiki/Database-Schema-and-Backend-Routes) |
[User Stories](https://github.com/colinsung0714/API-project/wiki/User-Stories) |
[Wireframes](https://github.com/colinsung0714/API-project/wiki/Wireframes)

## Landing Page
![image](https://github.com/colinsung0714/API-project/assets/99006739/0b7796b2-67a5-4492-a78a-26c2dbb59e97)


## Restaurant Detail Page
![image](https://github.com/colinsung0714/API-project/assets/99006739/30113939-c371-4dc6-89e8-27d0e1e580a8)

## Reservation Page
![image](https://github.com/colinsung0714/API-project/assets/99006739/8dd4cd1a-ede3-41e9-9430-9d5245a26fd6)

## Reservation Detail Page
![image](https://github.com/colinsung0714/API-project/assets/99006739/2d8d2227-90fd-4c92-a333-2c5b23e9209e)



## Getting started
1. Clone this repository:
    * `https://github.com/colinsung0714/API-project.git`

2. Install dependencies into the Backend by cd into `backend` running the following:
    * `npm install`

3. Install dependencies into the Frontend by cd into `frontend` and running the following:
    * `npm install`

4. Create a **.env** file using the **.envexample** provided

5. Set up your database with information from your .env and then run the following to create your database, migrate, and seed:
    * `npx dotenv sequelize db:migrate`
    * `npx dotenv sequelize-cli db:seed:all`


6. Start the app for backend by cd into `backend` using:
    * `npm start`

7. Start the app for frontend by cd into `frontend` and running:
    * `npm start`

8. Now you can use the `Demo User` button to log in or Create an account

***

# Features

## Spot
Logged-in Users can
* add a spot
* read/view other user's spots
* update their spots
* delete their spots

## Booking
Logged-in Users can
* create a reservation
* read/view previous reservation
* update their reservations
* delete their reservations

## Comments
Logged-in Users can
* post a comment for a spot under the spot detail page
* read/view other users' comments under spot detail page
* delete a comment posted by the logged-in user

