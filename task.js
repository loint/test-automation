test.start = function() {  
    title('Login');         
    set({'#username':'sample', '#password':'12345'}); 
    submit('.form-horizontal');   
    set({'#question':'Sample Frage', '#date':'16.04.2014'}); 
    click('body');        
    set({'#idname':'sample name'});
    click('body');   
    set({  
        '#last_date':'16.04.2014', 
        '#customer':'abcd', 
        '#tax':'123456' 
    });  
    click(['#button1','#select option:nth-child(2)','body']);         
    done();                  
};        