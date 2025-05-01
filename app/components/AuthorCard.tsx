import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface AuthorCardProps {
  name: string;
  bio: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  className?: string;
}

export default function AuthorCard({
  name,
  bio,
  avatar,
  socialLinks,
  className = '',
}: AuthorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-lg bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-primary/20">
          {avatar && (
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          {socialLinks && (
            <div className="mt-2 flex gap-2">
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Twitter
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  LinkedIn
                </a>
              )}
              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <p className="text-muted-foreground">{bio}</p>
    </motion.div>
  );
} 