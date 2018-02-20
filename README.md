# Description
This project uses a genetic algorithm to search for a given solution string. 

## Requirements
This project requires the following applications be installed:
1. ```node + npm``` - Node.js 
2. ```gulp``` - Gulp.js
3. ```ng``` - Angular CLI

## Getting started - Command Line
1. Clone the repository
2. Open a command window inside the ${projectRoot}/genetic-algorithm folder 
3. Run ```npm install```
4. Run ```gulp build; gulp start```

If you would like to change the default ```solution``` string, open ```genetic-algorithm/main.ts``` and modify the ```solution``` constant. 

After modifying any file, rebuild the project by running ```gulp build; gulp start``` in the project root.

## Getting started - Angular
1. Clone the repository
2. Open a command window inside the ${projectRoot}/genetic-algorithm-client folder 
3. Run ```npm install```
4. Run ```npm start```
5. Open browser and navigate to http://localhost:4200

## The Genetic Algorithm
You can find the genetic algorithm implementation in the ```genetic-algorithm``` directory. 

## The Web Worker
You can find the web worker implementation in the ```genetic-algorithm-client/src/app/workers``` directory.