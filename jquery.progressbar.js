(function ($) {
    'use strict';

    let methods = {
        init: function (options) {
            console.log('progressbar plugin init');

            let settings = $.extend({
                value: 0,           // percents
                duration: 1000,     // milliseconds

                fontColor: '#FFFFFF',
                fillColor: '#4CB44C',
                backgroundColor: '#E9E7E7',
                radius: '0px',
                height: '10px',
                width: '100%'
            }, options);

            return this.each(function (index, el) {
                let $this = $(this);
                let data = $this.data('progressbar');

                if (!data) {
                    data = {
                        target: $this,
                        settings: settings,
                    };

                    $(this).data('progressbar', data);
                }


                $(el).html(
                    '<div class="progressbar">' +
                    '<div class="proggress">' +
                    '<span class="percentCount"></span>' +
                    '</div>' +
                    '</div>'
                );


                let progress = $(el).find('.proggress');
                let progressBar = $(el).find('.progressbar');
                let percentCount = $(el).find('.percentCount');

                progressBar.css({
                    width: data.settings.width,
                    height: data.settings.height,
                    borderRadius: data.settings.radius,
                    backgroundColor: data.settings.backgroundColor
                });

                progress.css({
                    position: 'relative',
                    width: `${data.settings.value}%`,
                    height: data.settings.height,
                    borderRadius: data.settings.radius,
                    backgroundColor: data.settings.fillColor
                });

                percentCount.css({
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: data.settings.fontColor,
                });

            });
        },
        run: function (value, complete) {
            let $this = $(this);
            let data = $this.data('progressbar');

            return this.each(function (index, el) {
                let progress = $(el).find('.proggress');
                let percentCount = $(el).find(".percentCount");

                let currentValue = 0;
                progress.animate(
                    {width: `${value}%`},
                    {
                        progress: function (animation, x) {
                            let newValue = (x * value) | 0;       // fast trunc
                            if (newValue !== currentValue) {      // set text for new value only
                                percentCount.text(`${newValue}%`);
                                currentValue = newValue;
                            }
                        },
                        duration: data.settings.duration,
                        easing: 'linear',
                        complete: function () {
                            if (complete && typeof(complete) === "function") {
                                complete();
                            }
                        }
                    }
                );
            });
        }
    };

    $.fn.progressbar = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error(`Method ${method} does not exist for jQuery.progressbar`);
        }
    };
})(jQuery);