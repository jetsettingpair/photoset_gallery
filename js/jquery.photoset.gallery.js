/*jslint devel: true, maxerr: 100, browser: true, indent: 4 */
/*
*/
;(function ($) {

    var settings = {
        flickr_api: "https://api.flickr.com/services/rest",
        api_key: ""
    };

    function template_carousel() {
        var t = "";
        t += '<div class="jcarousel-wrapper">';
        t += '<div class="jcarousel-title"></div>';
        t += '<div class="jcarousel">';
        t += '    <div class="loading">Loading carousel items...</div>';
        t += '</div>';
        t += '<a href="#" class="jcarousel-control-prev">&lsaquo;</a>';
        t += '<a href="#" class="jcarousel-control-next">&rsaquo;</a>';
        t += '<a id="jcarousel-source" title="" href="#"><img id="jcarousel-selected-image" src=""/></a>';
        t += '</div>';
        return t;
    }

    function render_gallery(el, photoset) {
        console.log(photoset);

        var title = photoset.title;
        //console.log("title: "+ title);

        var owner = photoset.owner;
        //console.log("owner: "+ owner);

        var pictures = [];

        $.each(photoset.photo, function (index, p) {
            // {
            //     "farm": 4,
            //     "id": "2308844218",
            //     "isprimary": "1",
            //     "secret": "a60740dfa4",
            //     "server": "3226",
            //     "title": "Kitty behind bars"
            // }
            // http://farm{id}.staticflickr.com/{server}/{id}_{secret}_[mstzb].jpg
            var base = "http://farm" + p.farm + ".staticflickr.com/" + p.server + "/" + p.id + "_" + p.secret;

            pictures.push({
                thumbnail: base + "_m.jpg",
                picture: base + "_z.jpg",
                title: p.title || "",
                src: "http://www.flickr.com/photos/" + owner + "/" + p.id
            });
        });

        //console.log("pictures: ");
        //console.log(pictures);

        $(el).html(template_carousel());

        var jcarousel = $('.jcarousel').jcarousel();

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });


        var html = '<ul>';

        $.each(pictures, function() {
            html += '<li><img class="select-large" data-large="' + this.picture + '" src="' + this.thumbnail + '" alt="' + this.title + '"></a></li>';
        });

        html += '</ul>';

        // Append items
        jcarousel.html(html);

        // Reload carousel
        jcarousel.jcarousel('reload');

        // Set the initially selected image from the set:
        $("#jcarousel-selected-image").attr("src", pictures[0].picture);
        $("#jcarousel-selected-image").attr("src", pictures[0].picture);

        $("#jcarousel-source").attr("title", pictures[0].title);
        $("#jcarousel-source").attr("href", pictures[0].src);

        $(".jcarousel-title").html(title);

        // Set up the click to change select image:
        $(".select-large").each(function (index, ele){
            $(ele).click(function (){
                var large = $(ele).data("large");
                //console.log("change pic to: " + large);
                $("#jcarousel-selected-image").attr("src", large);
                $("#jcarousel-source").attr("title", pictures[0].title);
                $("#jcarousel-source").attr("href", pictures[0].src);
            });
        });
    }

    function display_gallery_for(el, photosetid) {
        var request = $.ajax({
            url: settings.flickr_api,
            data: {
                method: "flickr.photosets.getPhotos",
                api_key: settings.api_key,
                photoset_id: photosetid,
                format: "json",
                nojsoncallback: 1
            }
        });

        request.done(function (response) {
            if (response.hasOwnProperty("photoset")) {
                render_gallery(el, response.photoset);
            } else {
                alert("no photoset found in response!");
            }
        });

        request.fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    }

    function init(options) {
        if (options) {
            $.extend(settings, options);
        }

        $(".photoset-gallery").each(function (index, el){
            var photosetid = $(el).data("photoset");
            if (!photosetid) {
                alert("missing data-photoset found on: "+ el);
                return;
            }
            //console.log("photoset to recover: "+photosetid);
            display_gallery_for($(el), photosetid);
        });

    }

    // Add to the JQuery plugin namespace i.e. $.photoset.<XYZ calls>
    // create $.photoset if its not present.
    if (!$.photoset) { $.extend({photoset: {}}); }

    // Now add $.bookingsys.profile namespace contents:
    $.extend($.photoset, {gallery: {
        init: init
    }});

})(jQuery);

