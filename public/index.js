$(function() {
	// Database url
	let $dbUrl = 'http://localhost:9000/freelancers';

	// Hook point to insert a new freelancer
	let $cardDeck = $('.card-deck');

	// Grab all form inputs
	let $firstName = $('#first-name');
	let $lastName = $('#last-name');
	let $joinEmail = $('#join-email');
	let $joinPassword = $('#join-password');
	let $confirmPassword = $('#confirm-password');

	// Grab the freelancer profile display
	let $freelancerProfile = $('#freelancer-profile');

	// Grab the body
	let $body = $('#wholeBody');

	// Alert messages declaration
	let $messageContent = {
		fail: 'Incorrect credentials. Try Again!',
		success: "Success. You'll be redirected in a moment",
		blank: 'Fill in all details!',
		invalid: 'Enter a valid email',
		notMatch: 'Passwords do not match. Ensure they match!'
	};

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
								resetModal('#login-form');
								closeModal();
							}, 3200);
							$body
								.addClass('bg-light')
								.html(`<h1>Replaced the home page!</h1>`);
							// window.location.replace('./profile.html');
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

	// Prepopulate freelancer dashboard
	$profileBody = `
  <!-- Edit Profile Modal -->
    <div class="modal fade" id="editProfileModal" tabindex="-1" role="dialog" aria-labelledby="editProfileModalTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProfileModalTitle">Update your profile</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="first-name">First Name</label>
                  <input type="text" class="form-control" id="first-name" placeholder="Jane">
                </div>
                <div class="form-group col-md-6">
                  <label for="last-name">Last Name</label>
                  <input type="text" class="form-control" id="last-name" placeholder="Doe">
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="password">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" rows="5" id="description"></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">Update</button>
                <button type="submit" class="btn btn-danger join" data-dismiss="modal" aria-label="Close">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
		<!-- Navigation -->
		<nav class="navbar navbar-dark bg-dark">
			<a class="navbar-brand mb-0 h1" href="./index.html">Decagance</a>
			<!-- Nav links -->
			<div class="nav nav-pills justify-content-end">
				<a class="nav-link btn btn-outline-primary" href="./index.html">
					Sign Out
				</a>
			</div>
		</nav>

    <!-- Main content -->
    <section class="container mt-5">
      <div class="row">
        <div class="col-4 mx-auto">
          <h1>Freelancer Profile</h1>
          <div class="card border-dark mb-3" style="max-width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Arya Stark</h5>
              <p class="card-text">I am a nobody.</p>
            </div>
            <div class="card-footer bg-transparent border-dark">
              <small class="text-muted"><i class="fas fa-star"></i> 4.5 Ratings</small>
            </div>
          </div>
        </div>
        <div class="col-8">
          <form id="freelancer-profile">
            <fieldset disabled>
              <div class="form-group">
                <label for="first-name">First Name</label>
                <input type="text" id="first-name" class="form-control" placeholder="First Name">
              </div>
              <div class="form-group">
                <label for="last-name">Last Name</label>
                <input type="text" id="last-name" class="form-control" placeholder="Last Name">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="text" id="email" class="form-control" placeholder="Email">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" rows="5" id="description"></textarea>
              </div>
              <div class="form-group">
                <label for="services">Services</label>
                <input type="text" id="services" class="form-control" placeholder="Services">
              </div>
            </fieldset>
          </form>
          <div class="nav nav-pills justify-content-end mb-5 mt-5">
            <button class="nav-link btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#editProfileModal" href="#"><i class="fas fa-pen"></i> Edit</button>
            <button class="nav-link btn btn-outline-danger join btn-sm" href="#"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </div>
      </div>
    </section>
  `;
	// Register a new freelancer
	$('#join-btn').click(function(event) {
		event.preventDefault();
		// Make AJAX call to add freelancer to the database
		let newData = {
			firstName: $firstName.val(),
			lastName: $lastName.val(),
			email: $joinEmail.val(),
			password: $joinPassword.val(),
			location: '',
			description: '',
			ratings: 0,
			services: [],
			role: 'freelancer',
			image: ''
		};

		// Grab confirm password value for comparison
		$confirmPassword = $confirmPassword.val();

		if (
			newData.firstName === '' ||
			newData.lastName === '' ||
			newData.email === '' ||
			newData.password === '' ||
			$confirmPassword === ''
		) {
			alertHandler($messageContent, 'blank');
		} else if (newData.password !== $confirmPassword) {
			alertHandler($messageContent, 'notMatch');
			resetModal('#join-form');
		} else {
			$.ajax({
				type: 'POST',
				url: $dbUrl,
				data: newData, // This is included for POST method
				dataType: 'JSON',
				success: function(newFreelancer) {
					console.log(newFreelancer);
					$('#join-form').trigger('reset');
					closeModal();
					let newFreelancerData = {};
					$body.addClass('bg-light').html($profileBody);

					// window.location.replace('./profile.html');
				},
				error: function() {
					alert('Something went wrong!');
				}
			});
		}
	});
});
