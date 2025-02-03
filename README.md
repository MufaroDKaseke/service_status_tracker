# Custom Service Status Tracker Demo

This project is a custom service status tracker demo designed to monitor the availability and latency of various services such as SaaS, APIs, websites, or any other services. The demo utilizes Azure Application Insights (Monitor) to collect and track the status of a specified URL every 5 minutes. The collected data is then displayed using a React-based frontend, mimicking the style of the Discord Status page.

## Features

- **Service Monitoring**: Uses Azure Application Insights to monitor the availability and latency of a specified URL.
- **Data Collection**: Collects availability and latency data every 5 minutes.
- **React Frontend**: Displays the collected data in a user-friendly interface similar to the Discord Status page.
- **Real-time Updates**: Provides real-time updates on the status of the monitored services.

## Technologies Used

- **Azure Application Insights**: For monitoring and collecting availability and latency data.
- **React**: For building the frontend interface.
- **JavaScript/TypeScript**: For implementing the frontend logic.
- **HTML/CSS**: For structuring and styling the frontend interface.

## Setup and Installation

1. **Clone the Repository**: Clone the project repository to your local machine.
  ```sh
  git clone <repository-url>
  ```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.
  ```sh
  cd project-directory
  npm install
  ```

3. **Configure Azure Application Insights**: Set up Azure Application Insights to monitor the desired URL and collect availability and latency data.

4. **Run the Application**: Start the React application to view the status tracker demo.
  ```sh
  npm start
  ```

## Usage

- **Monitoring Services**: The application will automatically monitor the specified URL every 5 minutes and collect availability and latency data.
- **Viewing Status**: The React frontend will display the collected data, showing the current status and historical data of the monitored services.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.