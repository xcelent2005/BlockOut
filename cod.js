class Swipe {
	mylatesttap = 0;
	constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof(element) === 'string' ? document.querySelector(element) : element;

        this.element.addEventListener('touchstart', function(evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);
        
    }

    onLeft(callback) {
        this.onLeft = callback;

        return this;
    }

    onRight(callback) {
        this.onRight = callback;

        return this;
    }

    onUp(callback) {
        this.onUp = callback;

        return this;
    }

    onDown(callback) {
        this.onDown = callback;

        return this;
    }
	
	onDoubletap(callback) {
       this.onDoubletap = callback;
       
	   return this;
    }


	handleDoubleTap(evt){
		var now = new Date().getTime();
		var timesince = now - this.mylatesttap;
		
		if((timesince < 50) && (timesince > 0)){
			this.onDoubletap();
		}
		this.mylatesttap = new Date().getTime();

	}
    handleTouchMove(evt) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) { // Most significant.
            if ( this.xDiff > 0 ) {
                this.onLeft();
            } else {
                this.onRight();
            }
        } else {
            if ( this.yDiff > 0 ) {
                this.onUp();
            } else {
                this.onDown();
            }
        }
		
        // Reset values.
        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchmove', function(evt) {
            this.handleTouchMove(evt).bind(this);
        }.bind(this), false);
		
		this.element.addEventListener('touchend', function(evt) {
			this.handleDoubleTap(evt).bind(this);
        }.bind(this), false);
    }
}

window.onload = (event) => {
// Get the element yourself.
var swiper = new Swipe(document.getElementById('my-element'));
swiper.onLeft(function() { alert("left"); });
swiper.onRight(function() { alert("right"); });
swiper.onUp(function() { alert("up"); });
swiper.onDown(function() { alert("down"); });
swiper.onDoubletap(function() { alert("double tap"); });

swiper.run();
}
