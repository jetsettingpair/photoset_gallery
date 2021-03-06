Photoset Gallery
================

.. contents::

Introduction
------------

Generates a gallery from a photoset on Flickr with links referring to the
originals. This provides a JQuery plugin which uses the excellent psgallery
to manage the gallery side of things.

Usage
-----

Clone the repository and open demo-gallery.html in a browser. You will need to
provide your Flickr API key. Paste it into the input and press Display and you
should see:

.. image:: working-control.jpg
    :width: 50%
    :align: center

Multiple galleries and photos are supported on one page. The following snippet
of code sets up the library to look for all elements with the classes
"psgallery-set" and "psgallery-photo". This is only needed once when the document
is ready.

.. code-block:: javascript

    $.photoset.gallery.init({
        api_key: "your api key from flickr"
    });


photoset gallery
~~~~~~~~~~~~~~~~

The HTML contains the following data-photoset attribute which tells the library
what photoset to use. In this case this is my Channel Islands Flickr photoset
https://www.flickr.com/photos/oisinmulvihill/sets/72157606132043161/

.. code-block:: html

    <div class="psgallery-set" data-photoset="72157606132043161"></div>
    :
    etc


photo
~~~~~

The HTML contains the following data-photo attribute which tells the library
what photo to use. In this case https://www.flickr.com/photos/oisinmulvihill/8720572307

.. code-block:: html

    <div class="psgallery-photo" data-photo="8720572307"></div>
    :
    etc


Tumblr Integration
------------------

I designed this to allow me to curate a gallery on flickr and use it in
a blog post. I wanted people to go between Tumblr and Flickr so the smaller
images in the blog post link to the originals on Flickr.

Comming Soon, I just need to put this library onto a friendly CDN and document
the integration process.


Dependancies
------------

In the demo I was using JQuery 2.1.0 and Carousel 0.3.1 over CDN:

.. code-block:: html

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/psgallery/0.3.1/jquery.psgallery.min.js"></script>

JCarousel
~~~~~~~~~

 * http://sorgalla.com/JCarousel/


License
-------

Copyright (c) 2014, Oisin Mulvihill
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.
 * Neither the name of Oisin Mulvihill nor the names of its contributors may
   be used to endorse or promote products derived from this software without
   specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
