![Logo of the project](./logo.sample.png)

# Gig-aware
> Yelp for the working musician

Community-driven site committed to providing working musicians free access to information on local venues and potential spots for gigs. The idea is to give local musicians/DJs information on places where they might find gigs, along with information an ratings on the venue for pay, behavior, atmosphere etc. 

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

**installation**
```
git clone https://github.com/rdhenderson/project-3.git  
cd project-3
npm install
```
**development**
*NOTE: This process will be simplified once concurrently or grunt is set up to run both commands
```
npm run start & nodemon server.js
```
The npm start script will create a webpack dev server that will compile the bundle.js file and update that file on changes.  Nodemon will run the express server and restart the server on file changes. If you encounter any issues, run each command in a separate terminal window (until grunt or concurrently is set up). 

## Developing

Initial Development Goals: 
1) Venue listing and creation with authenticated users. 
  - Rating/reporting system for gigs played at a venue showing synthesized data
  - Add functionality for moderators/admin users
2) Gig-finder listing/notification service
3) Venues that similar bands have played search functionality
4) Additional Feature Ideas
  - Allow fans to sign up for notification of a band/gig (and venue to see number of fans? with comparison actual turnout?)
  - Allow venues to rate/recommend musicians that drew a big crowd

### Front-End
Peter and Benga
First Sprint: Build HTML for each view.  Barebones by Saturday. 

### Back-End
Reid and Joe
First Sprint: Set up database models for Venue, Artist, Band (peter) Dummy data and routes to display and edit on test page (Reid) by Saturday. User model and login. 

### Built With
ReactJS  
Redux  
Express  
MongoJS and Mongoose  


### Prerequisites
What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links.


### Setting up Dev

See Getting Started above. 

### Building

See Getting Started above. 

### Deploying / Publishing
give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```
npm run build
```

And again you'd need to tell what the previous code actually does.

## Versioning

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).


## Configuration

Here you should write what are all of the configurations a user can enter when
using the project.

## Tests

Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
Give an example
```

## Style guide

Explain your code style and show how to check it.

## Api Reference

If the api is external, link to api documentation. If not describe your api including authentication methods as well as explaining all the endpoints with their required parameters.
### Routes
*This is a draft structure. Update as additional routes determined.*

#### Venue Routes
1. GET
  - /api/venues (array of all venues)
  - /api/venues/:id (specific venue)
  - /api/venues/:id/artists (all artists who have played venue)
  - /api/venues/:id/artists/:id (all events played at specified venue by specified artist)
2. POST
  - /api/venues (add a venue to system)  
#### Artist Routes
1. GET
  - /api/artists (array of all artists)
  - /api/artists/:id (specific artist)
  - /api/artists/:id/venues (all venues played by specified artist)
  - /api/artists/:id/venues/:id (all events played at specified venue by specified artist [duplicated for ease of use]
2. POST 
  - /api/artists (add an artist to the system)
  
## Views

### Splash
  - Logo
  - Login buttons (guest, musician, venue)
  - Modal for Sign-up/Register
### Main
  - Navbar
  - Logo
  - Searchbar
  - Local Population
### Create User
  - Photo
  - Input fields
  - Submit
### Create Venue/ Band
  - Photo
  - Parameters
  - Submit Button
### Gigs
  - Navbar
  - Filtration
  - Results
### Profile
  - Photo
  - Stars
  - name
  - Scoring Div
  - Events Div
  - Members module


## Database

### Models
*This is a draft structure. Update as additional fields determined.*
#### User
  - Name
  - Status: (new, verified, moderator)
  - Role: (musician, venue)
  - Profile: (link to musician/venue profile page) //TODO: Decide how to structure
#### Venue
  - Name
  - Address
  - Capacity
  - Events: [Array of event links]
  - Reviews: [array of review ids]
  - Link to User if established
#### Musician
  - Name
  - Profile
  - Events: [Array of event links]
  - Reviews: [array of review ids]
  - User ID (link)
#### Events
  - Venue
  - Musician
  - Date
  - Reviews
#### Reviews
  - Title
  - Body
  - Venue (link)
  - Musician (link)
  - User (link)

## Licensing

State what the license is and how to find the text version of the license.
