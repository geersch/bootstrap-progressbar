!function ($) {

	var ProgressBar = function (element, options) {
		this.element = $(element);
		this.position = 0;
		this.percent = 0;
		
		options = $.extend({},$.fn.progressbar.defaults,options);

		var hasOptions = typeof options == 'object';

		this.maximum = $.fn.progressbar.defaults.maximum;
		if (hasOptions && typeof options.maximum == 'number') {
			this.setMaximum(options.maximum);
		}

		this.step = $.fn.progressbar.defaults.step;
		if (hasOptions && typeof options.step == 'number') {
			this.setStep(options.step);
		}

		this.element.html($('<div>').addClass('progress').append(
			$('<div>').addClass('bar progress-bar')
			.addClass('bar-'+options.type)
			.addClass('progress-bar-'+options.type)
		));
	};

	ProgressBar.prototype = {
		constructor: ProgressBar,

		stepIt: function () {
			if (this.position < this.maximum)
				this.position += this.step;

			this.setPosition(this.position);
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
			this.element.find('.bar').css('width', this.percent + "%");
			this._triggerPositionChanged();

		},

		reset: function () {
			this.position = 0;
			this.percent = 0;
			this._triggerPositionChanged();
			this.element.find('.bar').css('width', "0%");
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
		maximum: 100,
		step: 1,
		type:'success'
	};

	$.fn.progressbar.Constructor = ProgressBar;

} (window.jQuery);
