-- মাহিনের AI নোট: ডাটাবেস স্কিমা
-- Neon SQL Editor এ গিয়ে নিচের কমান্ডগুলো রান করো:

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- নতুন পোস্ট আগে আনার জন্য ইনডেক্স
CREATE INDEX IF NOT EXISTS idx_posts_created_at_desc ON posts (created_at DESC);
