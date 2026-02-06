document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-list');
    const showtimeList = document.getElementById('showtime-list');
    const seatsDiv = document.getElementById('seats');
    const selectedSeatsSpan = document.getElementById('selected-seats');
    const bookingForm = document.getElementById('booking-form');
    const confirmation = document.getElementById('confirmation');
    const bookingDetails = document.getElementById('booking-details');
    const resetBtn = document.getElementById('reset-btn');

    let selectedMovie = '';
    let selectedShowtime = '';
    let selectedSeats = [];
    const occupiedSeats = ['A1', 'B5', 'C3']; // Simulate occupied seats

    // Generate seats (10x10 grid)
    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            const seatId = String.fromCharCode(64 + row) + col;
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.textContent = seatId;
            if (occupiedSeats.includes(seatId)) seat.classList.add('occupied');
            seat.addEventListener('click', () => selectSeat(seat, seatId));
            seatsDiv.appendChild(seat);
        }
    }

    // Movie selection
    movieList.addEventListener('change', () => {
        selectedMovie = movieList.value;
        document.getElementById('showtime-selection').style.display = selectedMovie ? 'block' : 'none';
    });

    // Showtime selection
    showtimeList.addEventListener('change', () => {
        selectedShowtime = showtimeList.value;
        document.getElementById('seat-selection').style.display = selectedShowtime ? 'block' : 'none';
    });

    // Seat selection
    function selectSeat(seat, seatId) {
        if (seat.classList.contains('occupied')) return;
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s !== seatId);
        } else if (selectedSeats.length < 5) {
            seat.classList.add('selected');
            selectedSeats.push(seatId);
        }
        selectedSeatsSpan.textContent = selectedSeats.join(', ');
        document.getElementById('user-details').style.display = selectedSeats.length > 0 ? 'block' : 'none';
    }

    // Form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        bookingDetails.textContent = `Movie: ${selectedMovie}, Showtime: ${selectedShowtime}, Seats: ${selectedSeats.join(', ')}, Name: ${name}, Email: ${email}, Phone: ${phone}`;
        confirmation.style.display = 'block';
        // Hide other sections
        document.querySelectorAll('section').forEach(s => s.style.display = 'none');
        confirmation.style.display = 'block';
    });

    // Reset
    resetBtn.addEventListener('click', () => location.reload());
});
