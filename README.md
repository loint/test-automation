Test Automation for Nodejs
===============

## Installation

  Install with the Node.JS package manager [npm](http://npmjs.org/):

      $ npm install mocha chai grunt webdriverjs phantomjs
	  
  Download latest chrome driver version at :
  
  http://chromedriver.storage.googleapis.com/index.html
	  
  Download selenium server standardlone at :
  
  https://selenium.googlecode.com/files/selenium-server-standalone-2.39.0.jar
	  
  Put chromedriver.exe into system32 folder and selenium server in your folder.

## Documentation

  ### Tutorial 
  
  ###API Reference

	1. set ('selector', 'value') 
	
	2. set ({
		selector1: 'value1',
		selector2: 'value2',
		selector3: 'value3'
	})	
	
	3. click('selector')
	
	4. click([ 'selector1', 'selector2', 'selector3' ])
	
    press
	
    submit
	
	select
	
	wait	
  
  ### Write your function
   
  
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