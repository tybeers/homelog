angular.module('dateFilter', ['ng'])
    .filter('localtime', function() {
        return function(d) {
            return d.replace(
                /^(?:\d\d\d\d-\d\d-\d\dT)?\d\d:\d\d(?::\d\d(?:\.\d+)?)?$/,
                function($0) {
                    var offset = (new Date).getTimezoneOffset(),
                        hours = Math.floor(Math.abs(offset)/60),
                        minutes = Math.abs(offset)%60,
                        sign = offset<=0 ? '+' : '-',
                        tz = (sign+(hours*100+minutes))
                            .replace(/^([-+])(\d\d\d)$/, '$10$2');

                    return $0+tz;
                });
        }
    });