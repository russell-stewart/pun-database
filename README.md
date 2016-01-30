#pun-database  
_a web api and database where users can write, review, and star puns_  

##address
to visit the api when it's set up, go to:  
(host ip address):8001/pun-database

##api GET endpoints  
###1. /   
  the home address for the api. It says welcome, but doesn't do much else.
###2. /byid  
  get a pun based on its unique tracking id (an integer)  
  _queries_  
  * id: the id for the pun you're searching for   
###3. /random  
  sends you a random pun. simple as that. what could be more entertaining?  
###4. /bytag  
  get puns about a specific topic by finding puns marked with a tag  
  _queries_  
  * tag: the tag (topic) of the pun you're searching for  
###5. /best  
  _in development. not implemented._  
  gets all puns, sorted by their rating, best first.  
###6. /worst  
_in development. not implemented._  
gets all puns, sorted by their rating, worst first. if you're into that kinda stuff.  

##api POST endpoints  
###1. 
