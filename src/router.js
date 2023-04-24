nuo.get('./html', function(req){
    document.getElementById('root').innerHTML = '<div><h1>From pure HTML</h1></div>'
})
nuo.get('./fetch', async function(req){
    const response = await fetch("./src/example.html")
    const text = await response.text()
    document.getElementById('root').innerHTML = text
    // nuo.loadScript()
})
nuo.get('./ejs', async function(req){
    const response = await fetch("./src/example.ejs")
    const text = await response.text()
    let drink = {
        'Coffee': {}, 
        'Tea': {
           'Black-tea': {},
           'Green-tea': {
              'China': {},
              'Africa': {}
           }
        }, 
        'Milk': {},
    }
    nuo.render(text, {drinks: drink}, 'root');
})
nuo.get('*', function(req){
    let text = '<div><h1>404 Not Found</h1>'
    text += '<h1>Page <b style="color:'+(req?req.color:'blue')+'">'+nuo.getId()+'</b> Not Found</h1></div>'
    document.getElementById('root').innerHTML = text
})
nuo.listen((e)=>{
   console.log(`app listening on path ${e}`)
})
