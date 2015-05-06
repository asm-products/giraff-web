jQuery(function($) {

    var files = [];

    var $uploadZone = $('#upload-zone');
    $uploadZone.on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    $uploadZone.on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    $uploadZone.on('drop', function (e) {
        e.preventDefault();
        handleFiles(e.originalEvent.dataTransfer.files);
    });

    // Input box
    $('#upload-file').on('change', function() {
        handleFiles(this.files);
    });

    // Submit button
    $('#upload-button').on('click', function(e) {
        e.preventDefault();
        doUpload();
    });

    function handleFiles(fileList) {
        for (var i = 0, len = fileList.length; i < len; i++) {
            convertImage(fileList[i]);
        }
    }

    function convertImage(file) {
        var fileReader = new FileReader();

        var image = {
            "bytes": "",
            "filename": file.name,
            "content": "",
            "content_type": file.type
        };

        fileReader.onload = function(e) {
            image.bytes = e.target.result.length;
            image.content = e.target.result;
            files.push(image);
        };

        fileReader.readAsDataURL(file);
    }

    function doUpload() {
        var imageRequest = {
            "image": {
                "name": "",
                "original_source": ""
            }
        };

        var originalSource = $("#upload-source").val();

        if (originalSource) {
            imageRequest.image.original_source = originalSource;
        } else if (files.length > 0) {
            imageRequest.image.bytes = files[0].bytes;
            imageRequest.image.file = {
                "filename": files[0].filename,
                "content": files[0].content,
                "content_type": files[0].content_type
            };
        } else {
            return;
        }

        $.ajax({
            url: 'http://fun-api.herokuapp.com/images',
            method: 'POST',
            data: imageRequest,
            success: function(data) {
                console.log(data);
            }
        })
    }

});
