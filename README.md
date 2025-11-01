# Feedback Management System

A comprehensive feedback management platform built with Next.js, TypeScript, and Supabase for collecting, tracking, and resolving user feedback efficiently.

## Features

### 🎯 Core Functionality
- **Feedback Collection**: Multi-type feedback forms (General, Bug Reports, Feature Requests, Other)
- **File Attachments**: Support for file uploads with direct download functionality
- **Status Management**: Track feedback status (In Review, Resolved)
- **Advanced Filtering**: Search and filter by name, email, type, and status
- **Real-time Updates**: Live feedback submission tracking

### 🔧 Technical Features
- **Type-Safe**: Full TypeScript implementation with database type generation
- **Responsive Design**: Mobile-first responsive UI with Tailwind CSS
- **Database Integration**: Supabase backend with real-time capabilities
- **File Storage**: Secure file upload and storage system
- **Modern UI**: Clean interface with shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **File Storage**: Supabase Storage
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gog
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   ```bash
   # Run the migration file in your Supabase SQL editor
   # File: migrations/table.sql
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```

## Project Structure

```
gog/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── view-submissions/  # Admin dashboard
│   └── page.tsx          # Main feedback form
├── components/            # React components
│   ├── feedback/         # Feedback-specific components
│   └── ui/              # Reusable UI components
├── lib/                  # Utilities and services
│   ├── services/        # API services
│   └── supabase/       # Database client
├── types/               # TypeScript type definitions
└── migrations/         # Database migrations
```

## Usage

### For Users
1. Visit the main page to submit feedback
2. Choose feedback type (General, Bug, Feature Request, Other)
3. Fill in contact details and feedback description
4. Optionally attach files
5. Submit feedback for review

### For Administrators
1. Navigate to `/view-submissions` for the admin dashboard
2. View all feedback submissions in a filterable table
3. Search by name, email, or feedback content
4. Filter by status and feedback type
5. Download attached files directly
6. Mark feedback as resolved

## API Endpoints

- `POST /api/feedback-form` - Submit new feedback
- `GET /api/feedback-submissions` - Retrieve all submissions
- `PATCH /api/feedback-submissions` - Update submission status

## Database Schema

### feedback_submissions
- `id`: UUID (Primary Key)
- `name`: String (Required)
- `email`: String (Required)
- `phone_number`: String (Optional)
- `feedback_type`: Enum ('general', 'bug', 'feature', 'other')
- `suggestions`: Text (Required)
- `attachment_url`: String (Optional)
- `status`: Enum ('in_review', 'resolved')
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.