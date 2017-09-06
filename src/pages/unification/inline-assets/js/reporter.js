(function(document, window) {
    window.ni = {};

    function getCookieValue(a) {
        var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }

    try {
        window.ni_server_side_impression_id = getCookieValue('et_current_iid');
        window.ni_server_side_user_id = getCookieValue('et_user_id');
        window.userInfo = JSON.parse(decodeURIComponent(getCookieValue('user_info')));
        window.ni_channel_type = userInfo.channel;
        window.ni_source = userInfo.source;
    } catch (e) {
        window.ni_channel_type = 'NA';
        window.ni_source = 'NA';
    }

    window.ni_platform = 'xsite';
    window._cms_site = false;

    window.ni.uiEvents = {
        trackEvent: function trackEvent(eventObject) {
            if (document.location.hostname === 'www.localhost') {
                console.info('trackEvent:', eventObject);
            }

            var eventArr = [];
            eventArr.push('_trackEvent');
            eventArr.push(eventObject.category);
            eventArr.push(eventObject.action);

            if (eventObject.optLabel) {
                eventArr.push(eventObject.optLabel);
            }

            if (eventObject.optValue) {
                eventArr.push(eventObject.optValue);
            }
            if (eventObject.optNonInteraction) {
                eventArr.push(eventObject.optNonInteraction);
            }

            var g = window._gaq || (window._gaq = []);
            g.push(eventArr);

            var evt = document.createEvent('Event');
            evt.initEvent('trackEvent', true, false);
            evt.detail = eventArr;
            document.dispatchEvent(evt);
        }
    };

    var console = (window.console = window.console || {});
    var noop = function() {};

    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn' ].map(function(method) {
        return console[method] ? method : noop;
    });

    window.eventTrackerAttributes = {
        userParams: {
            segmentId: '{segment.id}',
            sv: '{segment.ver}',
            verticalId: '{vertical.id}',
            vv: '{vertical.ver}',
            pageTypeId: '{pageType.id}',
            pv: '{pageType.ver}',
            pageTypeSegmentId: '{pageTypeSegment.id}',
            ptsv: '{pageTypeSegment.ver}',
            _country: '{geo.country}',
            _city: '{geo.city}',
            _region: '{geo.region}',
            _language: window.navigator.language || window.navigator.userLanguage,
            _scr_h: window.screen.availHeight,
            _scr_w: window.screen.availWidth,
            isPOC: 0,
            _platform: '{ua.device.type}',
            _os: '{ua.os.family}:{ua.os.version}',
            _browser: '{ua.browser.family}:{ua.browser.version}'
        }
    };
    window.__ctm_cvars = window.__ctm_cvars || [];
    window.__ctm_cvars.push({
        iid: window.ni_server_side_impression_id,
        tok:  '9fa6438f54740111583d5cc30e82ee70'
    });
})(document, window);
