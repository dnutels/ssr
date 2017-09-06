(function(document, window) {
    var fontBold = new FontFaceObserver('Montserrat', {
        weight: 700
    });
    var fontRegular = new FontFaceObserver('Montserrat', {
        weight: 400
    });
    var fontLight = new FontFaceObserver('Montserrat', {
        weight: 300
    });

    window.addEventListener('load', function () {
        Promise.all([fontBold.load(), fontRegular.load(), fontLight.load()]).then(function fontsAreLoaded() {
            var body = document.querySelector('body');

            body.classList.toggle('page__font-regular');
            body.classList.toggle('page__font-light');
        }).catch(function(err) {
            console.error(err);
        });
    });

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '@font-face{font-family:Montserrat;font-weight:700;src:url(https://umbrella.s3.naturalint.com/xsite/ui/fonts/Montserrat/montserrat-bold.woff) format("woff")}@font-face{font-family:Montserrat;font-weight:400;src:url(https://umbrella.s3.naturalint.com/xsite/ui/fonts/Montserrat/montserrat-regular.woff) format("woff")}@font-face{font-family:Montserrat;font-weight:300;src:url(https://umbrella.s3.naturalint.com/xsite/ui/fonts/Montserrat/montserrat-light.woff) format("woff")}';
    document.querySelector('head').appendChild(style);
})(document, window);
