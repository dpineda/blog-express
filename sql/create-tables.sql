
DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,               -- Unique identifier for each blog post
  title VARCHAR(255) NOT NULL,         -- Title of the blog post
  slug VARCHAR(255) UNIQUE NOT NULL,   -- URL-friendly version of the title
  content TEXT NOT NULL,               -- Main content of the blog post
  author_id INT NOT NULL,              -- ID of the author (foreign key)
  published_date TIMESTAMP,            -- Date and time when the post was published
  updated_date TIMESTAMP,              -- Date and time when the post was last updated
  is_published BOOLEAN DEFAULT FALSE,  -- Status to indicate if the post is published
  tags TEXT[],                         -- Array of tags for the blog post
  featured_image_url VARCHAR(255),     -- URL of the featured image
  views INT DEFAULT 0,                 -- Number of views for the post
  likes INT DEFAULT 0,                 -- Number of likes for the post
  created_at TIMESTAMP DEFAULT NOW(),  -- Timestamp of when the post was created
  updated_at TIMESTAMP DEFAULT NOW()   -- Timestamp of the last update
);

-- Optionally, create an index for the slug to improve query performance
CREATE INDEX idx_posts_slug ON posts (slug);

DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,                -- Unique identifier for each author
  name VARCHAR(255) NOT NULL,           -- Full name of the author
  email VARCHAR(255) UNIQUE NOT NULL,   -- Unique email address of the author
  bio TEXT,                             -- Short biography of the author
  profile_image_url VARCHAR(255),       -- URL of the author's profile image
  created_at TIMESTAMP DEFAULT NOW(),   -- Timestamp of when the author was created
  updated_at TIMESTAMP DEFAULT NOW()    -- Timestamp of the last update
);

-- Alter the posts table to add a foreign key constraint linking to authors
ALTER TABLE posts
ADD CONSTRAINT fk_author
FOREIGN KEY (author_id) REFERENCES authors(id)
ON DELETE SET NULL;

-- Creat default author
INSERT INTO authors (name, email, bio, profile_image_url) VALUES ('John Doe', 'johndoe@company.com', 'Crypto Investor, Farmer Padawan', 'https://i.imgur.com/2j4IGpP.gif');