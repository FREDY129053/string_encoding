const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        color: "#343a40",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.5rem", margin: "1rem 0" }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      {/* <Link
        to="/"
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "#007bff",
          textDecoration: "none",
          borderRadius: "0.25rem",
        }}
      >
        Go Back Home
      </Link> */}
    </div>
  );
};

export default NotFoundPage;