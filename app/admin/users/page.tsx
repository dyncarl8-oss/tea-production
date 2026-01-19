'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/Card';
import { Button, LinkButton } from '@/components/Button';
import { Badge, RoleBadge, StatusBadge } from '@/components/Badge';

// Mock users data
const mockUsers = [
  { id: '1', name: 'Sarah Mitchell', email: 'sarah@email.com', username: 'sarah_m', role: 'affiliate' as const, status: 'active' as const, joined: '2024-01-15', earnings: 1250.00 },
  { id: '2', name: 'James Thompson', email: 'james@email.com', username: 'james_t', role: 'member' as const, status: 'active' as const, joined: '2024-01-20', earnings: 0 },
  { id: '3', name: 'Lisa Rodriguez', email: 'lisa@email.com', username: 'lisa_r', role: 'affiliate' as const, status: 'active' as const, joined: '2024-02-01', earnings: 890.00 },
  { id: '4', name: 'Mike Davis', email: 'mike@email.com', username: 'mike_d', role: 'member' as const, status: 'active' as const, joined: '2024-02-05', earnings: 0 },
  { id: '5', name: 'Emma Stone', email: 'emma@email.com', username: 'emma_s', role: 'affiliate' as const, status: 'pending' as const, joined: '2024-02-10', earnings: 320.00 },
  { id: '6', name: 'John Smith', email: 'john@email.com', username: 'john_s', role: 'member' as const, status: 'active' as const, joined: '2024-02-12', earnings: 0 },
  { id: '7', name: 'Anna Wilson', email: 'anna@email.com', username: 'anna_w', role: 'admin' as const, status: 'active' as const, joined: '2023-12-01', earnings: 0 },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const role: 'admin' | 'member' | 'affiliate' = 'admin';

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleUser = (id: string) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  return (
    <div className="flex">
      <Sidebar role={role} userName="Admin" />
      
      <main className="main-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">User Management</h1>
            <p className="text-neutral-600">
              Manage users, assign roles, and control access.
            </p>
          </div>
          <Button>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Invite User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="text-center" padding="sm">
            <p className="text-2xl font-bold text-neutral-900">{mockUsers.length}</p>
            <p className="text-sm text-neutral-500">Total Users</p>
          </Card>
          <Card className="text-center" padding="sm">
            <p className="text-2xl font-bold text-neutral-900">
              {mockUsers.filter(u => u.role === 'member').length}
            </p>
            <p className="text-sm text-neutral-500">Members</p>
          </Card>
          <Card className="text-center" padding="sm">
            <p className="text-2xl font-bold text-neutral-900">
              {mockUsers.filter(u => u.role === 'affiliate').length}
            </p>
            <p className="text-sm text-neutral-500">Affiliates</p>
          </Card>
          <Card className="text-center" padding="sm">
            <p className="text-2xl font-bold text-neutral-900">
              {mockUsers.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-sm text-neutral-500">Admins</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6" padding="sm">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'admin', 'affiliate', 'member'].map((r) => (
                <Button
                  key={r}
                  variant={roleFilter === r ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setRoleFilter(r)}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <Card className="mb-6 bg-teal-50 border-teal-200" padding="sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-teal-700">
                {selectedUsers.length} user(s) selected
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setSelectedUsers([])}>
                  Clear Selection
                </Button>
                <Button variant="outline" size="sm">Change Role</Button>
                <Button variant="danger" size="sm">Disable Access</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Users Table */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={toggleAll}
                      className="rounded border-neutral-300"
                    />
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-neutral-600">User</th>
                  <th className="p-4 text-left text-sm font-semibold text-neutral-600">Role</th>
                  <th className="p-4 text-left text-sm font-semibold text-neutral-600">Status</th>
                  <th className="p-4 text-left text-sm font-semibold text-neutral-600">Joined</th>
                  <th className="p-4 text-right text-sm font-semibold text-neutral-600">Earnings</th>
                  <th className="p-4 text-right text-sm font-semibold text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUser(user.id)}
                        className="rounded border-neutral-300"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{user.name}</p>
                          <p className="text-sm text-neutral-500">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="p-4 text-sm text-neutral-600">
                      {new Date(user.joined).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      {user.earnings > 0 ? (
                        <span className="font-medium text-teal-600">${user.earnings.toLocaleString()}</span>
                      ) : (
                        <span className="text-neutral-400">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-neutral-200 flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              Showing {filteredUsers.length} of {mockUsers.length} users
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" disabled>Previous</Button>
              <Button variant="ghost" size="sm">Next</Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
