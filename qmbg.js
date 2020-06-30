//Made by Zachary Mitchell in 2020!
//Dumbot needs more fun stuff, so I wanted to make a moving background that would make things interesting

/*Learned something new from the land of stackoverflow; Formula is mine but StackOverflow directed me to requestAnimationFrame:
https://stackoverflow.com/questions/6131051/is-it-possible-to-find-out-what-is-the-monitor-frame-rate-in-javascript#6131242*/
var detectFramerate = {
    instance:undefined,
    //Figure out the framerate based on the number of unique integers from requestAnimationFrame
    //EDIT: no idea why, 200 ms == 1s in this code... sooo 20 for 100 milliseconds IRL? oi. Regardless this will return the correct number, even though it's being odd timewise.
    go:function(doneFunc = e=>e,msToTest = 100){
        detectFramerate.instance = detectFramerate._gen(msToTest,doneFunc);
        detectFramerate.instance.next();
    },

    //run for x milliseconds to determine framerate
    _gen:function*(msToTest,doneFunc){
        var frames = [];
        for(var i = 0; i < Math.floor(msToTest/5);i++){
            window.requestAnimationFrame(e=>frames.push(e));
            setTimeout(()=>detectFramerate.instance.next(),1);
            yield;
        }

        //All frames should be collected, now count them all up and return the number
        var uniqueFrames = 0;
        var currFrame = 0;
        for(var i = 0; i < frames.length;i++){
            if(frames[i] != currFrame){
                currFrame = frames[i];
                uniqueFrames++;
            }
        }

        //Divide 1000 by the amount of milliseconds tested, then multiply THAT to find the framerate
        doneFunc(uniqueFrames * ( 1000 / msToTest ) );
    }
}

function qmbg(tileSrc,sourceCanvas = document.createElement('canvas'), speed = .5,frameRate = 16.6){
    //Two canvases will be in play, One that creates a trio-pattern, and another that tiles it across wherever this is applied:
    this.tileSrc = tileSrc;
    this.sourceCanvas = sourceCanvas;
    this.frameRate = frameRate;
    this.speed = speed;
    this.animationInstance = undefined;
    
    this.percent = 0;
    var tileMultiplier = 2;
    this.trioCanvas = document.createElement('canvas');
    this.trioCanvas.width = this.tileSrc.width*tileMultiplier;
    this.trioCanvas.height = this.tileSrc.height*tileMultiplier;

    this.render = function(percent = this.percent){
        if(percent != this.percent) this.percent = percent;

        var ctx = this.trioCanvas.getContext('2d');
        var w = this.tileSrc.width,
            h = this.tileSrc.height;

        ctx.clearRect(0,0,this.trioCanvas.width,this.trioCanvas.height);

        //Make 9 images being rendered diagonally next to eachother to create a falling effect.
        for(var i = -100; i < 200; i+=100){
            ctx.drawImage(this.tileSrc, w * ((percent+i)*.01), h * ((percent+i)*.01));
            ctx.drawImage(this.tileSrc, w * ((percent+i+200)*.01), h * ((percent+i)*.01));
            ctx.drawImage(this.tileSrc, w * ((percent+i)*.01), h * ((percent+i+200)*.01));
        }
    }

    //Grab the original canvas and start plastering it across the source canvas
    this.tile = function(){
        var ctx = this.sourceCanvas.getContext('2d');
        var tw = this.trioCanvas.width;
        var th = this.trioCanvas.height;

        ctx.clearRect(0,0,this.sourceCanvas.width,this.sourceCanvas.height);
        //Stop when the height is full:
        var height = 0;
        while(height < this.sourceCanvas.height){
            //Stop when the width is full:
            var width = 0;
            while(width < this.sourceCanvas.width){
                ctx.drawImage(this.trioCanvas, width, height);
                width+=tw;
            }
            height+=th;
        }
    },

    //In order to keep framerate updated live, setTimeouts are used insetead of intervals. This goes on forever unless the interval is cleared.
    this.animate = function(){
        this.animationInstance = this._timeout()
        this.animationInstance.next();
    }

    this._timeout = function*(){
        while(true){
            this.render();
            this.tile();
            this.percent+=100 / ((1000 / this.frameRate) / this.speed );
            if(this.percent > 100) this.percent = 0;
            setTimeout(()=>this.animationInstance.next(),this.frameRate);
            yield;
        }
    }

}