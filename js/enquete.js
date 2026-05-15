function enqueteClick(x) {
    //alert('x');
    $.fancybox.open({
        src: 'https://docs.google.com/forms/d/e/1FAIpQLSflJsgk9KE9Jt5JeG9Z2l11P70ElZPNR8tIbpvWsKmsAZG1cQ/viewform',
        type: 'iframe',
        css: {
            width: '100%'
        },
        opts: {
            afterShow: function (instance, current) {
                console.info('done!');
            }
        }
    });
}
