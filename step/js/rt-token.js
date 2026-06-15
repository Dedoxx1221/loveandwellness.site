/**
 * VSL Tracking Script
 * Handles VSL_Lead and VSL_Pitch events based on video time
 * Receives VSL_Lead_SEC and VSL_Pitch_SEC as parameters
 */

(function() {
    console.log("[VSL Tracker] Script loaded");

    // Get parameters from window object or use defaults
    const VSL_Lead_SEC = window.VSL_Lead_SEC || 30;
    const VSL_Pitch_SEC = window.VSL_Pitch_SEC || 60;

    // Postback configuration
    const POSTBACK_TOKEN = window.RT_POSTBACK_TOKEN || "3gpocwafus";
    const POSTBACK_BASE = "https://lmw2o.ttrk.io/postback";

    console.log("[VSL Tracker] VSL_Lead_SEC:", VSL_Lead_SEC);
    console.log("[VSL Tracker] VSL_Pitch_SEC:", VSL_Pitch_SEC);

    // Event tracking flags
    let events = {
        pageView: false,
        vslPlay: false,
        vslLead: false,
        vslPitch: false,
        viewContent: false
    };

    /**
     * Get cookie value (RedTrack style)
     */
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    /**
     * Find click ID using RedTrack logic
     */
    function findClickId(urlObj) {
        // 1. Try cookie (set by unilpclick.js)
        const cookieId = getCookie('rtkclickid-store');
        if (cookieId && cookieId !== 'undefined') {
            console.log("[VSL Tracker] Tracking ID found in cookie: " + cookieId);
            return cookieId;
        }
        // 2. Try URL params (only explicit clickid params)
        const searchParams = urlObj.searchParams;
        const knownParamNames = ['rtkcid', 'clickid'];
        for (let i = 0; i < knownParamNames.length; i++) {
            if (searchParams.has(knownParamNames[i])) {
                const paramValue = searchParams.get(knownParamNames[i]);
                if (paramValue && paramValue !== 'undefined') {
                    console.log(`[VSL Tracker] Tracking ID found in param ${knownParamNames[i]}: ${paramValue}`);
                    return paramValue;
                }
            }
        }
        // 3. Try sessionStorage (set by unilpclick.js)
        try {
            const sessionId = sessionStorage.getItem('rtkclickid');
            if (sessionId && sessionId !== 'undefined') {
                console.log("[VSL Tracker] Tracking ID found in session: " + sessionId);
                return sessionId;
            }
        } catch (e) {}
        return null;
    }

    /**
     * Send postback event
     */
    function sendPostback(eventType, clickId) {
        if (!clickId) return;

        let postbackUrl = '';
        var fbp = encodeURIComponent(getCookie('_fbp') || '');
        var fbc = encodeURIComponent(getCookie('_fbc') || '');
        var fbParams = `&sub19=${fbp}&sub20=${fbc}`;

        switch (eventType) {
            case 'PageView':
                postbackUrl = `${POSTBACK_BASE}?clickid=${clickId}&ptoken=${POSTBACK_TOKEN}&type=PageView&eventid=${clickId}&sub18=${clickId}${fbParams}&status=approved`;
                break;
            case 'VSL_Play':
                postbackUrl = `${POSTBACK_BASE}?clickid=${clickId}&ptoken=${POSTBACK_TOKEN}&type=VSL_Play&sub18=${clickId}${fbParams}&status=approved`;
                break;
            case 'VSL_Lead':
                postbackUrl = `${POSTBACK_BASE}?clickid=${clickId}&ptoken=${POSTBACK_TOKEN}&type=VSL_Lead&sub18=${clickId}${fbParams}&status=approved`;
                break;
            case 'VSL_Pitch':
                postbackUrl = `${POSTBACK_BASE}?clickid=${clickId}&ptoken=${POSTBACK_TOKEN}&type=VSL_Pitch&sub18=${clickId}${fbParams}&status=approved`;
                break;
            case 'ViewContent':
                postbackUrl = `${POSTBACK_BASE}?clickid=${clickId}&ptoken=${POSTBACK_TOKEN}&type=ViewContent&sub18=${clickId}${fbParams}&status=approved`;
                break;
            default:
                console.error('[VSL Tracker] Unknown event type:', eventType);
                return;
        }

        if (postbackUrl) {
            // ViewContent is followed by a redirect to ClickBank — use sendBeacon
            // to guarantee delivery even if the browser starts navigating away.
            // Other events stay on page, so the image pixel approach is fine.
            if (eventType === 'ViewContent' && navigator.sendBeacon) {
                const sent = navigator.sendBeacon(postbackUrl);
                console.log(`[Postback: ${eventType}] sendBeacon`, sent, postbackUrl);
                if (sent) return;
                // fall through to image fallback if sendBeacon returned false
            }
            const img = new Image();
            img.src = postbackUrl;
            console.log(`[Postback: ${eventType}]`, postbackUrl);
        }
    }

    /**
     * Initialize SmartPlayer tracking
     */
    function initSmartPlayerTracking(clickId) {
        const player = typeof smartplayer !== 'undefined' &&
                      smartplayer.instances &&
                      smartplayer.instances.length ?
                      smartplayer.instances[0] : null;

        if (player) {
            console.log('[VSL Tracker] Player instance found:', player);

            // Attach postback tracking to player
            attachPostbackTracking(player, clickId);

            // Mark as attached to prevent duplicates
            player._postbacksAttached = true;

        } else {
            console.error('[VSL Tracker] SmartPlayer instance not found.');
        }
    }

    /**
     * Attach postback tracking to video player
     */
    function attachPostbackTracking(player, clickId) {
        // Track time-based events
        player.on('timeupdate', function() {
            const currentTime = player.video.currentTime;

            // VSL_Play event at 2 seconds (same logic as rt-legacy.js)
            if (!events.vslPlay && currentTime >= 2) {
                events.vslPlay = true;
                sendPostback('VSL_Play', clickId);
                console.log('[VSL Tracker] VSL_Play triggered at 2 seconds');
            }

            // VSL_Lead event at VSL_Lead_SEC seconds
            if (!events.vslLead && currentTime >= VSL_Lead_SEC) {
                events.vslLead = true;
                sendPostback('VSL_Lead', clickId);
                console.log('[VSL Tracker] VSL_Lead triggered at', currentTime, 'seconds (threshold:', VSL_Lead_SEC, ')');
            }

            // VSL_Pitch event at VSL_Pitch_SEC seconds
            if (!events.vslPitch && currentTime >= VSL_Pitch_SEC) {
                events.vslPitch = true;
                sendPostback('VSL_Pitch', clickId);
                console.log('[VSL Tracker] VSL_Pitch triggered at', currentTime, 'seconds (threshold:', VSL_Pitch_SEC, ')');
            }
        });


    }

    /**
     * Initialize tracking with retry mechanism
     */
    function initTracking(clickId, retryCount = 0) {
        if (typeof smartplayer !== 'undefined' &&
            smartplayer.instances &&
            smartplayer.instances.length) {

            initSmartPlayerTracking(clickId);

        } else {
            if (retryCount >= 10) {
                console.error('[VSL Tracker] SmartPlayer not found after 10 retries.');
                return;
            }

            const delay = 1000; // 1 second
            console.log(`[VSL Tracker] Retry #${retryCount + 1} in ${delay}ms`);
            setTimeout(() => initTracking(clickId, retryCount + 1), delay);
        }
    }

    /**
     * Setup ViewContent button handler (ClickMagick-style document-level capture)
     * Fires when any element matching #ViewContent (or its children) is clicked.
     * - Document-level listener: survives DOM re-renders, works for dynamic content
     * - Capture phase: immune to other scripts' stopPropagation()
     * - Uses closest() to match nested clicks (e.g., icon inside button)
     */
    function setupViewContentHandler(clickId) {
        document.addEventListener('click', function(e) {
            if (e.target && e.target.closest && e.target.closest('#ViewContent')) {
                if (!events.viewContent) {
                    events.viewContent = true;
                    sendPostback('ViewContent', clickId);
                    console.log('[VSL Tracker] ViewContent triggered by button');
                }
            }
        }, { capture: true });
    }

    /**
     * Wait for Meta Pixel to set _fbp cookie before firing PageView.
     * Polls every 500ms for up to 10s. If _fbp never appears, PageView is skipped.
     * (_fbc only exists for Facebook traffic — _fbp is the universal signal.)
     */
    function waitForFbpThenFirePageView(clickId, attempt) {
        if (events.pageView) return;
        var fbp = getCookie('_fbp');
        if (fbp) {
            events.pageView = true;
            sendPostback('PageView', clickId);
            console.log('[VSL Tracker] PageView triggered (after _fbp set, attempt ' + attempt + ')');
            return;
        }
        if (attempt >= 20) {
            console.log('[VSL Tracker] _fbp not set after 10s — PageView skipped');
            return;
        }
        setTimeout(function() { waitForFbpThenFirePageView(clickId, attempt + 1); }, 500);
    }

    /**
     * Main initialization function with retry for async cookie
     */
    function init(retryCount) {
        retryCount = retryCount || 0;
        const urlObj = new URL(window.location.href);
        const clickId = findClickId(urlObj);

        if (clickId) {
            console.log('[VSL Tracker] ClickId found:', clickId);
            // PageView fires once Meta Pixel has set _fbp (so deduplication works).
            // Wait up to ~10s; if _fbp never appears, skip PageView.
            waitForFbpThenFirePageView(clickId, 0);
            initTracking(clickId);
            setupViewContentHandler(clickId);
        } else if (retryCount < 10) {
            console.log('[VSL Tracker] No ClickId yet, retry #' + (retryCount + 1) + ' in 1s');
            setTimeout(function() { init(retryCount + 1); }, 1000);
        } else {
            console.log('[VSL Tracker] No ClickId found after 10 retries');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { init(0); });
    } else {
        init(0);
    }

})();
