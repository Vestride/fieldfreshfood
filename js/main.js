
// Revealer
(function($, Modernizr, window, undefined) {
  'use strict';

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
        // requestAnimationFrame(function() {
          self._updateRevealer();
        // });
      }
    },

    _updateRevealer: function() {
      var self = this,
          y = self.lastY * self.speed,
          yValue = self._getY( y );

          console.log(y);
      self.$el.css( self.prop, yValue );

      self.isTicking = false;
    },

    _getY : function( y ) {
      return [ this.prefix, y, this.suffix ].join('');
    }


  };

  window.Revealer = Revealer;

}(jQuery, Modernizr, window));

// Focus Form
(function($, Modernizr, window, undefined) {
  'use strict';

  var FocusForm = function( element, options ) {
    this.element = this;
    this.$el = $( element );
    this.$window = $(window);
    this._init( options );
    this.$el.data('focusForm', this);
  };

  FocusForm.prototype = {
    constructor: FocusForm,

    _init : function() {
      var self = this;

      self.$el.find('input').on('focus', $.proxy( self._onFocus, self ));
      self.$el.find('input').on('blur', $.proxy( self._onBlur, self ));
    },

    _onFocus : function() {
      this.$el.addClass('focused');
    },

    _onBlur : function() {
      this.$el.removeClass('focused');
    }
  };

  window.FocusForm = FocusForm;

}(jQuery, Modernizr, window));

// Hero carousel
(function($, Modernizr, window, undefined) {
  'use strict';

  var HeroCarousel = function( element, options ) {
    this.element = this;
    this.$el = $( element );
    this.$window = $(window);
    this._init( options );
    this.$el.data('heroCarousel', this);
  };

  HeroCarousel.prototype = {
    constructor: HeroCarousel,

    _init : function() {
      var self = this;

      self.$el.carousel({
        prevButtonClass: 'carousel-btn-prev round-btn',
        nextButtonClass: 'carousel-btn-next round-btn',
        nextText: '',
        prevText: ''
      });
    }
  };

  window.HeroCarousel = HeroCarousel;

}(jQuery, Modernizr, window));

// Snacks Gallery
(function($, Modernizr, window, undefined) {
  'use strict';

  var SnackGallery = function( element, options ) {
    this.element = this;
    this.$el = $( element );
    this.$window = $(window);
    this._init( options );
    this.$el.data('gallery', this);
  };

  SnackGallery.prototype = {
    constructor: SnackGallery,

    _init : function() {
      var self = this;

      self.$sizer = self.$el.find('.sizer');

      // Returning the rounded width values for column and gutter results in uneven
      // calculations because the precision is missing. If only we could get the % from the css...
      self.$el.shuffle({
        speed: 250,
        itemSelector: '.snack',
        throttle: $.throttle,
        columnWidth: function( containerWidth ) {
          return parseFloat( self.$sizer.css( 'width' ) ) ;
        },
        gutterWidth: function( containerWidth ) {
          return parseFloat( self.$sizer.css( 'marginLeft' ) ) ;
        }

      });
    }
  };

  window.SnackGallery = SnackGallery;

}(jQuery, Modernizr, window));


$(document).ready(function() {
  new Revealer( document.querySelector('.js-revealer') );
  new FocusForm( document.querySelector('.page-header form') );
  new HeroCarousel( document.querySelector('.carousel-container') );
  new SnackGallery( document.querySelector('.snacks-grid') );
});
