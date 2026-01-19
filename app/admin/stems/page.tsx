'use client';

import { useState } from 'react';
import { symptoms, herbalBlends, symptomBlendMappings } from '@/lib/data';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/Card';
import { Button, LinkButton } from '@/components/Button';
import { Badge } from '@/components/Badge';

export default function StemsAdminPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const role: 'admin' | 'member' | 'affiliate' = 'admin';

  const categories = [...new Set(symptoms.map(s => s.category))];
  
  const filteredSymptoms = selectedCategory === 'all' 
    ? symptoms 
    : symptoms.filter(s => s.category === selectedCategory);

  // Get blends for a symptom
  const getBlendsForSymptom = (symptomId: string) => {
    const mapping = symptomBlendMappings.find(m => m.symptomId === symptomId);
    if (!mapping) return [];
    return mapping.blendIds.map(id => herbalBlends.find(b => b.id === id)).filter(Boolean);
  };

  return (
    <div className="flex">
      <Sidebar role={role} userName="Admin" />
      
      <main className="main-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Symptom-to-Stems Mappings</h1>
            <p className="text-neutral-600">
              Configure which herbal blends are recommended for each symptom.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Symptom
            </Button>
            <Button>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Blend
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="text-center" padding="sm">
            <p className="text-2xl font-bold text-neutral-900">{symptoms.length}</p>
            <p className="text-sm text-neutral-500">Total Symptoms</p>
          </Card>
          <Card className="text-center" padding="sm">
            <p className="text-2xl font-bold text-neutral-900">{herbalBlends.length}</p>
            <p className="text-sm text-neutral-500">Herbal Blends</p>
          </Card>
          <Card className="text-center" padding="sm">
            <p className="text-2xl font-bold text-neutral-900">{symptomBlendMappings.length}</p>
            <p className="text-sm text-neutral-500">Active Mappings</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Symptoms List */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>

            {/* Symptoms & Mappings */}
            <div className="space-y-4">
              {filteredSymptoms.map((symptom) => {
                const mappedBlends = getBlendsForSymptom(symptom.id);
                
                return (
                  <Card key={symptom.id} className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-2xl flex-shrink-0">
                        {symptom.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-neutral-900">{symptom.name}</h3>
                          <Badge variant="default" size="sm">{symptom.category}</Badge>
                        </div>
                        <p className="text-sm text-neutral-500 mb-4">{symptom.description}</p>
                        
                        {/* Mapped Blends */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-neutral-400">Maps to:</span>
                          {mappedBlends.length > 0 ? (
                            mappedBlends.map((blend) => blend && (
                              <Badge key={blend.id} variant="primary" size="sm">
                                {blend.name}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="warning" size="sm">No mappings</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Blends List */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Available Blends</h2>
            <div className="space-y-3">
              {herbalBlends.map((blend) => {
                const mappingCount = symptomBlendMappings.filter(m => 
                  m.blendIds.includes(blend.id)
                ).length;
                
                return (
                  <Card key={blend.id} padding="sm" className="group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-xl flex-shrink-0">
                        🍵
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-neutral-900 truncate">{blend.name}</h4>
                        <p className="text-xs text-neutral-500">{mappingCount} symptom mappings</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-teal-600">${blend.price}</span>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Quick Add */}
            <Card className="mt-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200">
              <h3 className="font-semibold text-teal-900 mb-2">Mapping Tips</h3>
              <ul className="text-sm text-teal-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span>💡</span>
                  <span>Each symptom can map to multiple blends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🎯</span>
                  <span>Prioritize blends that directly address the symptom</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔄</span>
                  <span>Users see the first mapped blend as primary recommendation</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
