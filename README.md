# ⚔ Welcome to the Quest !!! ⚔

             .--                                   .--
           .(   )                              .- ( . )
          (   .  )                            (   (  . `)
         (  (   ))                           (  (   )  ) )
          `- __.'                             (  (     ))
                              /\               `--.__.-'
                             /  \
                            /  \ \
                           / /    \                  ~~~~~~
                          /_   \  _\               ~(       )~
                           /      \               (       o   )
          __              /  /     \             (    o        )
        _/_ \            /_    \   _\             (       o   )
       /  \ =             /        \               (__     __)
      / .. \/            /  /    \  \                 \   /
      \ .. /            /_   /      _\        ~       |   |__(´)
      |\__/|=====>       /      \   \       (~~~)     |    __() )
     /======\           /  /  /   \  \     (     )    |   /   ``
       ) ) \           /______  ______\   (  (    )   |   |
      / / \ \                |  |         (     ) )   |   |
     / /   \ \      (^)      |  |   (^)    (  (  )    |   |    <@>
    (__^>  (__^>_____U_______|  |____u_______|/|_____/     \___\|/____

_________________________________________________________
## Table of contents
#### Intro: How to play
1. #### [The concept](https://github.com/OGsoundFX/DnD#1-the-concept)
2. #### The story
3. #### The Tools (NodeJs, ExpressJs)
4. #### The Database (MongoDB)
5. #### The graphics
6. #### The Game play
8. #### Todos
_________________________________________________________

## Intro: How to play

## 1. The concept

## 2. The story

## 3. The Tools (NodeJs, ExpressJs)

## 4. The Database (MongoDB)
** MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. **
https://www.mongodb.com/

### Setup the database:
**Mongoose** is a MongoDB object modeling tool. This will enable you to CRUD to your Mongo database.
*- Install Mongoose:*

``` $ npm install mongoose ```

Require the **mongoose** package where you need it like so:
```
const mongoose = require('mongoose');
```

*- Link your app to MongoDB:*

1. Create account on mongodb.com:
https://www.mongodb.com/ - automatic!
[mongodb](https://www.mongodb.com/)

2. Create Cluster:
Go into the Clusters menu and click on **Create new Cluster** in the upper right corner.
Follow the steps, chose your provider and region (I selected AWS - Frankfurt since I am in Germany), and finally chose your plan:
**M0 Sandbox** is free, but you can have only one. I linked several apps to the same cluster, but you will need a paid plan for professional use.
Then select your MongoDB version, you should probably go for the latest, I chose **MongoDB 4.4**
Finally select options you need, although these are not free. But you can skip them.
And finally find a name to your cluster.

3. Create your **database**
In the **collections** menu you can create a **DB** here. Name it what you want, you will need the name for the next step.

4. Connect Cluster to your Application
Once your cluster is created, you will find a **connect** button.
Select **connect your application**
Select the appropriate driver, for me it was **node.js** and the versions. ⚠️ I had to chose version **2.2.12 or later** for it to work ⚠️

5. Copy your **connection string** and replace <password> with the password for your user. Replace myFirstDatabase with the name of the database that connections will use by default.

Create a **config.js** file somewhere in your app and implement this:
```
module.exports = {

    getDbConnectionString: function() {
        return **ADD CONNECTION STRING HERE**;
    }

}
```
⚠️**PROTECT YOUR CREDENTIALS IN YOUR CONNECTIONG STRING IF YOU PUSH YOUR MAKE YOUR CODE OPEN SOURCE**⚠️

And finally don't forget to ``` const config = require('..PATH../dbconfig'); ```

### Databases, collections and documents:
These 3 elements are important parts of the MongoDB without them you are not able to store data on the MongoDB server. A Database contains a collection, and a collection contains documents and the documents contain data, they are related to each other.
![MongoDB-database-collection](https://user-images.githubusercontent.com/32952612/121663932-39065e80-caa7-11eb-8ec7-95b481544ad8.png)

### Let's add a database to the game:
We have previousely connected our MongoDB database to our application, we can now start creating some collections and storing information.
One of the most important information that I needed to store for The Quest, is player characteristics, inventory and login information in order for the player to progress in the game, and retrieve their character and keep playing at a later time.
For that we are going to create a **Schema**, a **Model**, and we are going to see how to store new characters in the database.

#### 1- The Schema and the Model:
You can refere to the **models** folder from my application, to get inspiration about where to place your models, but it is basically up to you. You just need t **export** yuor models, and **require** them when needed, from the right location.

The **Schema** is basically the structure of your document, including expected properties and values as well as constraints and indexes. The **Model** has the role of checking whether an entry matches the schema and record to the database.

Here how the **characterModel.js** looks like:

```
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema({
    charactername: String,
    magicWord: String,
    weapon: String,
    meal: String,
    direction: { type: String, default: "N" },
    level: { type: Number, default: 0 },
    strength: Number,
    agility: Number,
    chance: { type: Number, default: 0 },
    courage: { type: Number, default: 0 },
    life: { type: Number, default: 25 },
    maxLife: { type: Number, default: 25 },
    experience: { type: Number, default: 0},
    inventory: Array,
    coins: { type: Number, default: 0, min: 0 },
    food: { type: Number, default: 0, min: 0 },
    special: Array,
    counter: { type: Number, default: 0 },
    foundDungeon: { type: Boolean, default: false}
});

const Characters = mongoose.model('characters', characterSchema);

module.exports = Characters;
```
  
#### 2- Create your **collection** in the **DB**
Somewhere in your app (possibly a temporary file that you run just once) include the following code (using the example of my Character model above):

```
const Characters = require('../models/characterModel');
module.exports = function(app) {

   app.get('/api/setupDB', function(req, res) {
       var starterCharacters = [
           {
               charactername: 'Olivier',
               magicWord: 'magic',
               weapon: 'Sword',
               meal: 'potatoes',
               direction: 'N',
               strength: 25,
               agility: 15
           }
       ];
       Characters.create(starterCharacters, function(err, results) {
           res.send(results);
       });
   });
}
```
Here I created my **Characters collection** with the command **Characters.create()** with a fake character **starterCharacters**

#### 3- Recording new entries using The controller
A controller can be used for many things, but to put it simply, the controller is the link between the user's interaction and the application. The controller responds to the user input and performs interactions on the data model objects.

Here is my **characterController.js**:

```
const Character = require('../models/characterModel');
const ObjectId = require('mongodb').ObjectID;

module.exports = function(app) {

  app.post('/character', (req, res) => {
      const characterResponse = Object.keys(req.body)[0].split(",");
      const number = Math.floor(Math.random() * 11);
      const newCharacter = Character({
          charactername: characterResponse[0],
          magicWord: characterResponse[1],
          weapon: characterResponse[2],
          meal: characterResponse[3],
          level: 2,
          strength: 20 + number,
          agility: 20 - number,
          maxLife: 25
      });
      newCharacter.save(function(err, char) {
          if (err) throw err;
      });

      // the id is an Object and needs to be returned as a String with the mongodb ObjectId method
      const id = ObjectId(newCharacter._id).toString();
      setTimeout(function(){
        Character.find({ _id: id }, function(err, char) {
          if (err) throw err;
          res.render(`./story/forest`, { char: char[0] });
        });
      }, 300);
  });
}
```
**What happens here**:
Basically, a new user created their character through a html form, and the data is sent to a post request to the action **character** located in this controller (which is exported and can be required in my **index.js** file that manages all the routes and basci functionalities of the app).
First the model is fetched (line 1).

The data from the post request, the character information that the user has input, is processed here by extracting and converting the data from the body of the post request (**req.body**).

And finally the new character is created and stored based on the model. In my case, I store the name, magic word, weapon and favorite meal that the player has entered, and the strength and agility are randomly calculated according to a rule that you can easily figure out.

The final part (line 129), is just a redirection. But since I want the player characteristics to follow the player to the next step of the game, I need to load that specific player characteristics, and send them with the redirection.
To manipulate **Docuement Ids** you need the **ObjectId** which is a built in method from mongodb, that will convert the id of a document from an object to a string.

## 5. The graphics

## 6. The Game play

## 8. Todos
* Finish this Readme
* Finish Chapter One: The Forest
