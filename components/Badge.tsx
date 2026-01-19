interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const dotColors = {
    default: 'bg-neutral-400',
    primary: 'bg-teal-500',
    secondary: 'bg-amber-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <span className={`badge ${variants[variant]} ${sizes[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}

// Role Badge
interface RoleBadgeProps {
  role: 'admin' | 'member' | 'affiliate' | 'visitor';
  className?: string;
}

export function RoleBadge({ role, className = '' }: RoleBadgeProps) {
  const roleConfig = {
    admin: { variant: 'danger' as const, label: 'Admin', icon: '👑' },
    affiliate: { variant: 'success' as const, label: 'Affiliate', icon: '💎' },
    member: { variant: 'primary' as const, label: 'Member', icon: '🌿' },
    visitor: { variant: 'default' as const, label: 'Visitor', icon: '👋' },
  };

  const config = roleConfig[role];

  return (
    <Badge variant={config.variant} className={className}>
      <span>{config.icon}</span>
      {config.label}
    </Badge>
  );
}

// Status Badge
interface StatusBadgeProps {
  status: 'active' | 'pending' | 'completed' | 'failed' | 'paused' | 'approved' | 'paid';
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusConfig = {
    active: { variant: 'success' as const, label: 'Active' },
    pending: { variant: 'warning' as const, label: 'Pending' },
    completed: { variant: 'primary' as const, label: 'Completed' },
    failed: { variant: 'danger' as const, label: 'Failed' },
    paused: { variant: 'default' as const, label: 'Paused' },
    approved: { variant: 'success' as const, label: 'Approved' },
    paid: { variant: 'success' as const, label: 'Paid' },
  };

  const config = statusConfig[status] || statusConfig.pending; // Fallback to pending if unknown

  return (
    <Badge variant={config.variant} dot className={className}>
      {config.label}
    </Badge>
  );
}

// Difficulty Badge
interface DifficultyBadgeProps {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  className?: string;
}

export function DifficultyBadge({ difficulty, className = '' }: DifficultyBadgeProps) {
  const difficultyConfig = {
    beginner: { variant: 'success' as const, label: 'Beginner' },
    intermediate: { variant: 'warning' as const, label: 'Intermediate' },
    advanced: { variant: 'danger' as const, label: 'Advanced' },
  };

  const config = difficultyConfig[difficulty];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
