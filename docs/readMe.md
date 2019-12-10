# Prince George’s County Health Finder 
 
PGHF has been designed to facilitate the user’s ability to locate medical services in Prince George’s County, Maryland. 
 
Created by Information Science students at the University of Maryland, College Park, the design of PGHF took into account the great deal of tourism and visitors that Prince George’s county experiences on a daily basis. With such a great deal of out-of-county individuals spending time in PG County, finding things such a medical services can be difficult.  
 
PGHF allows a user to input an address, which could be their current location, or that of their work or school. The app then returns a map view of their location and the closest hospital, along with the contact information of that hospital. 
 
**Link to PGHF:** http://i377project.herokuapp.com/
 
**User Manual:** (docs/user.md)
 
# Deveveloper's Guide

**Install**

PGHF requires Node.js, Express, and SQLite3. Install through command line before proceeding. 
Installing PGHF is as easing as pulling the repository from Github. https://github.com/michaeloduyebo/377Project 

**Running the Application**

To run the application, launch the website http://i377project.herokuapp.com/ .

This is the website for PGHF. There are sections for the home page, documentation page, the about page, and lastly a contact us page in case a user runs into any problems. Right below the about section of the site is the map from Leaflet that displays a pin of where the closest hospital is after typing in an address.

**Endpoints**

GET - retrieves json data from PG county Open Data API 

POST - stores data in remote SQLite database 

PUT - sends data to the front end 

**Expectations**

Current Bugs: 

⋅⋅*  Loading in JSON data into SQLite
⋅⋅*  Querying SQLite database for values equal to a variable

Future Work: 

⋅⋅* Set to return all hospitals first, before beginning to try to return specific ones
⋅⋅*  In beginning stages, load data directly into server rather than remote location in order to streamline your coding prcoess. Then begin experimenting with remote storage. 

