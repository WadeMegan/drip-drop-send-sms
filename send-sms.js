require('dotenv').config()
const fetch = require('node-fetch')

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require('./config')

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID //set in heroku 
const authToken = process.env.TWILIO_AUTH_TOKEN //set in heroku
const client = require('twilio')(accountSid, authToken)


function callback(reminder){
    let unformattedDate = new Date()
    
    let currentDate = unformattedDate.toISOString().split('T')[0]
    
    // checking if the date of the reminder is equal to today's date, and if it is, will send sms and update the reminder date
    if(reminder.reminder_date == currentDate){
        
        client.messages
            .create({
                body: `Don't forget to water your ${reminder.plant_name} today!`,
                from: '+19253612644', //E.164 formatting
                to: `+1${reminder.phone_number}`
            })
            .then(message => console.log(message.sid))
        
        
        newWateringDate = new Date(new Date().getTime()+(reminder.water_every*24*60*60*1000)).toISOString().split('T')[0]

        reminderId = reminder.reminder_id
        
        // making a patch request to the Drip Drop API's reminder endpoint to update the remind_on date of the reminder
        // Ex. if the plant needs to be watered every 3 days, the new remind_on date will be 3 days from the current date. This ensures that in 3 days, another sms will be sent.
        fetch(`https://desolate-oasis-71104.herokuapp.com/api/reminders/${reminderId}`,{
            method: 'PATCH',
            body: JSON.stringify({
                'remind_on': `${newWateringDate}`
            }),
            headers: {
                "Content-type":"application/json"
            }
        })
            .then(response=>response.json())
            .then(json=>console.log(json))
            .catch((err)=>console.log(err))
    }

}

// makes get request to the Drip Drop API's sms endpoint to get list of reminders 
// reminders returned from the sms endpoint also contain information necessary for sending sms messages
fetch('https://desolate-oasis-71104.herokuapp.com/api/sms')
    .then((res)=> {return res.json()})
    .then((json)=>{
        json.map(reminder=>callback(reminder))
    })
    .catch((err)=>console.log(err))


