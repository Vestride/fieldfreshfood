
(function($, Modernizr, window, undefined) {

  var Revealer = function( element, options ) {
    this.element = this;
    this.$el = $( element );
    this.$window = $(window);
    this._init( options );
    this.$el.data('revealer', this);
  };

  Revealer.options = {
    speed: 0.7
  };

  Revealer.settings = {
    lastY: 0,
    isTicking: false
  };

  Revealer.prototype = {
    constructor: Revealer,

    _init: function( options ) {
      var self = this;

      $.extend(self, Revealer.options, options, Revealer.settings);

      // Get the properties/values we're animating for the sticky navs
      if ( Modernizr.csstransforms ) {
        self.prop = 'transform';

        // 3d transforms will create a new layer for each of the sticky headers
        if ( Modernizr.csstransforms3d ) {
          self.prefix = 'translate3d(0,';
          self.suffix = 'px,0)';
        } else {
          self.prefix = 'translate(0,';
          self.suffix = 'px)';
        }
      } else {
        self.prop = 'top';
        self.prefix = '';
        self.suffix = 'px';
      }

      self.$window.on('scroll', $.proxy( self._onScroll, self ));

    },

    _onScroll: function() {
      var self = this;

      if ( !self.isTicking ) {
        self.isTicking = true;
        self.lastY = self.$window.scrollTop();
        requestAnimationFrame(function() {
          self._updateRevealer();
        });
      }
    },

    _updateRevealer: function() {
      var self = this,
          y = self.lastY * self.speed,
          yValue = self._getY( y );

      self.$el.css( self.prop, yValue );

      self.isTicking = false;
    },

    _getY : function( y ) {
      return [ this.prefix, y, this.suffix ].join('');
    }


  };

  window.Revealer = Revealer;

}(jQuery, Modernizr, window));


$(document).ready(function() {
  new Revealer( document.querySelector('.js-revealer') );
});
