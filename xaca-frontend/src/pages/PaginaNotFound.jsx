function PaginaNotFound() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h1>404</h1>
            <p>La página que buscas no existe</p>
            <button onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
    )
}

export default PaginaNotFound;