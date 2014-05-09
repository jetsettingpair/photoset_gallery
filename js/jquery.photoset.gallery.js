/*jslint devel: true, maxerr: 100, browser: true, indent: 4 */
/*
*/
;(function ($) {

    var settings = {
        flickr_api: "https://api.flickr.com/services/rest",
        api_key: ""
    };

    function template_carousel(carousel_id) {
        var t = "";
        t += '<div id="' + carousel_id + '-title" class="psgallery-title"></div>';
        t += '<div id="' + carousel_id + '-wrapper" class="psgallery-wrapper">';
        t += '<a id="' + carousel_id + '-source" class="psgallery-source" href="#">';
        t += '<img id="' + carousel_id + '-selected-image" class="psgallery-selected-image" src=""/></a>';
        t += '<div id="' + carousel_id + '-gallery" class="psgallery">';
        t += '    <div class="loading">Loading gallery pictures...</div>';
        t += '</div>';
        t += '<a href="#" id="' + carousel_id + '-control-prev" class="psgallery-control-prev">&lsaquo;</a>';
        t += '<a href="#" id="' + carousel_id + '-control-next" class="psgallery-control-next">&rsaquo;</a>';
        t += '</div>';
        return t;
    }

    function idstring(gallery_id, string) {
        // a jquery id selector to access part of the above template.
        return '#' + gallery_id + '-' + string;
    }

    function render_gallery(gallery_id, el, photoset) {
        //console.log(photoset);

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

        // console.log("pictures: ");
        // console.log(pictures);

        $(el).html(template_carousel(gallery_id));

        var jcarousel = $(idstring(gallery_id, 'gallery')).jcarousel();

        $(idstring(gallery_id, 'control-prev'))
            .on(idstring(gallery_id, 'control:active'), function() {
                $(this).removeClass('inactive');
            })
            .on(idstring(gallery_id, 'control:inactive'), function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $(idstring(gallery_id, 'control-next'))
            .on(idstring(gallery_id, 'control:active'), function() {
                $(this).removeClass('inactive');
            })
            .on(idstring(gallery_id, 'control:inactive'), function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        var html = '<ul>';

        $.each(pictures, function() {
            html += '<li><img class="' + gallery_id + '-select-large" data-large="' + this.picture + '" src="' + this.thumbnail + '" alt="' + this.title + '"></a></li>';
        });

        html += '</ul>';

        // Append items
        jcarousel.html(html);

        // Reload carousel
        jcarousel.jcarousel('reload');

        // Set the initially selected image from the set:
        $(idstring(gallery_id, 'selected-image')).attr("src", pictures[0].picture);
        $(idstring(gallery_id, 'source')).attr("title", pictures[0].title);
        $(idstring(gallery_id, 'source')).attr("href", pictures[0].src);

        // Set the gallery's overall title from the flickr photoset:
        $(idstring(gallery_id, 'title')).html(title);

        // Set up the click to change select image:
        $('.' + gallery_id + '-select-large').each(function (index, ele){
            //console.log(index + " : " + ele);
            $(ele).click(function (){
                var large = $(ele).data("large");
                console.log("change pic to: " + large);
                $(idstring(gallery_id, 'selected-image')).attr("src", large);
                $(idstring(gallery_id, 'source')).attr("title", pictures[index].title);
                $(idstring(gallery_id, 'source')).attr("href", pictures[index].src);
            });
        });
    }

    function display_gallery_for(index, el, photosetid) {
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
                render_gallery(index, el, response.photoset);
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

        // For each gallery attempt to recover and display the requested flickr
        // photoset.
        $(".psgallery-set").each(function (index, el){
            var photosetid = $(el).data("photoset");
            if (!photosetid) {
                alert("missing data-photoset found on: "+ el);
                return;
            }
            //console.log("photoset to recover: "+photosetid);
            display_gallery_for(index, $(el), photosetid);
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

