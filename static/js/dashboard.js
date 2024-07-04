
        $(document).ready(function() {
            $('.nav-button').click(function(event) {
                event.preventDefault();
                var url = $(this).data('url');
                $.ajax({
                    url: url,
                    method: 'GET',
                    success: function(response) {
                        $('#content').html(response);
                    },
                    error: function() {
                        alert('Error loading content.');
                    }
                });
            });

            // Optionally, load default content
            $('.nav-button[data-url="/admin/dashboard"]').click();
        });

        
