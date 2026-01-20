import { redirect } from 'next/navigation';

export default function StemsLandingPage() {
  // Bypass marketing landing page and go straight to the dashbaord context
  redirect('/circle');
}
