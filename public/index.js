$(function() {
	// Database url
	let $dbUrl = 'http://localhost:9000/freelancers';

	// Hook point to insert a new freelancer
	let $cardDeck = $('.card-deck');

	// Grab all form inputs
	let $firstName = $('#first-name');
	let $lastName = $('#last-name');
	let $joinEmail = $('#join-email');
	let $password = $('#password');
	let $joinPassword = $('#join-password');

	// GET first three freelancers to display on page load
	$.ajax({
		type: 'GET',
		url: $dbUrl,
		success: function(freelancers) {
			for (let i = 0; i <= 2; i++) {
				$cardDeck.append(
					`
				  <div class="card d-flex">
				    <img src="${freelancers[i].image}" class="card-img-top" alt="${
						freelancers[i].name
					}">
				    <div class="card-body">
				      <h5 class="card-title">${freelancers[i].firstName} ${
						freelancers[i].lastName
					}</h5>
				      <p class="card-text">${freelancers[i].description}</p>
				    </div>
				    <div class="card-footer d-flex justify-content-around">
				        <small class="text-muted"><i class="fas fa-star"></i> ${
									freelancers[i].ratings
								} Ratings</small>
				        <small class="text-muted"><a href="#" id="freelancer-details" data-toggle="modal" data-target="#freelancerDetailsModal"><i class="fas fa-eye"></i></a></i></small>
				    </div>
				  </div>
				  `
				);
			}
			// $.each(freelancers, function(i, freelancer) {
			// 	$cardDeck.append(
			// 		`
			// 	  <div class="card">
			// 	    <img src="${freelancer.image}" class="card-img-top" alt="${
			// 			freelancer.name
			// 		}">
			// 	    <div class="card-body">
			// 	      <h5 class="card-title">${freelancer.firstName} ${freelancer.lastName}</h5>
			// 	      <p class="card-text">${freelancer.description}</p>
			// 	    </div>
			// 	    <div class="card-footer d-flex justify-content-around">
			// 	        <small class="text-muted"><i class="fas fa-star"></i> ${
			// 						freelancer.ratings
			// 					} Ratings</small>
			// 	        <small class="text-muted"><a href="#" data-toggle="modal" data-target="#freelancerDetailsModal"><i class="fas fa-eye"></i></a></i></small>
			// 	    </div>
			// 	  </div>
			// 	  `
			// 	);
			// });
		}
	});

	// Handles alert
	function alertHandler(obj, status) {
		if (status !== 'success') {
			$('.alert').show('fade');
		} else {
			$('.alert')
				.removeClass('alert-danger')
				.addClass('alert-success')
				.show('fade');
		}
		$('#alert-message-content').html(obj[status]);
		setTimeout(function() {
			$('.alert').hide('fade');
		}, 3000);
	}

	// Handles modal closing
	function closeModal() {
		$('.modal').modal('hide');
	}

	function resetModal(modalId) {
		$(modalId).trigger('reset');
	}

	// View freelancer details
	// $('#freelancer-details').click(function() {
	//   let $('')
	//   $(this).remove()
	// });

	// Login a freelancer
	$('#login-btn').click(function() {
		// Grab incoming credentials
		let $email = $('#email').val();
		let $password = $('#password').val();
		let $messageContent = {
			fail: 'Incorrect credentials. Try Again!',
			success: "Success. You'll be redirected in a moment",
			blank: 'Fill in all details!',
			invalid: 'Enter a valid email'
		};

		// Check if an empty form has been submitted
		if (
			($email === null || $email === '', $password === null || $password === '')
		) {
			alertHandler($messageContent, 'blank');
		} else {
			// If not...
			$.ajax({
				type: 'GET',
				url: $dbUrl,
				success: function(freelancers) {
					for (let freelancer of freelancers) {
						if (
							freelancer.email === $email &&
							freelancer.password === $password
						) {
							setInterval(function() {
								alertHandler($messageContent, 'success');
								resetModal('#login-form');
								closeModal();
							}, 3200);
							window.location.replace('./profile.html');
						} else {
							alertHandler($messageContent, 'fail');
							resetModal('#login-form');
						}
					}
				},
				error: function() {
					alert('There was an error login in.');
				}
			});
		}
	});
});
