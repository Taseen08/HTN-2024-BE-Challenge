# Hack the North 2024 Backend challenge

Hello! Thank you for inviting me to take the HTN backend challenge. I honestly enjoyed working on it. This is my submission!

## Overview

- REST API service built using Node-Express-TypeScript
- PostgreSQL database (uses standard 'postgres' docker image) with Sequelize as the ORM
- Both API and database are containerized using Docker

## Pre-requisites

Please have these installed before running the application:

- Docker (Docker Desktop)
- Postman (The collection is in the `postman` folder. Please use the json to import the collection into your Postman workspace. The collection contains all the API requests of the challenge.)

## Setup

Clone the repository

```bash
git clone https://github.com/Taseen08/HTN-2024-BE-Challenge.git
```

Install packages

```bash
npm install
```

Build docker image and run the containers

```bash
docker-compose up
```

Wait for the `Server is running on port 8000` log message. Once the containers are running, the API should be ready. Please use the `/health` endpoint to test the server.

Right now, the database is initialized but it doesn't have the table(s) and user profile data. Please run the following command to run database migrations that would create the tables:

```bash
npm run migrate
```

Now that the database tables are created, we would need to populate the database with the user profiles data. I have downloaded and kept the user profiles json file under `src/data`. To seed the database tables with the data, please make the **`Populate User Profiles`** request on Postman which makes an API call to the `POST http://localhost:8000/setup/import-data` endpoint.

That concludes the setup, the application is now ready to test on the desired endpoints!

## Endpoints

I would highly recommend to use the Postman collection to test the API endpoints.

#### All Users Endpoint

Use the **`Fetch All Users`** request which calls the `GET http://localhost:8000/users/` endpoint.

Sample `<200>` response:

```bash
[
    {
        "name": "Breanna Dillon",
        "company": "Jackson Ltd",
        "email": "lorettabrown@example.net",
        "phone": "+1-924-116-7963",
        "skills": [
            {
                "skill": "Swift",
                "rating": 4
            },
            {
                "skill": "OpenCV",
                "rating": 1
            }
        ]
    },
    .
    .
    .
]
```

#### Single User Endpoint

Use the **`Fetch User`** request which calls the `GET http://localhost:8000/users/<userId>` endpoint.

Sample `<200>` response:

```bash
{
    "name": "Darrell Alvarez",
    "company": "English, Bell and Schneider",
    "email": "jrodriguez@example.net",
    "phone": "001-390-080-0363x28486",
    "skills": [
        {
            "skill": "Element UI",
            "rating": 1
        },
        {
            "skill": "Bokeh",
            "rating": 2
        },
        {
            "skill": "Aurelia",
            "rating": 2
        },
        {
            "skill": "Lisp",
            "rating": 2
        }
    ]
}
```

#### Update User Endpoint

Use the **`Update User`** request which calls the `POST http://localhost:8000/users/<userId>` endpoint.

This request needs a body for the update information. The body contains user data (possibly partial) that gets updated.

Sample body:

```json
{
  "phone": "+1 (525) 123 4567",
  "company": "Google",
  "skills": [
    {
      "skill": "C++",
      "rating": 1
    },
    {
      "skill": "Swift",
      "rating": 9
    }
  ]
}
```

Sample `<200>` response:

```bash
{
    "name": "Darrell Alvarez",
    "company": "Google",
    "email": "jrodriguez@example.net",
    "phone": "+1 (525) 123 4567",
    "skills": [
        {
            "skill": "Swift",
            "rating": 9
        },
        {
            "skill": "Element UI",
            "rating": 1
        },
        {
            "skill": "C++",
            "rating": 1
        },
        {
            "skill": "Bokeh",
            "rating": 2
        },
        {
            "skill": "Aurelia",
            "rating": 2
        },
        {
            "skill": "Lisp",
            "rating": 2
        }
    ]
}
```

#### Skills Endpoint

Use the **`Fetch Skills`** request which calls the `GET http://localhost:8000/skills/?min_frequency=<min>&max_frequency=<max>` endpoint.

Sample `<200>` response (with 35-38 min and max range):

```bash
[
    {
        "skill": "Scheme",
        "frequency": 37
    },
    {
        "skill": "Sed",
        "frequency": 35
    },
    {
        "skill": "Unreal Engine",
        "frequency": 37
    },
    {
        "skill": "Angular",
        "frequency": 37
    },
    {
        "skill": "Ant Design",
        "frequency": 36
    },
    {
        "skill": "Django",
        "frequency": 37
    },
    {
        "skill": "R",
        "frequency": 36
    },
    {
        "skill": "Visual Basic",
        "frequency": 37
    }
]
```

**Note**: That concludes all the basic endpoints that were required in the challenge.

## Bonus

Overview:

- Team matching system that takes a skill and team size and tries to match hackers to form a team
- User check-in endpoint via internal dashboard and QR Scan.
- Hardware device lending system endpoints

#### Team Matching Endpoint

Use the **`Team Matching`** request which calls the `GET http://localhost:8000/skills/<skillid>/team-match?teamsize=<size>` endpoint.

Sample `<200>` response (with `Python` and team size `5`):

```text
Hackers (100, 132, 198, 209, 271) would make a great team with common skill in Python
```

#### User Check-in Endpoint

Use the **`Check In User`** request which calls the `GET http://localhost:8000/users/<userId>/check-in` endpoint.

Sample body:

```json
{
  "source": "dashboard", // or "scan"
  "notes": "First user check in."
}
```

Sample `<200>` response:

```bash
Hacker Natasha Davis was already checked in to HTN 2024!
```

#### Device Setup Endpoint (Pre-requisite for the device borrowing endpoints below)

Use the **`Register Devices`** request which calls the `POST http://localhost:8000/setup/register-devices` endpoint. It uses a `JSON` file to populate the database with some hardware devices.

Sample `<200>` response:

```bash
Devices registered successfully.
```

#### Borrow Device Endpoint

Use the **`Borrow Device`** request which calls the `POST http://localhost:8000/device/borrow` endpoint.

Sample body:

```json
{
  "userId": 566,
  "deviceId": "TBL-112233"
}
```

Sample `<200>` response:

```bash
Device TBL-112233 is successfully lend to hacker Eric Gibson!
```

#### Return Device Endpoint

Use the **`Return Device`** request which calls the `POST http://localhost:8000/device/return` endpoint.

Sample body:

```json
{
  "userId": 566,
  "deviceId": "TBL-112233"
}
```

Sample `<200>` response:

```bash
Device returned successfully!
```

**Note:** This concludes the bonus implementations of the challenge. I wanted to extend it more by adding helper endpoints to the user check-in and device lending process for internal tools but couldn't push for it in the interest of time.

## Implementation Insights

Database tables:

- `users` - Holds the user profile data.
- `skills` - Stores the unique skills across the entire hacker pool.
- `user_skills` - Association table between users and skills. Users and skills have a many-to-many relationship.
- `devices` - Stores registered devices at the hackathon.
- `borrowed_devices` - Association table between users and devices which keeps track of devices being borrowed and returned by users.
- `user_checkins` - Records event check-ins for hackers.

**Note**: Since this is just a challenge, for the ease of testing by the reviewing team, I left the `.env` and other configuration files exposed instead of following best practices.
