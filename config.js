// TEST CONFIGURATION
config = { 
    project :  'Stepping-Cloud',       
    test    :  'General Api',         
    timeout :  99999999, 
    speed   :  50,    
    browser :  'chrome',        
    step    :  ['expect','click','set','key','submit'],   
    ignore  :  [   
        'sample>auth>customers',   
        'sample>auth>people',
        'sample>auth>search' 
    ],       
    flow :  {
        sample: {
            auth : {    
                model: ['account'],    
                action: '',    
                resellers: {                
                    get_all: { 
                        
                    },
                    get_one: {
                    
                    },
                    create: {
                    
                    },
                    update: {
                        
                    },
                    partly_update: {
                    
                    },  
                    delete: {
                    
                    }
                },
                customers : {
                
                },
                people:{
                 
                },
                search:{
                
                }
            }
        },
        
        app: {
            
        }
    }
} 

