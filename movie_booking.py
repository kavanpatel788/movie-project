from datetime import datetime

class Movie:
    def __init__(self, title, duration, showtimes):
        self.title = title
        self.duration = duration  # in minutes
        self.showtimes = showtimes  # list of datetime objects

class Theater:
    def __init__(self, rows=5, cols=10):
        self.rows = rows
        self.cols = cols
        self.seats = [['O' for _ in range(cols)] for _ in range(rows)]  # 'O' = open, 'B' = booked

    def display_seats(self):
        print("Seats (O = Open, B = Booked):")
        for i, row in enumerate(self.seats):
            print(f"Row {i+1}: {' '.join(row)}")

    def book_seat(self, row, col):
        if 0 <= row < self.rows and 0 <= col < self.cols and self.seats[row][col] == 'O':
            self.seats[row][col] = 'B'
            return True
        return False

class BookingSystem:
    def __init__(self):
        self.movies = [
            Movie("Inception", 148, [datetime(2023, 10, 1, 14, 0), datetime(2023, 10, 1, 18, 0)]),
            Movie("The Matrix", 136, [datetime(2023, 10, 1, 15, 0), datetime(2023, 10, 1, 19, 0)])
        ]
        self.theaters = {movie.title: Theater() for movie in self.movies}  # One theater per movie

    def run(self):
        print("Welcome to the Movie Booking System!")
        while True:
            self.display_movies()
            choice = input("Select a movie by number (or 'q' to quit): ").strip()
            if choice.lower() == 'q':
                break
            try:
                movie_idx = int(choice) - 1
                movie = self.movies[movie_idx]
                self.book_ticket(movie)
            except (ValueError, IndexError):
                print("Invalid choice. Try again.")

    def display_movies(self):
        print("\nAvailable Movies:")
        for i, movie in enumerate(self.movies, 1):
            print(f"{i}. {movie.title} ({movie.duration} min)")
            print(f"   Showtimes: {[t.strftime('%H:%M') for t in movie.showtimes]}")

    def book_ticket(self, movie):
        print(f"\nSelected: {movie.title}")
        print("Showtimes:")
        for i, time in enumerate(movie.showtimes, 1):
            print(f"{i}. {time.strftime('%H:%M')}")
        time_choice = int(input("Select showtime by number: ")) - 1
        showtime = movie.showtimes[time_choice]

        theater = self.theaters[movie.title]
        theater.display_seats()
        row = int(input("Enter row number: ")) - 1
        col = int(input("Enter column number: ")) - 1

        if theater.book_seat(row, col):
            print(f"Booking confirmed! Ticket for {movie.title} at {showtime.strftime('%H:%M')}, Seat: Row {row+1}, Col {col+1}")
        else:
            print("Seat unavailable or invalid.")

if __name__ == "__main__":
    system = BookingSystem()
    system.run()
