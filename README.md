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

  Tutorial 
  
  Some function
  
## API Reference

  * set (selector, value) 
	
  * set ({
	selector1: value1,
	selector2: value2,
	selector3: value3
  })	
	
  * click(selector)
	
  * click([ selector1, selector2, selector3 ])
	
  * press(key.keyName)

    key = {
        'NULL': '\uE000',
        'Cancel': '\uE001',
        'Help': '\uE002',
        'Back space': '\uE003',
        'Tab': '\uE004',
        'Clear': '\uE005',
        'Return': '\uE006',
        'Enter': '\uE007',
        'Shift': '\uE008',
        'Control': '\uE009',
        'Alt': '\uE00A',
        'Pause': '\uE00B',
        'Escape': '\uE00C',
        'Space': '\uE00D',
        'Pageup': '\uE00E',
        'Pagedown': '\uE00F',
        'End': '\uE010',
        'Home': '\uE011',
        'Left arrow': '\uE012',
        'Up arrow': '\uE013',
        'Right arrow': '\uE014',
        'Down arrow': '\uE015',
        'Insert': '\uE016',
        'Delete': '\uE017',
        'Semicolon': '\uE018',
        'Equals': '\uE019',
        'Numpad 0': '\uE01A',
        'Numpad 1': '\uE01B',
        'Numpad 2': '\uE01C',
        'Numpad 3': '\uE01D',
        'Numpad 4': '\uE01E',
        'Numpad 5': '\uE01F',
        'Numpad 6': '\uE020',
        'Numpad 7': '\uE021',
        'Numpad 8': '\uE022',
        'Numpad 9': '\uE023',
        'Multiply': '\uE024',
        'Add': '\uE025',
        'Separator': '\uE026',
        'Subtract': '\uE027',
        'Decimal': '\uE028',
        'Divide': '\uE029',
        'F1': '\uE031',
        'F2': '\uE032',
        'F3': '\uE033',
        'F4': '\uE034',
        'F5': '\uE035',
        'F6': '\uE036',
        'F7': '\uE037',
        'F8': '\uE038',
        'F9': '\uE039',
        'F10': '\uE03A',
        'F11': '\uE03B',
        'F12': '\uE03C',
        'Command': '\uE03D',
        'Meta': '\uE03D'
    }

  * submit
	 
  * select
	
  * wait	
  
  * Write your function
   
  
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