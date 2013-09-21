$(function(){
  chrome.tabs.query({'active': true}, function(tabs) {
    var tabUrl = encodeURIComponent(tabs[0].url);
    var tabTitle = encodeURIComponent(tabs[0].title);

    var _html = '';
    $.get('service-template.html', function(template){
      $.get('services.json', function(services){
        services = JSON.parse(services);
        for(var service in services){
          _html += template.replace(/%SERVICE_NAME%/g, service)
                           .replace(/%SERVICE_SHORT_NAME%/g, services[service].shortName)
                           .replace(/%SERVICE_URL%/g, services[service].url);
        }
        $('body').html(_html);
        $('a').on('click', function(){
          var _url = $(this).attr('href').replace(/%URL%/g, tabUrl)
                                         .replace(/%TITLE%/g, tabTitle);
          setTimeout(function(){
            window.open(_url, 'Share on ' + $(this).attr('data-service'), 'width=600,height=500,menubar=no,location=no,status=no');
            window.close();
          }, 10);
        });
      });
    });

  });
});