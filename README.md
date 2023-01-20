# BITS Blockchain dev Recruitment task

## Atom
Atom is a web application as the result of the recruitment task for BITS Blockchain. <br><br>
As far as the webpage is concerned it includes the title, a brief description of the task and 
provides the user with the option to either enter in a new question or generate a question paper of 5 questions<br><br> 

<ol>
  <li> Button 1:- Allows the professor to connect the metamask wallet
  <li> Button 2:- Provides the user(professor) with a place holder of "Add the questions that you would like on the test"
  <li> Button 3:- Displays the set of 5 random question
    </ol>
    
In my Solidity contract, I am creating a function that takes a string as an input and stores it in a variable, and another function that returns the stored string as a JSON string<br><br>

In the web application, I am using JavaScript web3 library to interact with the smart contract and call the above two functions<br><br>

To display randomly selected strings from the data, I will use the JSON string retrieved from the smart contract and parse it using the JSON.parse() method, then select random elements from the array of objects.

I will also try to add a sort of pop up to ask the individual if he or she is a professor or a student so that after connecting the metamask wallet, the "Add questions that you would like on the test" button turns grey and stops working if a student is the one that is accessing the application

      

