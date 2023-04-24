
(function( global, factory ) {
	if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = global
    }else{
        global.nuo = factory
    }
})(typeof window !== "undefined" ? window : this, function (){
    let obj = {}
    let loc = location
    function addEvent(type) {
        var orig = history[type];
        return function() {
            var rv = orig.apply(this, arguments);
            var e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    history.pushState = addEvent('pushState')
    window.addEventListener('pushState', function(e){
        let req = e.arguments[2]
        if(!obj[req]){
            return obj['*'].handler(e.arguments[0])
        }
        obj[req].handler(e.arguments[0])
    })
    function getAnyPath(){
        let paths = loc.pathname.replace(/[/]/g,'./').split('.')
        paths.shift()
        return {
            getId: function(){
                let spl = loc.href.split('/')
                return spl[spl.length - 1]
            },
            paths,
            path: '.'+paths[paths.length - 1],
            pathname: loc.pathname
        }
    }
    // function loadScript(){
    //     var arr = document.getElementsByTagName('script')
    //     for (var n = 0; n < arr.length; n++){
    //         let src = arr[n].src 
    //         let code = arr[n].innerText
    //         console.log(arr[n].src == '', arr[n].innerText == '')
    //         if(arr[n].src == 'http://localhost:8080/router/alert.js'){
    //             var s = document.createElement("script");
    //             s.src = arr[n].src
    //             //s.appendChild(document.createTextNode(code));
    //             document.body.appendChild(s);
    //             break
    //         }
    //     }
    // }
    
    let nuo = {
      to: (url, param) => history.pushState(param,'',url),
      ...getAnyPath(),
      obj,
      get(url, handler){
         obj[url] = {}
         obj[url].handler || (obj[url].handler = handler)
      },
      render: (htmlCode, objCode, id) => {
        if(typeof ejs == 'undefined'){
            alert('ejs not found')
            return
        }
        let code = ejs.render(htmlCode, objCode)
        if(!id){
           return document.body.innerHTML = code 
        }
        document.getElementById(id).innerHTML = code
        // loadScript()
      },
    //   loadScript,
      listen: function(callback){
        let path = this.path
        this.to(path)
        callback(path)
      }
    }
    return nuo
}())
