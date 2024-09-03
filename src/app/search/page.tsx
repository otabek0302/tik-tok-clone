import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import SearchDetails with client-side rendering
const SearchDetails = dynamic(() => import('@/components/ui/SearchDetails'), {
  ssr: false, // This disables server-side rendering for SearchDetails
});

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchDetails />
    </Suspense>
  );
}