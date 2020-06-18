
const paths=
    {
        singleton:{
            input:'./singleton/main.ts', //入口未见
            jsfile:"./singleton/index.js",//js输出文件
            lessfile:"./singleton/index.css",//样式输出的文件
            format:"umd", //输出格式：立即执行函数表达式   which can be one of 'amd', 'cjs', 'system', 'esm', 'iife' or 'umd'
            name:"videojs", //umd or iife 下的方法的命名
        },

        test:{
            input:'./test/main.js', //入口未见
            jsfile:"./test/index.js",//js输出文件
            lessfile:"./test/index.css", //样式输出的文件
            format:"umd", //输出格式：立即执行函数表达式   which can be one of 'amd', 'cjs', 'system', 'esm', 'iife' or 'umd'
            name:"videojs", //umd or iife 下的方法的命名
        }
    }

// 需要生成的文件
const  jspages = [
        "singleton",
        "test"
    ]


export{
    paths,
    jspages
}


