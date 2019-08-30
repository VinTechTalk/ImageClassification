

$(document).ready(function(){
	 $('.image-section').hide();
    $('.loader').hide();
    $('#img').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img').show();
                $('#img').attr("src",e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
		$('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });
	

	$('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
        $("#btn-predict").attr("disabled", true);

        $.ajax({
            type: 'POST',
            url: '/upload',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                 $('.loader').hide();
                 $('#result').fadeIn(600);
                 $('#result').text(' Result:  ' + data);
				app();
				console.log(data);
                console.log('Success!');
            },
        });
    });	
	let net;
	async function app() {
	  
	    $('.loader').show();
        console.log('Loading mobilenet..');

        // Load the model.
        net = await mobilenet.load();
        console.log('Sucessfully loaded model');

        // Make a prediction through the model on our image.
	    const imgEl = document.getElementById('img');
        const result = await net.classify(imgEl);
        $('#ImageClassification').text("The above image is:" + result[0].className.split(',')[0]);
        console.log(result);
        $('.loader').hide();
        $('#btn-predict').attr("disabled", false);	
     }
})