

import * as index from "./index"
import {get,post} from "../../utils/fetch/fetch"


import "./index.less"
// import style from './style.css'

var i = index.getSingle(index.getName);
i("s");
console.log(1)
const mu = ()=>{
   var result = get("http://pullhls60ff766a.live.126.net/live/63666a6da1db4ba1b2e9e05c838f5cdc/playlist.m3u8");

   result.then((response)=>{
        return response.text();
    })
    .then((data)=>{
        console.log(data);
    })




}


class Person {
    public name:String
    constructor(name:String) {
      this.name = name
    }
  
  }
  
  (<any>Object).assign(Person.prototype,{
    getName() {
      console.log(this.name);
    },
    setName(name:String) {
      this.name = name
    }
  })
  console.log(Person.prototype);
  const pe = Person.prototype
export {
    pe,
    mu
}