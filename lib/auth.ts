// ============================================
// AUTHENTICATION & ROLE MANAGEMENT
// ============================================

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { whopsdk } from './whop-sdk';
import type { UserRole, UserProfile } from './types';

// Admin resource IDs - these should match your Whop product/plan IDs
const ADMIN_RESOURCE_IDS = [
  process.env.WHOP_ADMIN_RESOURCE_ID,
].filter(Boolean) as string[];

const MEMBER_RESOURCE_IDS = [
  process.env.WHOP_MEMBER_RESOURCE_ID,
].filter(Boolean) as string[];

const AFFILIATE_RESOURCE_IDS = [
  process.env.WHOP_AFFILIATE_RESOURCE_ID,
].filter(Boolean) as string[];

export interface AuthResult {
  userId: string;
  user: any;
  role: UserRole;
  companyId?: string;
  hasAccess: boolean;
}

/**
 * Get the current authenticated user and their role
 */
export async function getCurrentUser(companyId?: string): Promise<AuthResult | null> {
  try {
    const headersList = await headers();
    const { userId } = await whopsdk.verifyUserToken(headersList);
    
    if (!userId) {
      return null;
    }

    const user = await whopsdk.users.retrieve(userId);
    
    // Determine role based on access
    let role: UserRole = 'visitor';
    let hasAccess = false;

    if (companyId) {
      const access = await whopsdk.users.checkAccess(companyId, { id: userId });
      
      // Check if user is an admin (team member)
      if (access.has_valid_membership || access.is_admin) {
        hasAccess = true;
        
        // Check for admin access first
        if (access.is_admin) {
          role = 'admin';
        } else {
          // Check for affiliate status
          const isAffiliate = await checkAffiliateAccess(userId, companyId);
          if (isAffiliate) {
            role = 'affiliate';
          } else {
            role = 'member';
          }
        }
      }
    }

    return {
      userId,
      user,
      role,
      companyId,
      hasAccess,
    };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

/**
 * Check if user has affiliate access
 */
async function checkAffiliateAccess(userId: string, companyId: string): Promise<boolean> {
  try {
    // This would check against affiliate-specific resources
    // For now, we'll use a simple membership check
    for (const resourceId of AFFILIATE_RESOURCE_IDS) {
      const access = await whopsdk.users.checkAccess(resourceId, { id: userId });
      if (access.has_valid_membership) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth(companyId?: string): Promise<AuthResult> {
  const auth = await getCurrentUser(companyId);
  
  if (!auth) {
    redirect('/');
  }
  
  return auth;
}

/**
 * Require specific role - redirects if user doesn't have required role
 */
export async function requireRole(
  requiredRole: UserRole | UserRole[],
  companyId?: string
): Promise<AuthResult> {
  const auth = await requireAuth(companyId);
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  if (!roles.includes(auth.role)) {
    // Redirect based on actual role
    switch (auth.role) {
      case 'admin':
        redirect('/admin');
      case 'affiliate':
        redirect('/affiliate');
      case 'member':
        redirect('/circle');
      default:
        redirect('/stems');
    }
  }
  
  return auth;
}

/**
 * Check if user has a specific permission
 */
export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions: Record<UserRole, string[]> = {
    admin: [
      'manage_users',
      'manage_content',
      'manage_courses',
      'manage_stems',
      'manage_commissions',
      'manage_campaigns',
      'view_analytics',
      'manage_settings',
      'view_content',
      'view_community',
      'earn_commissions',
    ],
    affiliate: [
      'view_content',
      'view_community',
      'earn_commissions',
      'view_affiliate_dashboard',
      'manage_referral_links',
      'download_assets',
    ],
    member: [
      'view_content',
      'view_community',
      'track_progress',
    ],
    visitor: [
      'use_symptom_tool',
    ],
  };

  return permissions[role]?.includes(permission) || false;
}

/**
 * Get display name for user
 */
export function getDisplayName(user: any): string {
  return user.name || `@${user.username}` || 'User';
}

/**
 * Generate affiliate code for user
 */
export function generateAffiliateCode(userId: string): string {
  const base = userId.slice(-6).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `STEEP${base}${random}`;
}

/**
 * Build referral URL with affiliate code
 */
export function buildReferralUrl(
  baseUrl: string,
  affiliateCode: string,
  type: 'product' | 'subscription' | 'symptom-tool' = 'product'
): string {
  const url = new URL(baseUrl);
  url.searchParams.set('ref', affiliateCode);
  url.searchParams.set('type', type);
  return url.toString();
}
