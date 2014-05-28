// TEST CONFIGURATION
config = { 
    project :  'Stepping-Cloud',      
    test    :  'General Api',         
    url     :  'http://192.168.2.134/sample/',
    timeout :  99999999,   
    browser :  'chrome',       
    step    :  ['expect','click','set','key','submit'],
    module  :  ['auth','resellers','customers','people','search']
} 

