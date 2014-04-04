// Copyright © 2014 Swiss IT Bridge
// Author: Nguyen Trung Loi (loi.nguyen)
// Maintain by loi.nguyen and ha.tran

// CONFIG TEST
config.project = 'Orca'
config.test = 'Sample Test'
config.url = 'http://192.168.2.55/login'
config.timeout = 99999999
config.browser = 'chrome'
// ['goto','remove','register','test','click','set','key'] 
config.step = ['goto','remove','register','test','click','set','key'] 
  
// TEST CASE
test.start = function() {    
    title('Login für');   
    set({'#username':'orca.expert', '#password':'123456@A'}); 
    press(key.Enter); 
    set({'#inquiry_question':'Sample Frage', '#inquiry_created_date':'16.04.2014'}); 
    click('body');      
    set({'#inquiry_agentid':'loi'}); 
    wait(500); 
    press(key.Enter);   
    set({  
        '#inquiry_last_date':'16.04.2014', 
        '#inquiry_department':'abcd', 
        '#inquiry_customer_number':'123456' 
    });  
    click([ '#inquiry_ada','#inquiry_ada option:nth-child(2)','body',
            '#inquiry_cpe_product option:nth-child(2)','#inquiry_skill_0',
            '#inquiry_skill_1','#inquiry_skill_2','#inquiry_applied_expertise', 
            '#inquiry_applied_expertise option:nth-child(2)','body','#inquiry_chanels_0',
            '#inquiry_chanels_1','#inquiry_chanels_2','#inquiry_chanels_3']);         
    press(key.Enter);     
    done();
};