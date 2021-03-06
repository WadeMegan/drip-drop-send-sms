# Drip Drop Send SMS

## Use

This repository was built for use with drip-drop-client ([repo](https://github.com/WadeMegan/drip-drop)/[live app](https://drip-drop.now.sh/)) and drip-drop-api ([repo](https://github.com/WadeMegan/drip-drop-api)). It is used, in conjunction with Heroku's Scheduler, to send sms messages to users. 
  
## How It Works

drip-drop-send-sms is built using Node.js. The file send-sms.js uses the node-fetch package to make a GET request to the Drip Drop API sms endpoint. It then iterates through the sms list to check if the reminder date is equal to the current date. If so, it uses the Twilio API to send a reminder message to the user. If a text is sent, the reminder date is updated so that the user will recieve another message when the plant needs to be watered again. 

The send-sms.js file is not loaded within any of the three Drip Drop repositories. Rather, the repository is deployed on Heroku and is run using Heroku's scheduler add-on. Heroku Scheduler can be used to run jobs at a scheduled time interval (learn more about Heroku Scheduler [here](https://devcenter.heroku.com/articles/scheduler)). The send-sms.js file is set up to be run, with the `node send-sms.js` command, once per day at 10:00 AM UTC, as can be seen in the image below. 

![heroku scheduler](https://i.imgur.com/OopSgUr.png)

## The Drip Drop Project

### Live App

A live version of the app can be accessed [here](https://drip-drop.now.sh/).

To demo Drip Drop, log in with:
* Email: test@gmail.com
* Password: password

### Summary

Drip Drop is a web application that reminds users to water their houseplants. Users can select the plants they have from a list of common houseplants. Each day, Drip Drop will check to see if any of the user's plants will need to be watered. If so, Drip Drop will send the user a sms message as a reminder. The goal of Drip Drop is to make it easier for users to remember when they should be watering their plants, in order to prevent fewer houseplant deaths caused by over or under watering.

### Technologies Used

#### Front End:
* ReactJS
* jQuery
* HTML
* CSS

#### Back End:
* Node.js
* Express
* PostgreSQL

#### APIs:
* Twilio
* Drip Drop API ([documentation](https://github.com/WadeMegan/drip-drop-api))