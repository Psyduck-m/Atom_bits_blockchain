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
    
In my Solidity contract, I have created a struct that is able to hold a message(string) an address and a timestamp and have made an array of that struct such that anyone who enters their message and hit enter their message would get stored in the array along with their address and the timestamp<br><br>

In the web application, I am using JavaScript web3 library to interact with the smart contract and call the above two functions<br><br>

The Get Questions button displays 5 randomly selected questions, I have already added a few questions on the testnet such that there should be enough questions to be displayed on the screen



The file structure of the repository would be such that:
Along with the Readme file the home page would consist of two folders one that would include all the packages and the solidity code for the contract side and the other that would include all the javascript and the front end files together<br><br>

The bash.sh file contains commands that would take you to the Atom directory and then run the command npm run dev which should give out the link that would direct you to the window where the entire project is being hosted in your system, there may be an initial page about warnings and errors, kindly ignore that and click on the grey area<br><br>
However if the bash file does not work, kindly use this link https://atom.psyduck-m.repl.co/ to reach to the project

      

