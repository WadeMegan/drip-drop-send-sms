require('dotenv').config()

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require('./config')

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

const fetch = require('node-fetch')

function callback(reminder){
    
    let unformattedDate = new Date()
    
    let currentDate = unformattedDate.toISOString().split('T')[0]
    
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

fetch('https://desolate-oasis-71104.herokuapp.com/api/sms')
    .then((res)=> {return res.json()})
    .then((json)=>{
        json.map(reminder=>callback(reminder))
    })
    .catch((err)=>console.log(err))


