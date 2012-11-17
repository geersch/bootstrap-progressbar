!function ($) {

	var ProgressBar = function (element, options) {
		this.element = $(element);
		this.position = 0;
		this.percent = 0;

		var hasOptions = typeof options == 'object';

		this.dangerMarker = $.fn.progressbar.defaults.dangerMarker;
		if (hasOptions && typeof options.dangerMarker == 'number') {
			this.setDangerMarker(options.dangerMarker);
		}

		this.warningMarker = $.fn.progressbar.defaults.warningMarker;
		if (hasOptions && typeof options.warningMarker == 'number') {
			this.setWarningMarker(options.warningMarker);
		}

		this.maximum = $.fn.progressbar.defaults.maximum;
		if (hasOptions && typeof options.maximum == 'number') {
			this.setMaximum(options.maximum);
		}

		this.step = $.fn.progressbar.defaults.step;
		if (hasOptions && typeof options.step == 'number') {
			this.setStep(options.step);
		}

		this.element.html($(DRPGlobal.template));
	};

	ProgressBar.prototype = {
		constructor: ProgressBar,

		stepIt: function () {
			if (this.position < this.maximum)
				this.position += this.step;
			
			this.setPosition(this.position);
		},

		setWarningMarker: function (marker) {
			marker = parseInt(marker);
			if (marker > this.dangerMarker) {
				this.warningMarker = this.dangerMarker;
				return;
			}

			this.warningMarker = marker;
		},

		setDangerMarker: function (marker) {
			this.dangerMarker = parseInt(marker);
		},

		setMaximum: function (maximum) {
			this.maximum = parseInt(maximum);
		},

		setStep: function (step) {
			step = parseInt(step);
			if (step <= 0)
				step = 1;
			
			this.step = parseInt(step);
		},

		setPosition: function (position) {
			position = parseInt(position);
			if (position < 0)
				position = 0;
			if (position > this.maximum)
				position = this.maximum;

			this.position = position;
			this.percent = Math.ceil((this.position / this.maximum) * 100);

		    try {
			    if (this.percent <= this.warningMarker) {
				    this.element.find('.bar-success').css('width', this.percent + "%");
				    this.element.find('.bar-warning').css('width', "0%");
				    this.element.find('.bar-danger').css('width', "0%");
				    return;
			    }

			    this.element.find('.bar-success').css('width', this.warningMarker + "%");
			    if (this.percent > this.warningMarker && this.percent <= this.dangerMarker) {
				    this.element.find('.bar-warning').css('width', (this.percent - this.warningMarker) + "%");
				    this.element.find('.bar-danger').css('width', "0%");
				    return;
			    }

			    this.element.find('.bar-warning').css('width', (this.dangerMarker - this.warningMarker) + "%");
			    this.element.find('.bar-danger').css('width', (this.percent - this.dangerMarker) + "%");
		    
		    } finally {
		        this._triggerPositionChanged();
		    }
		},

		reset: function () {
			this.position = 0;
			this.percent = 0;
			this._triggerPositionChanged();
			this.element.find('.bar-success').css('width', "0%");
			this.element.find('.bar-warning').css('width', "0%");
			this.element.find('.bar-danger').css('width', "0%");
		},

		_triggerPositionChanged: function () {
			this.element.trigger({
				type: "positionChanged",
				position: this.position,
				percent: this.percent
			});
		}
	};

	$.fn.progressbar = function (option) {
		var args = Array.apply(null, arguments);
		args.shift();
		return this.each(function () {
			var $this = $(this),
				data = $this.data('progressbar'),
				options = typeof option == 'object' && option;

			if (!data) {
				$this.data('progressbar', new ProgressBar(this, $.extend({}, $.fn.progressbar().defaults, options)));
			}
			if (typeof option == 'string' && typeof data[option] == 'function') {
				data[option].apply(data, args);
			}
		});
	};

	$.fn.progressbar.defaults = {
		warningMarker: 50,
		dangerMarker: 90,
		maximum: 100,
		step: 1
	};

	$.fn.progressbar.Constructor = ProgressBar;

	var DRPGlobal = {};

	DRPGlobal.template = '<div class="progress">' +
						 '<div class="bar bar-success" style="width: 0%;"></div>' +
						 '<div class="bar bar-warning" style="width: 0%;"></div>' +
						 '<div class="bar bar-danger" style="width: 0%;"></div>' +
						 '</div>';

} (window.jQuery);