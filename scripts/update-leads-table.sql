-- Add new columns to leads table for MVP features
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS last_contact TIMESTAMP,
ADD COLUMN IF NOT EXISTS next_action TEXT,
ADD COLUMN IF NOT EXISTS next_action_date TIMESTAMP,
ADD COLUMN IF NOT EXISTS priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 5 CHECK (score >= 1 AND score <= 10),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_next_action_date ON leads(next_action_date);

-- Update existing records with default values
UPDATE leads 
SET 
  priority = 'medium',
  score = 5,
  updated_at = CURRENT_TIMESTAMP
WHERE priority IS NULL OR score IS NULL;
