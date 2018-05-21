# Udacity React: Readable Project
The project is one that shows the complexity of React and Redux, and the site that is built is one similar to that of Reddit where you can vote, post, and comment on a number of things. Instructions are given for Macs and its terminal, so other machines do adjust accordingly. Current Mac version: 10.13.1.


## Up and Running
### Git
Pull down the repository to your machine via terminal: 
_**git clone git@github.com:vandoan/readable.git**_

Then, go into the folder:
_**cd readable**_

### Server and Front End
The code breaks down into two components: the server and front end. The front end needs the server to be running in order for the site to work. 
First, get the server running.

#### Server 
From the top of the folder (/readable), move into the api-server folder:
_**cd api-server**_

Then, run the initial install: 
_**npm install**_

Finally, run the server! Viola: 
_**node server**_

Now, if you go to http://localhost:3001/, all the different requests for the server are displayed.


#### Front End
Switching gears, move into the frontend directory. Because the current terminal window is occupied with the server, open a new window: 
_**cmd + t**_

Back up a directory and then into the frontend: 
_**cd ../frontend**_

Run the initial install: 
_**npm install**_

Lastly, start the project:
_**npm start**_


 You're now good to go. 