import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const canonical = typeof window !== "undefined" ? window.location.href : "https://deploymate.hu/404";
  return (
    <>
      <Helmet>
        <title>Page not found — DeployMate</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to DeployMate's homepage." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Page not found — DeployMate" />
        <meta property="og:description" content="The page you're looking for doesn't exist." />
        <meta property="og:url" content={canonical} />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
