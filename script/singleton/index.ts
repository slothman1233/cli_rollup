
var getSingle = (fn:Function)=>{
    var result:any
    return function(name?:String){
        fn.call(this,name)
    }
}

var getName = function(name:String){
    console.log(name);
}


export{
    getSingle,
    getName
}