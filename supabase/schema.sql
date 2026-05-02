-- Job Application Tracker Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE response_status AS ENUM ('pending', 'responded', 'no_response');
CREATE TYPE final_outcome AS ENUM ('in_progress', 'rejected', 'successful', 'withdrawn');
CREATE TYPE document_type AS ENUM ('resume', 'cover_letter', 'portfolio', 'other');
CREATE TYPE response_type AS ENUM ('email', 'phone', 'rejection', 'interview_invite', 'other');

-- Applications table
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    position_title TEXT NOT NULL,
    application_date DATE NOT NULL DEFAULT CURRENT_DATE,
    application_method TEXT,
    job_posting_url TEXT,
    response_status response_status DEFAULT 'pending',
    final_outcome final_outcome DEFAULT 'in_progress',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    version_number INTEGER DEFAULT 1,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Responses table
CREATE TABLE responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    response_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    response_type response_type NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_application_date ON applications(application_date DESC);
CREATE INDEX idx_applications_response_status ON applications(response_status);
CREATE INDEX idx_applications_final_outcome ON applications(final_outcome);
CREATE INDEX idx_documents_application_id ON documents(application_id);
CREATE INDEX idx_responses_application_id ON responses(application_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for applications table
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Applications policies
CREATE POLICY "Users can view their own applications"
    ON applications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own applications"
    ON applications FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
    ON applications FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own applications"
    ON applications FOR DELETE
    USING (auth.uid() = user_id);

-- Documents policies
CREATE POLICY "Users can view documents for their applications"
    ON documents FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM applications
            WHERE applications.id = documents.application_id
            AND applications.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert documents for their applications"
    ON documents FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM applications
            WHERE applications.id = documents.application_id
            AND applications.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update documents for their applications"
    ON documents FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM applications
            WHERE applications.id = documents.application_id
            AND applications.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete documents for their applications"
    ON documents FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM applications
            WHERE applications.id = documents.application_id
            AND applications.user_id = auth.uid()
        )
    );

-- Responses policies
CREATE POLICY "Users can view responses for their applications"
    ON responses FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM applications
            WHERE applications.id = responses.application_id
            AND applications.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert responses for their applications"
    ON responses FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM applications
            WHERE applications.id = responses.application_id
            AND applications.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update responses for their applications"
    ON responses FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM applications
            WHERE applications.id = responses.application_id
            AND applications.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete responses for their applications"
    ON responses FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM applications
            WHERE applications.id = responses.application_id
            AND applications.user_id = auth.uid()
        )
    );

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-documents', 'application-documents', false);

-- Storage policies for application documents
CREATE POLICY "Users can upload their own documents"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'application-documents' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can view their own documents"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'application-documents' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update their own documents"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'application-documents' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own documents"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'application-documents' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Made with Bob
