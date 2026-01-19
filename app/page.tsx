import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect to the Member Dashboard immediately
  // TODO: In the future, we could check cookies or server-side auth to decide 
  // whether to go to /circle (member), /affiliate (partner), or /stems (visitor)
  redirect('/circle');
}
