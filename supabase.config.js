/**
 * Supabase Configuration for Type Generation
 */

module.exports = {
  // Your Supabase project configuration
  project: {
    // Get this from your Supabase dashboard URL
    id: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
  
  // Type generation settings
  types: {
    outputFile: 'lib/database.types.ts',
    tempFile: 'lib/database.types.generated.ts',
    
    // Tables to include/exclude from type generation
    includeTables: ['*'], // Use ['applications', 'candidates'] to include specific tables
    excludeTables: [], // Tables to exclude from generation
    
    // Custom types to automatically add
    customTypes: {
      // Add your custom enums and types here
      enums: {
        ApplicationStatus: [
          'pending',
          'reviewing', 
          'shortlisted',
          'interview_scheduled',
          'interviewed',
          'offered',
          'hired',
          'rejected',
          'withdrawn'
        ],
        JobStatus: [
          'draft',
          'active',
          'paused', 
          'closed',
          'cancelled'
        ],
        JobType: [
          'full_time',
          'part_time',
          'contract',
          'internship',
          'freelance',
          'remote',
          'hybrid'
        ],
        CompanySize: [
          'startup',
          'small',
          'medium',
          'large',
          'enterprise'
        ]
      }
    }
  },
  
  // Database migration settings
  migrations: {
    autoUpdate: true, // Automatically update types after migrations
    watchMode: false, // Watch for schema changes (for development)
  }
};
