-- Migration: Add 'interview' to response_status enum
-- Run this in Supabase SQL Editor after the initial schema

-- Add 'interview' to the response_status enum
ALTER TYPE response_status ADD VALUE IF NOT EXISTS 'interview';

-- Made with Bob