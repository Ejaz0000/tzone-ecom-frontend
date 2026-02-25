export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="text-center">
        {/* Logo/Brand Name */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-wider">
          UNI CLOCK
        </h1>

        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-orange"></div>
        </div>

        {/* Loading Text */}
        <p className="text-neutral-gray600 mt-4 text-sm">
          Loading...
        </p>
      </div>
    </div>
  );
}
