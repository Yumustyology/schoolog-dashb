import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-extrabold text-[#E11D48]">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">We couldn&apos;t find that school</h2>
        <p className="mt-2 text-gray-600">
          The domain you tried seems to point to a site we don&apos;t recognize. If this is one of your schools, make sure the tenant
          is registered, or head back to the main directory to select a different school.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/" className="px-4 py-2 bg-[#0EA5A4] text-white rounded-md">Go to home</Link>
          <Link href="/" className="px-4 py-2 border border-gray-200 rounded-md text-gray-700">Explore schools</Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Tip: If you&apos;re testing locally with a custom domain, run the developer setup script to map the domain to
            <code className="mx-1">127.0.0.1</code> or contact your administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
