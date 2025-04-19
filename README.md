# Slack Monitor Dashboard

A web-based platform designed to track and manage key communications and alerts across your company's Slack workspace. It improves responsiveness to both technical alerts and support questions by automatically surfacing unresolved issues and unacknowledged messages.

## Features

### Non-Resolved Alerts

- Real-time alert ingestion from selected Slack channels
- Deduplication for recurring or repeated alerts
- Time tracking: alerts not addressed within 1 hour are marked as Non-Resolved
- Prioritization: AI assigns an importance score based on alert frequency, keyword severity, and past incident patterns
- Alerts sorted by importance score (highest priority first)
- Ability to mark an alert as resolved (auto-detect via follow-up messages)

### Not Reacted Support Messages

- Tracks all new messages from selected support channels
- Monitors if a message has any thread replies or emoji reactions within 1 hour
- If no reaction is detected, it is flagged as Not Reacted
- Messages are archived automatically once someone replies or reacts
- AI assigns an importance level based on urgency-related keywords and contextual history
- Sorted by importance to ensure the most critical support questions are addressed first

### AI Prioritization Engine

Both categories utilize a built-in AI module to:

- Classify message type (alert, question, discussion)
- Extract context and severity
- Assign an importance key from 1 (low) to 5 (high)
- Continuously learn from interaction history and resolution patterns

## Tech Stack

- **Frontend**: React.js with Next.js
- **Backend**: Node.js with Express
- **Slack Integration**: Slack Events API & Web API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Slack workspace with admin privileges

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/slack-monitor-dashboard.git
   cd slack-monitor-dashboard
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   SLACK_BOT_TOKEN=your-slack-bot-token
   SLACK_SIGNING_SECRET=your-slack-signing-secret
   SLACK_APP_TOKEN=your-slack-app-token
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

### Setting up Slack Integration

1. Create a new Slack App in the [Slack API Console](https://api.slack.com/apps)
2. Add the following OAuth scopes:
   - `channels:history`
   - `channels:read`
   - `chat:write`
   - `reactions:read`
   - `reactions:write`
3. Install the app to your workspace
4. Copy the Bot User OAuth Token and Signing Secret to your `.env.local` file

## Deployment

The application can be deployed to any platform that supports Node.js applications, such as Vercel, Netlify, or Heroku.

## Future Enhancements

- User authentication and role-based access control
- Custom alert and support channel configuration
- Integration with incident management systems
- Mobile app for on-the-go monitoring
- Advanced analytics and reporting
