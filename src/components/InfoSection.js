export default function InfoSection({ cardName, cardImage, cardDescription }) {
    return (
        <section className="info-section">
            <h2 className="card-name">{cardName}</h2>
            <div className="img-desc-container">
                <img className="card-img" src={cardImage} alt={cardName} title={cardName} />
                <p className="card-desc">{cardDescription}</p>
            </div>
        </section>
    )
}