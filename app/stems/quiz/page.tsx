'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { symptoms } from '@/lib/data';
import { Button, LinkButton } from '@/components/Button';
import { Card } from '@/components/Card';
import { StepProgress } from '@/components/Progress';
import type { SymptomCategory } from '@/lib/types';

const categories: { id: SymptomCategory; label: string; icon: string; description: string }[] = [
  { id: 'stress', label: 'Stress & Anxiety', icon: '🧘', description: 'Feeling overwhelmed or anxious' },
  { id: 'sleep', label: 'Sleep Issues', icon: '🌙', description: 'Trouble falling or staying asleep' },
  { id: 'energy', label: 'Energy Levels', icon: '⚡', description: 'Fatigue or low energy' },
  { id: 'digestion', label: 'Digestion', icon: '💚', description: 'Bloating or digestive discomfort' },
  { id: 'immunity', label: 'Immunity', icon: '🛡️', description: 'Boost your natural defenses' },
  { id: 'focus', label: 'Mental Clarity', icon: '🧠', description: 'Brain fog or focus issues' },
  { id: 'beauty', label: 'Beauty & Glow', icon: '✨', description: 'Skin, hair, and nail health' },
  { id: 'detox', label: 'Detox & Cleanse', icon: '🍃', description: 'Support natural cleansing' },
];

export default function StemsQuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<SymptomCategory[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = ['Categories', 'Symptoms', 'Results'];

  // Get symptoms for selected categories
  const filteredSymptoms = symptoms.filter(s => selectedCategories.includes(s.category));

  const toggleCategory = (id: SymptomCategory) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 0 && selectedCategories.length > 0) {
      setStep(1);
    } else if (step === 1 && selectedSymptoms.length > 0) {
      setIsSubmitting(true);
      // Navigate to results with selected symptoms
      const params = new URLSearchParams();
      selectedSymptoms.forEach(s => params.append('s', s));
      router.push(`/stems/results?${params.toString()}`);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <LinkButton href="/stems" variant="ghost" className="mb-6">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </LinkButton>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Find Your Perfect Blend
            </h1>
            <p className="text-neutral-600">
              Answer a few questions to discover your personalized herbal recommendation
            </p>
          </div>

          <div className="flex justify-center">
            <StepProgress steps={steps} currentStep={step} />
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Category Selection */}
          {step === 0 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                  What areas would you like to improve?
                </h2>
                <p className="text-neutral-500">Select up to 3 wellness categories</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`
                      p-6 rounded-2xl text-left transition-all duration-200
                      ${selectedCategories.includes(category.id)
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30 scale-105'
                        : 'bg-white hover:bg-neutral-50 border border-neutral-200'
                      }
                    `}
                  >
                    <div className={`text-3xl mb-3 ${selectedCategories.includes(category.id) ? 'animate-bounce' : ''}`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{category.label}</h3>
                    <p className={`text-sm ${selectedCategories.includes(category.id) ? 'text-teal-100' : 'text-neutral-500'}`}>
                      {category.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleNext}
                  disabled={selectedCategories.length === 0}
                  size="lg"
                >
                  Continue
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Symptom Selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                  Tell us more about what you're experiencing
                </h2>
                <p className="text-neutral-500">Select all symptoms that apply to you</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {filteredSymptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`
                      p-5 rounded-xl text-left transition-all duration-200 flex items-start gap-4
                      ${selectedSymptoms.includes(symptom.id)
                        ? 'bg-teal-50 border-2 border-teal-500'
                        : 'bg-white border border-neutral-200 hover:border-teal-300'
                      }
                    `}
                  >
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                      ${selectedSymptoms.includes(symptom.id)
                        ? 'bg-teal-500 border-teal-500 text-white'
                        : 'border-neutral-300'
                      }
                    `}>
                      {selectedSymptoms.includes(symptom.id) && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{symptom.icon}</span>
                        <h3 className="font-semibold text-neutral-900">{symptom.name}</h3>
                      </div>
                      <p className="text-sm text-neutral-500">{symptom.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={handleBack} variant="outline" size="lg">
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedSymptoms.length === 0 || isSubmitting}
                  loading={isSubmitting}
                  size="lg"
                >
                  Get My Recommendations
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Educational Tip */}
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="bg-amber-50 border-amber-200">
            <div className="flex gap-4">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">Did you know?</h4>
                <p className="text-sm text-amber-800">
                  Caribbean herbal traditions have been passed down for generations, combining 
                  indigenous knowledge with influences from Africa, India, and Europe to create 
                  powerful wellness remedies.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
