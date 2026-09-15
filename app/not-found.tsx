import Link from 'next/link';

// Next.js renders this for EVERY unmatched route in the app, not just an
// unrecognized tenant subdomain — a missing dashboard page (e.g. a sidebar
// link to a page that hasn't been built yet) hits this exact same file. So
// the copy has to stay generic; it can't claim a specific cause it can't
// actually verify.
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-extrabold text-[#E11D48]">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>
        <p className="mt-2 text-gray-600">
          We couldn&apos;t find what you were looking for. The page may not exist yet, or the link may be out of date.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/" className="px-4 py-2 bg-[#0EA5A4] text-white rounded-md">Go to home</Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            If you got here by typing a school&apos;s address directly and expected to land on their site, make sure
            the domain is correct and the tenant is registered — otherwise, head back to the main directory to select
            a school.
          </p>
        </div>
      </div>
    </div>
  );
}
