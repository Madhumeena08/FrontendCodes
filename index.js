let channel = new MessageChannel();
    const port1 = channel.port1;

    window.onmessage = function (e) {
        if (e.data.routeData) {
            if (e.data.routeData.routePath && e.data.routeData.screenId) {
                const queryString = '?screen=' + e.data.routeData.routePath + '&screenId=' + e.data.routeData.screenId;
                window.history.replaceState(null, null, queryString);
            }
        }
    };

    function setItemToStorage(key, value, storage){
        localStorage.setItem(key, value);
    }


 window.addEventListener('message', function (event) {
    try{
        if (event.data === 'iframeBackButtonClicked') {
            console.log('Back button was clicked within the iframe!');
        }

        if(event.data.env && event.data.authenticate){
            const currentPath = window.location.href;
            if(event.data.env === "development"){
                window.location.href = `https://ig-api-management-devint.azure-api.net/ond/${event.data.siteToken}?authenticate=true&onlyauth=true&redirect_app=${currentPath}`
            } else {
                window.location.href = `${currentPath}/?authenticate=${true}&onlyauth=true&redirect_app=${currentPath}`
            }
        }
    } catch(error){
        console.log(error);
    }
    });

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function getQueryParams(url) {
        const params = {};
        const searchParams = new URL(url).searchParams;

        for (const [key, value] of searchParams) {
            params[key] = value;
        }

        return params;
    }

    function init() {
        const queryParams = getQueryParams(window.location.href);
        let url = "http://localhost:3000";
        var urlWithQueryString = url + "" + objectToQueryString(queryParams);
        let iframeVar = '<iframe id="frame" allow="clipboard-read; clipboard-write" src="' + urlWithQueryString + '" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>';
        document.getElementById("iframe-wrapper").innerHTML = iframeVar;
        // setFocusThickboxIframe();
    }
    function objectToQueryString(obj) {
        return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
    }


    function setFocusThickboxIframe() {
        var iframe = document.getElementById("frame");
        iframe.contentWindow.document.body.focus();
    }
    init();
