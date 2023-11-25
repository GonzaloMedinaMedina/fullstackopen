const mongoose = require('mongoose')

if (process.argv.length<3) 
{
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newPhone = process.argv[4]

const url = `mongodb+srv://gonzalomedinamedina:${password}@phonebook.6zqewjh.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url, {dbName: 'phonebook'})


//Schema for contact person
const Person = new mongoose.Schema({
  name: String,
  number: String,
})

const PersonModel = mongoose.model('Person', Person)

if (newName === undefined && newPhone === undefined)
{
  PersonModel.find({}).then(result => 
  {
    if (result.errors === undefined)
    {
      console.log('phonebook:')
      result.forEach(person => 
      {
        console.log(`${person.name} ${person.number}`)
      })
    }
  mongoose.connection.close()
  })
}
else
{
  const person = new PersonModel({
    name: newName,
    number: newPhone
  })

  person.save().then(result => {
    if(result.errors === undefined)
      console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}