# StudyBuddy

> A Vue.js project

## Node.js installation 
Vue.js relies on Node.js and npm. Installing Node.js will automatically install npm onto your system.
To check the version of npm & Node.js, open a shell/command prompt enter the following commands, and ensure you have the following software versions:
```
$ node -v
v10.21.0 (or higher)

$ npm -v
6.14.4 (or higher)
```

Previous versions may also work, but there may also be unforeseen issues. Node.js download link if Node.js is not on your system or if the version is inadequate: 
https://nodejs.org/en/download/ 

For Windows or Mac, select the installers and when prompted, add to PATH. 

## Vue.js Installation

Now, node and npm should be on your system and the commands above should work.

Install the command line interface (CLI) for Vue: 
```
$ npm install -g @vue/cli
```

Install the init add-on for vue-cli: 
```
$ npm install -g @vue/cli-init
```

## Running the Alpha System

Navigate to the StudyBuddy directory and enter the following commands.

First, install dependencies:
```
$ npm install
```

Then, start the application on port 8080:
```
$ npm run dev
```

The application should automatically open your browser on http://localhost:8080 (if you have no tasks running on port 8080 prior) and you should be greeted with the following interface:
![image](https://github.com/mattlitwiller/StudyBuddy/assets/77696677/06dcb021-5d24-44eb-9b0f-22545354156e)


