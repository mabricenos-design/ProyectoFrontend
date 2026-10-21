export function Home() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4 font-weight-bold">Bienvenido a ModaExpress</h1>
      <p className="lead text-muted">Encuentra las mejores tendencias en vestuario y accesorios.</p>
      <img src="/img/Coleccion.png" alt="Colección" className="img-fluid rounded shadow my-3" style={{ maxHeight: '400px' }} />
    </div>
  );
}