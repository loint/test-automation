Test Automation for Nodejs
===============

## Installation

  Install with the Node.JS package manager [npm](http://npmjs.org/):

      $ npm install mocha chai webdriverjs phantomjs
	  
  Download latest chrome driver version at :
  
  http://chromedriver.storage.googleapis.com/index.html
	  
  Download selenium server standalone at :
  
  https://selenium.googlecode.com/files/selenium-server-standalone-2.39.0.jar
	  
  Put chromedriver.exe into system32 folder and selenium server in your folder.

## Documentation

  Tutorial 
  
  Some function
  
## API Reference

  * set (selector, value) - set a value for selector

  * set ({                - set multi value for multi selector in the sequence
	selector1: value1,
	selector2: value2,
	selector3: value3
    })	
	
  * click (selector)     - mouse click to a selector
	
  * click ([ selector1, selector2, selector3 ]) - mouse click to multi selector in the sequence
	
  * press(key.keyName) - press a key in keyboard

    keyName = [ NULL, Cancel, Help, Back space, Tab, Clear, Return, Enter, Shift, Control, Alt, Pause, Escape, Space, Pageup, Pagedown, End, Home, Left arrow, Up arrow, Right arrow, Down arrow, Insert, Delete, Semicolon, Equals, Numpad 0, Numpad 1, Numpad 2, Numpad 3, Numpad 4, Numpad 5, Numpad 6, Numpad 7, Numpad 8, Numpad 9, Multiply, Add, Separator, Subtract, Decimal, Divide, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, Command, Meta ]

  * submit (selector)  - submit a form which has the selector
	 
  * select (selector, order) - select option order which selec tag has selector 
	
  * wait (seconds) - wait for ajax or action which need a more time.	
 
  * load (function) - load a asynchronous function as synchronous function, when the asynchronous task is finished, you call next function to go to the next task. 
  
  * next () - call to excute next task  
   
  
## Sample Test
  
	// CONFIG TEST
	config.project = 'Orca'
	config.test = 'Add an inquiry'
	config.url = 'http://192.168.2.55/login'
	config.timeout = 99999999 
	config.browser = 'chrome'    
	// ['goto','remove','register','expect','test','click','set','key'] 
	config.step = ['expect','click','set','key']   
   
	// TEST CASE   
	test.$1 = function() {   
		title('Login für');       
		set({'#username':'orca.expert', '#password':'123456@A'}) 
		press(key.Enter)
	}  

	test.$2 = function() {
		set({'#inquiry_question':'Sample Frage', '#inquiry_created_date':'16.04.2014'})
		click('body')
		set({'#inquiry_agentid':'loi'}) 
		wait(500)
		press(key.Enter)
		set({'#inquiry_last_date':'16.04.2014'})
	}  
  
  
## Running the Tests

  Open cmd window and run selenium before you test
	
	  $ java -jar your folder/selenium-server-standalone-2.39.0.jar
  
  Run mocha to do test
	
      $ mocha
 
## License
  MIT license. See the LICENSE file for details.