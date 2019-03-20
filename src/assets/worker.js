const ctx = self;

onmessage = function(e) {
    console.log(e);
    ctx.postMessage(doWork(e.data));
    
}
function doWork([a,b]) {
    let x = 0;
      for(let i = 0; i<a; i++) {
        for(let j = 0; j < b; j++) {
          x += j;
        }
      }
      return x;
}

// ctx.postMessage('ready123');