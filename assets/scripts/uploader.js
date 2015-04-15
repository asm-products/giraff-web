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
            files.push(fileList[i]);
        }
    }

    function doUpload() {
        // Wire to Flask.
    }

});
