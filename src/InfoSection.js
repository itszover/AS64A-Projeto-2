import placeholder from './placeholder.jpg';

export default function InfoSection() {
    return (
        <section className="info-section">
            <h2 className="card-name">Pessoas Correndo às Voltas</h2>
            <div className="img-desc-container">
                <img className="card-img" src={placeholder} alt="Pessoas Correndo às Voltas" title="Pessoas Correndo às Voltas" />
                <p className="card-desc">Embora sofram sempre em silêncio, eles juram inevitavelmente revoltarem-se.</p>
            </div>
        </section>
    )
}