// ==UserScript==
// @name         video2link
// @namespace    video2link
// @version      0.13
// @description  video tag to url link
// @author       miszel
// @match        *://*/*
// @grant        none
// @license      MIT
// ==/UserScript==


(function () {
    'use strict';

    var searchVideo = function () {
        var video = document.getElementsByTagName('video');

        if (video.length > 0) {

            var div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.bottom = 0;
            div.style.width = '100%';
            div.style.zIndex = 2147483647;
            document.body.appendChild(div);

            var links = [];
            var appendVideoLink = function (src) {
                if (links.indexOf(src) == -1) {
                    var a = document.createElement('a');
                    a.target = '_blank';
                    a.href = src;
                    a.text = src.substr(src.lastIndexOf('/') + 1);
                    a.style.fontSize = '2rem';
                    a.style.wordBreak = 'break-all';
                    a.style.userSelect = 'none';
                    a.style.setProperty('-moz-user-select', 'none', 'important');
                    if (links.length > 0) div.appendChild(document.createElement('br'));
                    div.appendChild(a);
                    links[links.length] = src;
                }
            };

            for (var v = 0; v < video.length; v++) {
                if (video[v].src !== '') {
                    appendVideoLink(video[v].src);
                }

                var source = video[v].getElementsByTagName('source');

                if (source.length > 0) {
                    for (var s = 0; s < source.length; s++) {
                        if (source[s].src !== '') {
                            appendVideoLink(source[s].src);
                        }
                    }

                }
            }
        }
    };

    var divV = document.createElement('div');
    divV.style.position = 'absolute';
    divV.style.top = Math.floor((Math.random() * 100) + 1) + 'px';
    divV.style.left = Math.floor((Math.random() * 50) + 1) + 'px';
    divV.style.backgroundColor = '#FF0000';
    divV.style.color = '#FFFFFF';
    divV.style.width = '40px';
    divV.style.height = '40px';
    divV.style.fontSize = '20px';
    divV.style.lineHeight = '40px';
    divV.style.textAlign = 'center';
    divV.style.cursor = 'pointer';
    divV.style.zIndex = 2147483647;
    divV.style.borderRadius = '5px';
    divV.style.userSelect = 'none';
    divV.style.setProperty('-moz-user-select', 'none', 'important');
    divV.style.touchAction= 'none';
    divV.innerText = '\u25B6';
    //divV.onclick = searchVideo;
    document.body.appendChild(divV);

    var mousePosition;
    var offset = [0, 0];
    var flag = 0;

    ['mousedown', 'touchstart'].forEach(function (e) {
        divV.addEventListener(e, function (event) {
            flag = 1;
            offset = [
                divV.offsetLeft - (event.clientX || event.touches[0].clientX || 0),
                divV.offsetTop - (event.clientY || event.touches[0].clientY || 0)
            ];
        }, {passive: true});
    });

    ['mouseup', 'touchend'].forEach(function (e) {
        document.addEventListener(e, function () {
            if (flag === 1) searchVideo();
            flag = 0;
        }, true);
    });

    ['mousemove', 'touchmove'].forEach(function (e) {
        document.addEventListener(e, function (event) {
            if (flag >= 1) {
                flag = 2;
                mousePosition = {
                    x: (event.clientX || event.touches[0].clientX || 0),
                    y: (event.clientY || event.touches[0].clientY || 0)
                };
                divV.style.left = (mousePosition.x + offset[0]) + 'px';
                divV.style.top = (mousePosition.y + offset[1]) + 'px';
                e.preventDefault;
            }
        }, {passive: false});
    });
})();
