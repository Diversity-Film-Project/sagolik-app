type InfoCardProps = {
    title: string
    description: string
}

export default function InfoCard({ title, description }: InfoCardProps) {
    return (
        <div
            style={{
                width: '100%',
                padding: '24px',
                border: '1.5px solid #f4a261',
                borderRadius: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 6px 14px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
            }}
        >
            <div
                style={{
                    width: '40px',
                    height: '40px',
                    minWidth: '40px',
                    backgroundColor: '#f4a261',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                }}
            ></div>
            <h3
                style={{
                    marginBottom: '4px',
                    fontWeight: 600,
                    fontSize: '16px',
                }}
            >
                {title}
            </h3>

            <p style={{ color: '#6b6b6b', fontSize: '13px' }}>{description}</p>
        </div>
    )
}
