# List Management Application

A React-based web application for managing and combining lists with a modern, responsive interface.

## Features

- View multiple lists in a responsive grid layout
- Select and combine two lists to create a new list
- Drag-and-drop functionality for moving items between lists
- Modern UI with smooth animations and transitions
- Responsive design that works on all screen sizes
- Real-time item count tracking
- Error handling and loading states

## Tech Stack

- React.js (v19.0.0)
- Styled Components for styling
- React Testing Library for testing
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/list-management-app.git
```

2. Navigate to the project directory:
```bash
cd list-management-app
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── ListsContainer.js    # Main container component
│   └── ListCreationView.js  # List creation/editing view
├── App.js                   # Root component
└── App.css                  # Global styles
```

## API Integration

The application fetches data from:
```
https://apis.ccbp.in/list-creation/lists
```

## Features in Detail

### List View
- Displays lists in a responsive grid
- Shows item count for each list
- Allows selection of two lists for combination

### List Creation View
- Three-column layout showing source lists and new list
- Arrow buttons for moving items between lists
- Real-time updates of item counts
- Cancel and Update functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/your-username/list-management-app](https://github.com/your-username/list-management-app)
