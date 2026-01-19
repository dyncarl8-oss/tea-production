'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, LinkButton } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Progress } from '@/components/Progress';

// This would normally come from props/database
const mockLesson = {
  id: 'hf-1',
  courseId: 'herbal-foundations',
  courseName: 'Herbal Foundations',
  title: 'Welcome to Herbal Wellness',
  description: 'An introduction to the world of herbal healing and what you\'ll learn in this course. We\'ll cover the history of herbal medicine, the principles behind it, and set you up for success.',
  type: 'video' as const,
  content: 'https://example.com/video.mp4',
  duration: 15,
  order: 1,
  resources: [
    { id: 'r1', name: 'Welcome Guide PDF', type: 'pdf' as const, url: '/resources/welcome.pdf' },
    { id: 'r2', name: 'Herb Reference Sheet', type: 'pdf' as const, url: '/resources/herbs.pdf' },
  ],
  isPreview: true,
  transcript: `Welcome to Herbal Foundations! 

In this course, we're going to explore the incredible world of herbal wellness together. 

For thousands of years, people around the world have turned to plants for healing. In the Caribbean, this tradition runs deep - passed down through generations, blending knowledge from Africa, India, and indigenous peoples.

Today, we're seeing a renaissance in herbal wellness. More and more people are looking for natural ways to support their health, reduce stress, improve sleep, and boost their energy.

In this course, you'll learn:
- The basic principles of herbal medicine
- How to select the right herbs for your needs  
- Proper brewing techniques
- How to create sustainable wellness rituals

Let's begin this journey together. I'm excited to share this knowledge with you!`,
};

const mockNextLesson = {
  id: 'hf-2',
  title: 'Understanding Herbs & Their Benefits',
};

export default function LessonPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [notes, setNotes] = useState('');

  const handleMarkComplete = () => {
    setCompleted(true);
    // In real app, this would save to database
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <LinkButton href={`/circle/courses/${mockLesson.courseId}`} variant="ghost">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Course
            </LinkButton>
            
            <div className="text-center">
              <p className="text-sm text-neutral-500">{mockLesson.courseName}</p>
              <p className="font-medium text-neutral-900">Lesson {mockLesson.order}</p>
            </div>

            <Button 
              variant={completed ? 'secondary' : 'primary'}
              onClick={handleMarkComplete}
              disabled={completed}
            >
              {completed ? '✓ Completed' : 'Mark Complete'}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card padding="none" className="overflow-hidden">
              <div 
                className="aspect-video bg-neutral-900 relative cursor-pointer group"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {/* Video placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isPlaying ? (
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-10 h-10 text-teal-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div className="h-full bg-teal-500 w-0" style={{ width: isPlaying ? '35%' : '0%' }} />
                </div>

                {/* Time overlay */}
                <div className="absolute bottom-4 right-4 text-white/80 text-sm bg-black/50 px-2 py-1 rounded">
                  {mockLesson.duration}:00
                </div>
              </div>

              {/* Controls */}
              <div className="p-4 flex items-center justify-between border-t border-neutral-100">
                <div className="flex items-center gap-4">
                  <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a5 5 0 001.414 1.414M4.929 4.929a9 9 0 000 12.728" />
                    </svg>
                  </button>
                  <select className="text-sm border border-neutral-200 rounded-md px-2 py-1">
                    <option>1x</option>
                    <option>1.25x</option>
                    <option>1.5x</option>
                    <option>2x</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Lesson Info */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900 mb-2">{mockLesson.title}</h1>
                  <div className="flex items-center gap-3">
                    <Badge variant="default">Lesson {mockLesson.order}</Badge>
                    <span className="text-sm text-neutral-500">{mockLesson.duration} minutes</span>
                    {mockLesson.isPreview && <Badge variant="info">Preview</Badge>}
                  </div>
                </div>
                {completed && (
                  <Badge variant="success" className="flex-shrink-0">
                    ✓ Completed
                  </Badge>
                )}
              </div>
              <p className="text-neutral-600">{mockLesson.description}</p>
            </div>

            {/* Transcript Toggle */}
            <Card>
              <button 
                className="w-full flex items-center justify-between"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-neutral-900">Transcript</span>
                </div>
                <svg 
                  className={`w-5 h-5 text-neutral-400 transition-transform ${showTranscript ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showTranscript && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="prose prose-sm max-w-none text-neutral-600 whitespace-pre-line">
                    {mockLesson.transcript}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Lesson */}
            <Card className="bg-teal-50 border-teal-200">
              <h3 className="font-semibold text-neutral-900 mb-3">Up Next</h3>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                  {mockLesson.order + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900 truncate">{mockNextLesson.title}</p>
                  <p className="text-sm text-neutral-500">Lesson {mockLesson.order + 1}</p>
                </div>
              </div>
              <LinkButton href={`/circle/lessons/${mockNextLesson.id}`} fullWidth>
                Continue to Next Lesson
              </LinkButton>
            </Card>

            {/* Resources */}
            {mockLesson.resources.length > 0 && (
              <Card>
                <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Resources
                </h3>
                <div className="space-y-2">
                  {mockLesson.resources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                        PDF
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 truncate">{resource.name}</p>
                        <p className="text-xs text-neutral-500">Click to download</p>
                      </div>
                      <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  ))}
                </div>
              </Card>
            )}

            {/* Notes */}
            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                My Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes as you watch..."
                className="w-full h-32 p-3 text-sm border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-xs text-neutral-400 mt-2">Notes are saved automatically</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
