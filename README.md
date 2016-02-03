#pun-database  
_a web api and database where users can write, review, and star puns_  

##address
to visit the api when it's set up, go to:  
(host ip address):```8001/pun-database```

##api ```GET``` endpoints  
###1. ```/```   
  the home address for the api. It says welcome, but doesn't do much else.
###2. ```/byid```  
  get a pun based on its unique tracking id (an integer)  
  _queries_  

  * ```id```: the id for the pun you're searching for  

###3. ```/random```  
  sends you a random pun. simple as that. what could be more entertaining?  
###4. ```/bytag```  
  get puns about a specific topic by finding puns marked with a tag  
  _queries_  

  * ```tag```: the tag (topic) of the pun you're searching for  

###5. ```/best```   
  gets all puns, sorted by their rating, best first.  
###6. ```/worst```    
  gets all puns, sorted by their rating, worst first. if you're into that kinda stuff.  
###7. ```/readreviews```  
  read all reviews for a single pun if you know its id  
  _body keys/values_  

  * ```id```: the id of the pun you're searching for  

##api ```POST``` endpoints  
###1. ```/newpun```  
you guessed it. this is how to post a new pun to the database.
_body keys/values_

* ```pun```: the text of your pun.  
* ```tags```: a string of words each separated by ", " that help sort your pun with similar puns. for example: a pun about cats and cupcakes could be tagged "cats, cupcakes".

###2. ```/review```  
like would seem logical, one can submit a review for a pun using this endpoint.  
_body key/values_  

* ```id```: the id of the pun you are reviewing. a pun's id is an integer found in the pun json object.  
* ```review```: the text of your review for the specified pun.  
* ```name```: the name people will see with your review.  

##api ```PUT``` endpoints  
###1. ```/vote```  
add a review (somewhere between one and five stars) to a pun.  
_body key/values_  

* ```id```: the pun's id that you want to review. see /review for more details on pun ids.  
* ```rating```: your vote on how good the pun is. should be an an integer on (1,5).  
  
  
  
  
_russell stewart and sarah levy_  
_advanced topics computer science 2016_  
_web api/database project_  
_what do you call an elephant pun that doesn't belong at the end of a README? irrelephant!!!_
